import { useFilterController } from "./ListingFilterCore";
import { TFilter } from "../types";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";

export default function ListingMultiSelect<T extends object>({
  options,
  name,
  title,
}: {
  options: { label: string; query: TFilter<T>; value: string }[];
  title: string;
  name: string;
}) {
  const getDropdownQuery = useCallback((v: string[]) => {
    return {
      and: options
        .filter(({ value }) => v.includes(value))
        .map(({ query }) => query),
    };
  }, []);

  const { value, onChange, resetFilter } = useFilterController<T, string[]>({
    queryFunc: getDropdownQuery,
    name,
  });

  useEffect(() => {
    if (value?.length === 0) resetFilter();
  }, [value]);

  const bucketValue = value || [];

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
                onChange={() => {
                  if (bucketValue?.includes(v))
                    onChange(bucketValue?.filter((f: string) => f !== v));
                  else onChange([...bucketValue, v]);
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
