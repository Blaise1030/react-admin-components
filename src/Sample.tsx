import React, { useCallback } from "react";
import ListingAdvanceFilters from "./packages/Listing/components/ListingAdvanceFilters";
import Listing from "./packages/Listing/components/ListingComponent";
import ListingFilterDisplay from "./packages/Listing/components/ListingFilterDisplay";
import ListingProvider from "./packages/Listing/components/ListingProvider";
import ListingSearchBar from "./packages/Listing/components/ListingSearchBar";
import { TQueryListFunc } from "./packages/Listing/types";
import {
  Container,
  Box,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ListingFilterDropdown, ListingMultiSelect } from "./packages/Listing";

export default function Home() {
  const queryFunction: TQueryListFunc<TProduct> = useCallback(
    async ({ limit, page, filter }) => {
      const URL = "https://dummyjson.com/products/search";
      let q = "";
      if ((filter as any)?.and?.length > 0)
        q = (filter as any)?.and[0]?.title?.eq;
      const r = await fetch(
        `${URL}?q=${q}&limit=${limit}&skip=${limit * page}`
      );
      const res: TProductResult = await r.json();
      return {
        items: res?.products,
        total: res?.total,
        nextToken: "1",
      };
    },
    []
  );

  return (
    <>
      <Container
        maxWidth="xl"
        sx={({ palette }) => ({
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
          width: "100%",
        })}
      >
        <Stack
          sx={{ width: "100%", pt: 2 }}
          alignItems={"stretch"}
          direction="column"
          spacing={1}
        >
          <Typography variant="h5" mb={1}>
            Products
          </Typography>
          <ListingProvider<TProduct>>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              sx={{ width: "100%" }}
              spacing={1}
            >
              <Stack direction={"row"} spacing={2}>
                <ListingSearchBar<TProduct>
                  queryFunc={(v: string) => ({ title: { eq: v } })}
                  placeholder="Search Name"
                  name="search-name"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <ListingAdvanceFilters>
                <ListingSearchBar<TProduct>
                  queryFunc={(v: string) => ({ title: { eq: v } })}
                  placeholder="Search Name"
                  name="search-name1"
                  size="small"
                />
                <ListingMultiSelect
                  name={"filtername"}
                  title={"Category"}
                  options={[
                    {
                      query: { title: { eq: "phone" } },
                      label: "Phones",
                      value: "1",
                    },
                    {
                      query: { title: { eq: "laptop" } },
                      label: "Laptops",
                      value: "2",
                    },
                  ]}
                />
                <ListingFilterDropdown
                  name={"dropdown"}
                  title={"Category"}
                  size="small"
                  options={[
                    {
                      query: { title: { eq: "phone" } },
                      label: "Phones",
                      value: "1",
                    },
                    {
                      query: { title: { eq: "laptop" } },
                      label: "Laptops",
                      value: "2",
                    },
                  ]}
                />
              </ListingAdvanceFilters>
            </Stack>
            <ListingFilterDisplay
              operationMap={{ eq: "equals" }}
              labelMap={{ title: "Title" }}
            />
            <Box sx={{ height: "75vh", backgroundColor: "white" }}>
              <Listing<TProduct>
                listingKey={"product listing"}
                getRowId={(row) => row?.id}
                queryFunc={queryFunction}
                rowsPerPageOptions={[20]}
                density="standard"
                checkboxSelection
                sx={{
                  ".MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                  },
                  "	.MuiDataGrid-columnHeaders": {
                    backgroundColor: "#EEF2F6",
                    border: "4px solid white",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  },
                }}
                columns={[
                  {
                    filterable: false,
                    sortable: false,
                    field: "title",
                    flex: 1,
                    renderCell({ row }) {
                      return <>{row.title}</>;
                    },
                    renderHeader(params) {
                      return <>Title</>;
                    },
                  },
                  {
                    filterable: false,
                    sortable: false,
                    flex: 1,
                    field: "price",
                    renderCell({ row }) {
                      return <>{row.price}</>;
                    },
                    renderHeader(params) {
                      return <>Price</>;
                    },
                  },
                ]}
              />
            </Box>
          </ListingProvider>
        </Stack>
      </Container>
    </>
  );
}

type TProduct = {
  discountPercentage: number;
  description: string;
  thumbnail: string;
  category: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  title: string;
  price: number;
  id: number;
};

type TProductResult = {
  products: TProduct[];
  limit: number;
  total: number;
  skip: number;
};
