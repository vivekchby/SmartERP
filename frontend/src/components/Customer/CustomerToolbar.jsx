import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { Download, Plus } from "lucide-react";

function CustomerToolbar({
  search,
  setSearch,
  onAdd,
  onExport,
  searchRef,
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
inputRef={searchRef}
label="Search Customer"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Add Customer
        </Button>

        <Button
          variant="outlined"
          startIcon={<Download size={18} />}
          onClick={onExport}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
}

export default CustomerToolbar;