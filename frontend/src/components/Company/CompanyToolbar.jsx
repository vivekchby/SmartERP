import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { Plus } from "lucide-react";

function CompanyToolbar({
  search,
  setSearch,
  onAdd,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search Company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Add Company
        </Button>
      </Box>
    </Box>
  );
}

export default CompanyToolbar;