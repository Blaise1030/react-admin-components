import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useFilterController } from "./ListingFilterCore";
import { TFilter } from "../types";
import React from "react";
const NONE = "none";

export default function ListingFilterDropdown<T extends object>({
  options,
  name,
  ...remaining
}: {
  options: { label: string; query: TFilter<T>; value: string }[];
  name: string;
} & Omit<Omit<TextFieldProps, "options">, "name">) {
  const { value, onChange, resetFilter } = useFilterController<T, string>({
    queryFunc: getDropdownQuery,
    name,
  });

  function getDropdownQuery(v: string) {
    const selection = options.filter(({ value }) => value === v);
    return selection[0]?.query;
  }

  function onDropdownChange(v: string) {
    if (v === NONE) resetFilter();
    else onChange(v);
  }

  return (
    <React.Fragment>
      <TextField
        onChange={(e) => onDropdownChange(e.target.value)}
        variant="outlined"
        value={value || NONE}
        select
        {...remaining}
      >
        <MenuItem value={NONE}>None</MenuItem>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
}
