export type TFilter<T extends object> =
  | FieldFilter<T, keyof T>
  | { or: TFilter<T>[] | null }
  | { and: TFilter<T>[] | null }
  | { not: TFilter<T>[] | null };

type SearchableStringFilterInput = {
  ne?: string | null;
  gt?: string | null;
  lt?: string | null;
  gte?: string | null;
  lte?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
};

type SearchableBooleanFilterInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

type SearchableFloatFilterInput = {
  ne?: number | null;
  gt?: number | null;
  lt?: number | null;
  gte?: number | null;
  lte?: number | null;
  eq?: number | null;
};

type SearchableIntFilterInput = {
  ne?: number | null;
  gt?: number | null;
  lt?: number | null;
  gte?: number | null;
  lte?: number | null;
  eq?: number | null;
};

type TPrimitiveFilter =
  | SearchableStringFilterInput
  | SearchableBooleanFilterInput
  | SearchableIntFilterInput
  | SearchableFloatFilterInput;

export type TFilterKeys = SearchableStringFilterInput &
  SearchableBooleanFilterInput &
  SearchableIntFilterInput &
  SearchableFloatFilterInput;

type FieldFilter<T extends object, K extends keyof T> = {
  [k in K]?: TPrimitiveFilter;
};

export type TFilterStates<T extends object, V> = {
  queryFunc: (data: V) => TFilter<T>;
  value: V;
};

export type TFilterBucket<T extends object> = {
  [k: string]: TFilterStates<T, any>;
};

export type TFilterContext<T extends object> = {
  onFilterChange: (n: string, q: TFilterStates<T, unknown>) => void;
  getCurrentFilterQuery: () => TFilter<T>;
  getFilterState: (n: string) => any;
  removeFilter: (n: string) => void;
  filterStates: TFilterBucket<T>;
};

export type TOperationMap<K extends keyof TFilterKeys> = {
  [k in K]?: string;
};

export type TLabelMap<T extends object, K extends keyof T> = {
  [k in K]?: string;
};

export type TValueMap<T extends object, K extends keyof T> = {
  [k in K]?: (v: K) => string;
};

export type TQueryListFunc<T extends object> = (p: {
  filter?: TFilter<T> | null;
  sort?: SortDirection;
  nextToken?: string;
  limit: number;
  page: number;
}) => Promise<{
  nextToken: string;
  total: number;
  items: T[];
}>;

export type SortDirection = {
  direction?: string | null;
  field?: string | null;
};
