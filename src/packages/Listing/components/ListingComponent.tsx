import { useListingCore } from "../hooks/useListingCore";
import { TQueryListFunc } from "../types";
import {
  GridValidRowModel,
  DataGridProps,
  GridColumns,
  DataGrid,
} from "@mui/x-data-grid";
import React from "react";

export default function Listing<T extends GridValidRowModel>({
  defaultLimit,
  listingKey,
  queryFunc,
  onSuccess,
  columns,
  ...remaining
}: {
  onSuccess?: (data: { nextToken: string; total: number; items: T[] }) => void;
  queryFunc: TQueryListFunc<T>;
  columns: GridColumns<T>;
  defaultLimit?: number;
  listingKey: string;
} & Partial<Omit<DataGridProps, "columns">>) {
  const {
    setSortModel,
    isLoading,
    sortModel,
    setLimit,
    setPage,
    limit,
    data,
    page,
  } = useListingCore({
    defaultLimit,
    listingKey,
    queryFunc,
    onSuccess,
    columns,
  });

  return (
    <DataGrid<T>
      {...remaining}
      onSortModelChange={(a) => setSortModel(a)}
      rows={(data?.items || []) as T[]}
      rowCount={data?.total || 0}
      onPageSizeChange={setLimit}
      paginationMode="server"
      onPageChange={setPage}
      sortModel={sortModel}
      sortingMode="server"
      loading={isLoading}
      columns={columns}
      pageSize={limit}
      page={page}
    />
  );
}
