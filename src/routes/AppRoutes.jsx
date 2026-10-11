import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import DSA from "../pages/DSA";
import GitHub from "../pages/GitHub";
import FullStackTechnical from "../pages/FullStackTechnical";
import MachineCoding from "../pages/MachineCoding";

// Hash routes, unchanged from before: #/dashboard, #/dsa, #/git, #/technical, #/machine.
// Unknown or empty hashes open the dashboard, so existing links and bookmarks keep working.
export const ROUTES = {
  dashboard: Dashboard,
  dsa: DSA,
  git: GitHub,
  technical: FullStackTechnical,
  machine: MachineCoding,
};

const readRoute = () => {
  const route = window.location.hash.replace("#/", "");
  return Object.hasOwn(ROUTES, route) ? route : "dashboard";
};

export function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function AppRoutes({ route, ...pageProps }) {
  const Page = ROUTES[route];
  return <Page key={route} {...pageProps} />;
}
