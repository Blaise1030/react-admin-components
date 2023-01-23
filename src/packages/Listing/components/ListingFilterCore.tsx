// Core logic for managing filters
import React from "react";
import {
  TFilter,
  TFilterBucket,
  TFilterContext,
  TFilterStates,
} from "../types";
import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from "react";

const ListingContext = createContext<TFilterContext<object>>({} as any);

export function ListingFilterProvider<T extends object>({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [filterStates, setFilterStates] = useState<TFilterBucket<T>>({});

  const onFilterChange = useCallback<
    <V>(n: string, value: TFilterStates<T, V>) => void
  >(
    (name, value) => setFilterStates((p) => ({ ...p, [name]: value })),
    [setFilterStates]
  );

  const getFilterState = useCallback(
    (n: string) => {
      const item = filterStates[n];
      if (item) return item?.value;
      else return null;
    },
    [filterStates]
  );

  const getCurrentFilterQuery = useCallback<() => TFilter<T>>(
    () => ({
      and: Object.values(filterStates).reduce(
        (p: TFilter<T>[], c: TFilterStates<T, unknown>) => [
          ...p,
          c.queryFunc(c.value),
        ],
        []
      ),
    }),
    [filterStates]
  );

  const removeFilter = useCallback(
    (name: string) => {
      setFilterStates((pS) =>
        Object?.keys(pS)
          ?.filter((n) => n !== name)
          .reduce((p, c) => {
            return { ...p, [c]: pS[c] };
          }, {})
      );
    },
    [setFilterStates]
  );

  return (
    <ListingContext.Provider
      value={{
        getCurrentFilterQuery,
        onFilterChange,
        getFilterState,
        removeFilter,
        filterStates,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}

export function useFilterController<T extends object, V>({
  queryFunc,
  name,
}: {
  queryFunc: (data: V) => TFilter<T>;
  name: string;
}) {
  const { onFilterChange, getFilterState, removeFilter } =
    useListingFilterProvider();
  return {
    onChange: (v: V) => onFilterChange(name, { value: v, queryFunc } as any),
    resetFilter: () => removeFilter(name),
    value: getFilterState(name),
  };
}

export function useListingFilterProvider() {
  return useContext(ListingContext);
}
