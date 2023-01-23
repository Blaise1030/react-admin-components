import { useEffect, useState } from "react";

function useDebounce<T>(
  value: T,
  onDebounce: (v: T) => void,
  delay?: number
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      onDebounce(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, onDebounce]);

  return debouncedValue;
}

export default useDebounce;
