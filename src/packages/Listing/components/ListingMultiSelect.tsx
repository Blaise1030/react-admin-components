import { useFilterController } from "./ListingFilterCore";
import { TFilter } from "../types";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import React from "react";

export default function ListingMultiSelect<T extends object>({
  options,
  name,
  title,
}: {
  options: { label: string; query: TFilter<T>; value: string }[];
  title: string;
  name: string;
}) {
  const { value, onChange, resetFilter } = useFilterController<T, string[]>({
    queryFunc: getDropdownQuery,
    name,
  });

  const bucketValue = value || [];

  function getDropdownQuery(v: string[]) {
    if (v.length === 0) resetFilter();
    return {
      and: options
        .filter(({ value }) => v.includes(value))
        .map(({ query }) => query),
    };
  }

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend" sx={{ fontSize: "sm" }}>
        {title}
      </FormLabel>
      <FormGroup>
        {options?.map(({ label, value: v }) => (
          <FormControlLabel
            key={v}
            label={label}
            control={
              <Checkbox
                checked={bucketValue?.includes(v)}
                name={label}
                onChange={() =>
                  bucketValue?.includes(v)
                    ? onChange(bucketValue?.filter((f: string) => f !== v))
                    : onChange([...bucketValue, v])
                }
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
