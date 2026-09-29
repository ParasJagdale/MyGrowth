import { useEffect, useState } from "react";

function useLocalStorage(storageKey, initialValue, migrateSavedValue) {
  // The function passed to useState runs only when this state is first created.
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(storageKey);

    if (savedValue === null) {
      return initialValue;
    }

    try {
      const parsedValue = JSON.parse(savedValue);

      if (migrateSavedValue) {
        return migrateSavedValue(parsedValue);
      }

      return parsedValue;
    } catch {
      return initialValue;
    }
  });

  // This effect runs whenever the key or value changes.
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
