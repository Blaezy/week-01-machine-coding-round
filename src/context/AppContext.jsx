import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useTracker from "../hooks/useTracker";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);

  const say = useCallback((message, undo) => setToast({ id: Date.now(), message, undo }), []);
  const tracker = useTracker(say);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const closeModal = useCallback(() => setModal(null), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const value = { ...tracker, toast, dismissToast, modal, openModal: setModal, closeModal };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
