import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

const ToastContext = createContext(null);

let _uid = 0;
const nextId = () => ++_uid;

/**
 * Provides a global toast notification system.
 * Usage:  const { showToast, showError, showSuccess } = useToast();
 */
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    const dismiss = useCallback((id) => {
        clearTimeout(timers.current[id]);
        delete timers.current[id];
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, variant = "info", duration = 4500) => {
            if (!message) return;
            const id = nextId();
            setToasts((prev) => {
                // Prevent duplicate identical messages stacking
                const alreadyExists = prev.some(
                    (t) => t.message === message && t.variant === variant
                );
                if (alreadyExists) return prev;
                return [...prev, { id, message, variant }];
            });
            timers.current[id] = setTimeout(() => dismiss(id), duration);
        },
        [dismiss]
    );

    const showError = useCallback(
        (errorOrMessage, fallback = "Something went wrong. Please try again.") => {
            const message =
                typeof errorOrMessage === "string"
                    ? errorOrMessage
                    : errorOrMessage?.response?.data?.message ||
                      errorOrMessage?.message ||
                      fallback;
            showToast(message, "error");
        },
        [showToast]
    );

    const showSuccess = useCallback(
        (message) => showToast(message, "success"),
        [showToast]
    );

    const showInfo = useCallback(
        (message) => showToast(message, "info"),
        [showToast]
    );

    return (
        <ToastContext.Provider value={{ showToast, showError, showSuccess, showInfo }}>
            {children}
            <GlobalToastRenderer toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
};

const ICONS = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
};

const COLORS = {
    success: { bg: "#16a34a", border: "#15803d" },
    error:   { bg: "#dc2626", border: "#b91c1c" },
    warning: { bg: "#d97706", border: "#b45309" },
    info:    { bg: "#2563eb", border: "#1d4ed8" },
};

const GlobalToastRenderer = ({ toasts, onDismiss }) => {
    if (!toasts.length) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "1.25rem",
                right: "1.25rem",
                zIndex: 99999,
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                maxWidth: "22rem",
                width: "calc(100vw - 2.5rem)",
                pointerEvents: "none",
            }}
            aria-live="polite"
            aria-atomic="false"
        >
            {toasts.map((toast) => {
                const colors = COLORS[toast.variant] || COLORS.info;
                return (
                    <div
                        key={toast.id}
                        role="alert"
                        style={{
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "0.75rem",
                            padding: "0.875rem 1rem",
                            color: "#ffffff",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.625rem",
                            boxShadow:
                                "0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)",
                            pointerEvents: "all",
                            animation: "ss-toast-in 0.25s ease",
                            lineHeight: 1.4,
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: "1rem",
                                flexShrink: 0,
                                marginTop: "0.05rem",
                            }}
                        >
                            {ICONS[toast.variant] || ICONS.info}
                        </span>
                        <span style={{ flex: 1, wordBreak: "break-word" }}>
                            {toast.message}
                        </span>
                        <button
                            aria-label="Dismiss notification"
                            onClick={() => onDismiss(toast.id)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "rgba(255,255,255,0.8)",
                                cursor: "pointer",
                                fontSize: "1rem",
                                lineHeight: 1,
                                padding: "0",
                                flexShrink: 0,
                                marginTop: "0.05rem",
                            }}
                        >
                            ×
                        </button>
                    </div>
                );
            })}
            <style>{`
                @keyframes ss-toast-in {
                    from { opacity: 0; transform: translateX(2rem); }
                    to   { opacity: 1; transform: translateX(0);    }
                }
            `}</style>
        </div>
    );
};

/**
 * Hook to access the global toast system.
 * Must be used inside <ToastProvider>.
 */
export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        // Graceful fallback — should never happen once ToastProvider is registered
        return {
            showToast: () => {},
            showError: (e) => console.error("[Toast]", e),
            showSuccess: () => {},
            showInfo: () => {},
        };
    }
    return ctx;
};

export default ToastContext;
