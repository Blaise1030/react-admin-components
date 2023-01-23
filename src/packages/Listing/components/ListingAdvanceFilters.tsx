import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { FilterAlt } from "@mui/icons-material";
import { Stack } from "@mui/system";

function DefaultFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outlined" startIcon={<FilterAlt />} onClick={onClick}>
      More Filters
    </Button>
  );
}

export default function ListingAdvanceFilters({
  ToggleFilterButton = DefaultFilterButton,
  title = "More Filters",
  children,
}: {
  ToggleFilterButton?: React.FC<{ onClick: () => void }>;
  children: ReactElement | ReactElement[];
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((f) => !f);

  return (
    <React.Fragment>
      <ToggleFilterButton onClick={onToggle} />
      <Drawer open={isOpen} anchor="right" keepMounted onClose={onToggle}>
        <Stack
          sx={{ height: "100%", px: 2, minWidth: { xs: "80vw", md: 250 } }}
          spacing={2}
        >
          <DrawerHeaderDrawer title={title} />
          <Stack sx={{ height: "100%", paddingBottom: 10 }} spacing={2}>
            {children}
          </Stack>
          <DrawerBottom onToggle={onToggle} />
        </Stack>
      </Drawer>
    </React.Fragment>
  );
}

// Subcomponents for more filters

function DrawerBottom({ onToggle }: { onToggle: () => void }) {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={({ palette }) => ({
        backgroundColor: "Background",
        position: "sticky",
        bottom: 0,
        py: 2,
      })}
    >
      <Button fullWidth variant="outlined" onClick={onToggle}>
        Close
      </Button>
    </Stack>
  );
}
function DrawerHeaderDrawer({ title }: { title: string }) {
  return (
    <Box
      sx={({ palette }) => ({
        borderBottom: 1,
        borderColor: palette.divider,
        backgroundColor: "Background",
        position: "sticky",
        zIndex: 1,
        top: 0,
        py: 1,
      })}
    >
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}
