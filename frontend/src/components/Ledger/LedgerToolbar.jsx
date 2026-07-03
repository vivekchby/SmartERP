import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import { Download, Plus } from "lucide-react";

function LedgerToolbar({
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
        mb: 3,
        gap: 2,
      }}
    >
      <TextField
inputRef={searchRef}
label="Search Ledger"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Add Ledger
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

export default LedgerToolbar;