import { useFilterController } from "./ListingFilterCore";
import { TextField, TextFieldProps } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { TFilter } from "../types";

export default function ListingSearchBar<T extends object>({
  queryFunc,
  name,
  ...remaining
}: {
  queryFunc: (v: string) => TFilter<T>;
  name: string;
} & TextFieldProps) {
  const [search, setSearch] = useState("");
  useDebounce(search, (v) => (v === "" ? resetFilter() : onChange(v)));
  const { onChange, resetFilter, value } = useFilterController<T, string>({
    queryFunc,
    name,
  });
  useEffect(() => setSearch(value || ""), [value]);

  return (
    <React.Fragment>
      <TextField
        size="small"
        {...remaining}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </React.Fragment>
  );
}
