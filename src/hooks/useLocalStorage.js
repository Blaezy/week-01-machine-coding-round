import { useEffect, useState } from "react";
import { readItem, writeItem } from "../services/storageService";

// State mirrored to localStorage
export default function useLocalStorage(key, initialValue, migrate) {
  const [value, setValue] = useState(() => readItem(key, initialValue, migrate));
  useEffect(() => {
    writeItem(key, value);
  }, [key, value]);
  return [value, setValue];
}
