import { useState, useCallback } from "react";
import {
  getTimelineEvents,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} from "../services/timeline.service";

const useTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTimelineEvents();
      const data = res?.data?.data || res?.data || res || [];
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load timeline.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEvent = useCallback(async (payload) => {
    const res = await createTimelineEvent(payload);
    const newEvent = res?.data?.data || res?.data || res;
    setEvents((prev) => {
      const updated = [...prev, newEvent];
      return updated.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    });
    return newEvent;
  }, []);

  const editEvent = useCallback(async (id, payload) => {
    const res = await updateTimelineEvent(id, payload);
    const updatedEvent = res?.data?.data || res?.data || res;
    setEvents((prev) =>
      prev
        .map((e) => (e.id === id ? { ...e, ...updatedEvent } : e))
        .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
    );
    return updatedEvent;
  }, []);

  const removeEvent = useCallback(async (id) => {
    await deleteTimelineEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    editEvent,
    removeEvent,
  };
};

export default useTimeline;
