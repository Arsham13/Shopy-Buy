import { useState } from "react";

const toEnglishNumbers = (str) => {
  if (!str) return "";
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};

const normalizeInput = (value) => {
  const english = toEnglishNumbers(value);
  return english.replace(/[^\d]/g, "");
};

export default function usePersianNumberInput(initialValue = 0) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const raw = normalizeInput(e.target.value);
    const newValue = raw === "" ? 0 : Number(raw);
    setValue(newValue);
  };

  const displayValue = value.toLocaleString("fa");

  return [value, displayValue, setValue, handleChange];
}
