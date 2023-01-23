import {
  TFilter,
  TFilterKeys,
  TLabelMap,
  TOperationMap,
  TValueMap,
} from "../types";
import { useListingFilterProvider } from "./ListingFilterCore";
import React from "react";
import { Box, Chip, Stack } from "@mui/material";

export default function ListingFilterDisplay<T extends object>({
  operationMap,
  valueMap,
  labelMap,
}: {
  operationMap?: TOperationMap<keyof TFilterKeys>;
  labelMap?: TLabelMap<T, keyof T>;
  valueMap?: TValueMap<T, keyof T>;
}) {
  const { removeFilter, filterStates } = useListingFilterProvider();

  const hasFilters =
    Object.keys(filterStates).filter((f) => Boolean(filterStates[f])).length >
    0;

  return (
    <Box sx={{ position: "relative", py: hasFilters ? 1 : 0 }}>
      <Stack sx={{ overflowX: "auto", w: "full" }}>
        <Stack direction={"row"} gap={1}>
          {Object.keys(filterStates)
            .filter((f) => Boolean(filterStates[f]))
            .map((f, i) => (
              <Chip
                sx={{ borderRadius: 1, fontSize: "13px" }}
                onDelete={() => removeFilter(f)}
                key={i}
                label={generateStatements(
                  filterStates[f]?.queryFunc(filterStates[f]?.value),
                  operationMap || {},
                  labelMap || {},
                  valueMap || {}
                )}
              />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}

function generateStatements<T extends Object>(
  filters: TFilter<T>,
  operationMap: TOperationMap<keyof TFilterKeys>,
  keyMap: TLabelMap<T, keyof T>,
  valueMap: TValueMap<T, keyof T>
): string {
  const keys = Object.keys(filters);
  const isOr = keys?.length === 1 && keys[0] === "or";
  const isAnd = keys?.length === 1 && keys[0] === "and";
  if (isOr) {
    const values = (filters as any)?.or as TFilter<T>[];
    return values?.reduce((p, c, i) => {
      return `${p} ${i === 0 ? "" : " or "} ${generateStatements(
        c,
        operationMap,
        keyMap,
        valueMap
      )}`;
    }, "");
  } else if (isAnd) {
    const values = (filters as any)?.and as TFilter<T>[];
    return values?.reduce(
      (p, c, i) =>
        `${p} ${i === 0 ? "" : " and "} ${generateStatements(
          c,
          operationMap,
          keyMap,
          valueMap
        )}`,
      ""
    );
  }

  return handleRootFilters(filters, operationMap, keyMap, valueMap);
}

function handleRootFilters<T extends object>(
  rootFilter: TFilter<T>,
  operationMap: TOperationMap<keyof TFilterKeys>,
  keyMap: TLabelMap<T, keyof T>,
  valueMap: TValueMap<T, keyof T>
) {
  const keys = Object?.keys(rootFilter);
  if (keys?.length <= 0) return "";
  const key = keys[0];
  const operations = Object.keys((rootFilter as any)[key]);
  if (operations?.length <= 0) return "";
  const operation = operations[0];
  const value = (rootFilter as any)[key][operation] || "";
  return keys?.reduce(
    (p) =>
      `${p} ${(keyMap as any)[key] || key} ${
        (operationMap as any)[operation] || operation
      } ${
        (valueMap as any)[key]
          ? (valueMap as any)[key](value)
          : value?.replaceAll("*", "")
      }`,
    ""
  );
}
