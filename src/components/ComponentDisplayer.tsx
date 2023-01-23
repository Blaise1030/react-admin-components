import { useListingFilterProvider } from "../packages/Listing";
import { Box, Stack } from "@mui/system";

export default function ComponentDisplayer() {
  const { getCurrentFilterQuery } = useListingFilterProvider();
  return (
    <Stack sx={{ py: 2 }}>
      <Box>Generated query: </Box>
      <Box>{JSON.stringify(getCurrentFilterQuery())}</Box>
    </Stack>
  );
}
