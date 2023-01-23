# Getting Started with React Admin Components

This is a component library that aims to simplify the creation of admin panels and dashboards. This library aims to build ontop of other popular open source libraries namely Material UI, Tanstack Query, React Hook Forms and others.

####Usage

Wrap the root of the application with Tanstack Query provider

```jsx
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>
  // You root of app here
</QueryClientProvider>;
```

####Listings

```jsx
<ListingProvider>

    // Filters
    <ListingSearchBar />
    <ListingMultiSelect />

    // Actual Listing
    <Listing>

</ListingProvider>
```

`ListingProvider` is a context that manages the filters for the listing page and pass the filters for the `<Listing />`. Pagination is being handled under the `Listing` component.

Please check the [here](/src/Sample.tsx) for the basic usage. The system is strongly typed for developers to strongly understand what Resource that we are working on.

Sample:

![Sample Image](/src/assets/demo.png)

Provided Components

1. ListingAdvanceFilter
   A side bar drawer where is holds different filters components.
   ![Sample Image](/src/assets/AdvanceFilters.png)
2. ListingFilterDisplay
   Displays the applied filters. The filters can be canceled and reset
   ![Sample Image](/src/assets/FilterDisplayer.png)
3. ListingFilterDropdown
   Select one filter
   ![Sample Image](/src/assets/Dropdown.png)
4. ListingMultiSelect
   Select multiple filter
   ![Sample Image](/src/assets/Multifilter.png)
5. ListingSearchBar
   Search bar
   ![Sample Image](/src/assets/SearchBar.png)

Check the Generated filters formats [here](/src/packages/Listing/types.ts). This format can be transformed to the shape that you want

##### Headless Usage

To create your own filter component

```jsx
    const { value: V, onChange: (value:V) => void, resetFilter: ()=> void } = useFilterController<T, V>({
        queryFunc: (v: T) => TFilter<T>,
        name: string,
  });
```

To create your own listing component just use this hook

```jsx
    function useListingCore<T>({
        queryFunc: TQueryListFunc<T>;
        columns: GridColumns<T>;
        defaultLimit?: number;
        listingKey: string;
        onSuccess?: (data: {
            nextToken: string;
            total: number;
            items: T[];
        }) => void;
    }) => ({
        setSortModel: React.Dispatch<React.SetStateAction<GridSortItem[]>>;
        setLimit: React.Dispatch<React.SetStateAction<number>>;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        sortModel: GridSortItem[];
        isLoading: boolean;
        limit: number;
        page: number;
        data: any;
    })
```
