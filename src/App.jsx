import { Navigate, Route, Routes, useLocation } from "react-router";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import QuestionSection from "./components/questions/QuestionSection";
import Dashboard from "./pages/Dashboard";
import MachineCoding from "./pages/MachineCoding";
import NotFound from "./pages/NotFound";
import { ROUTE_KEYS, SECTIONS } from "./data/constants";

// Old #/route bookmarks still resolve
function IndexRedirect() {
  const legacy = useLocation().hash.replace("#/", "");
  return <Navigate to={ROUTE_KEYS.includes(legacy) ? `/${legacy}` : "/dashboard"} replace />;
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<IndexRedirect />} />
          <Route path="dashboard" element={<Dashboard />} />
          {Object.keys(SECTIONS).map((key) => (
            <Route key={key} path={key} element={<QuestionSection key={key} sectionKey={key} />} />
          ))}
          <Route path="machine" element={<MachineCoding />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
