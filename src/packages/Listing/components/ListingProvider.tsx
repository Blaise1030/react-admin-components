import React from "react";
import { ReactElement } from "react";
import { ListingFilterProvider } from "./ListingFilterCore";

export default function ListingProvider<T extends object>({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return <ListingFilterProvider<T>>{children}</ListingFilterProvider>;
}
