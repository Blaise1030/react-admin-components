import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactElement } from "react";
import { ListingFilterProvider } from "./ListingFilterCore";

const qC = new QueryClient();
export default function ListingProvider<T extends object>({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <ListingFilterProvider<T>>
      <QueryClientProvider client={qC}>{children}</QueryClientProvider>
    </ListingFilterProvider>
  );
}
