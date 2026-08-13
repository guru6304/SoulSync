import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

import './styles/global.css';

import { Provider } from 'react-redux';

import App from './App';
import { store } from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <ThemeProvider>

    <Provider store={store}>

        <ToastProvider>
            <App />
        </ToastProvider>

    </Provider>

    </ThemeProvider>
);