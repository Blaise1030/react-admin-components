import { useListingFilterProvider } from "../components/ListingFilterCore";
import { GridColumns, GridSortItem } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { TQueryListFunc } from "../types";
import { useState } from "react";

export function useListingCore<T extends object>({
  defaultLimit,
  listingKey,
  queryFunc,
  onSuccess,
}: {
  onSuccess?: (data: { nextToken: string; total: number; items: T[] }) => void;
  queryFunc: TQueryListFunc<T>;
  columns: GridColumns<T>;
  defaultLimit?: number;
  listingKey: string;
}) {
  const { getCurrentFilterQuery } = useListingFilterProvider();
  const [sortModel, setSortModel] = useState<GridSortItem[]>([]);
  const [limit, setLimit] = useState(defaultLimit || 20);
  const [nextToken, setNextToken] = useState<string>();
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: [listingKey, sortModel, limit, page, getCurrentFilterQuery()],
    onSuccess: (data: { nextToken: any; total?: number; items?: T[] }) => {
      setNextToken(data?.nextToken);
      if (onSuccess) onSuccess(data as any);
    },
    queryFn: async () => {
      let sort;
      if (sortModel?.length > 0)
        sort = { direction: sortModel[0]?.sort, field: sortModel[0]?.field };
      const filter = getCurrentFilterQuery();
      return await queryFunc({ nextToken, limit, page, sort, filter });
    },
  });

  return {
    setSortModel,
    sortModel,
    isLoading,
    setLimit,
    setPage,
    limit,
    page,
    data,
  };
}
