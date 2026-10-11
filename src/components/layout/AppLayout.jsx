import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppModals from "./AppModals";
import useTheme from "../../hooks/useTheme";

export default function AppLayout() {
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="grid min-h-screen grid-cols-1 tablet:grid-cols-[248px_1fr]">
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="relative flex min-w-0 flex-col">
          <Header theme={theme} onTheme={toggleTheme} onMenu={() => setNavOpen(true)} />
          <Outlet />
          <footer className="mx-3.5 mt-auto flex flex-wrap justify-between gap-2 py-[18px] text-[0.82rem] text-muted sm:mx-8">
            <span>Built with React and Vite.</span>
            <span>Your data stays in this browser.</span>
          </footer>
        </div>
      </div>
      <AppModals />
    </>
  );
}
