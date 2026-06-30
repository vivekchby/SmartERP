import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Plus } from "lucide-react";

function StockToolbar({
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
        flexWrap: "wrap",
        gap: 2,
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
          placeholder="Search Item..."
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
          Add Item
        </Button>
      </Box>
    </Box>
  );
}

export default StockToolbar;