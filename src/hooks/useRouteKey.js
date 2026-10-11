import { useLocation } from "react-router";

export default function useRouteKey() {
  return useLocation().pathname.split("/")[1] ?? "";
}
