import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material";
import { ListingProvider, ListingSearchBar } from "../packages/Listing";
import { theme } from "../constants/index";
import ComponentDisplayer from "../components/ComponentDisplayer";
import { Box } from "@mui/system";

export default {
  title: "Search Bar",
  component: ListingSearchBar,
};

const queryClient = new QueryClient();
export const Primary = () => {
  return (
    <Box sx={{ p: 2 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={createTheme(theme as any)}>
          <ListingProvider>
            <ListingSearchBar<{ name: string }>
              queryFunc={(v) => ({ name: { eq: v } })}
              name="Listing Search Bar"
              placeholder="Search"
              size="small"
            />
            <ComponentDisplayer />
          </ListingProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Box>
  );
};
