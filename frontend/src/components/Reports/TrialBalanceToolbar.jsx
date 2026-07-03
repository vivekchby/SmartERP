import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  Search,
  Printer,
  FileDown,
} from "lucide-react";

function TrialBalanceToolbar({
  search,
  setSearch,
  groupFilter,
  setGroupFilter,
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
          placeholder="Search Ledger..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <Search size={18} />
            ),
          }}
        />

        <TextField
          select
          size="small"
          value={groupFilter}
          onChange={(e) =>
            setGroupFilter(e.target.value)
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            All Groups
          </MenuItem>

          <MenuItem value="Assets">
            Assets
          </MenuItem>

          <MenuItem value="Liabilities">
            Liabilities
          </MenuItem>

          <MenuItem value="Income">
            Income
          </MenuItem>

          <MenuItem value="Expense">
            Expense
          </MenuItem>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Printer size={18} />}
          onClick={() => window.print()}
        >
          Print
        </Button>

        <Button
          variant="outlined"
          startIcon={<FileDown size={18} />}
          disabled
        >
          PDF
        </Button>

        <Button
          variant="contained"
          startIcon={<FileDown size={18} />}
          disabled
        >
          Excel
        </Button>
      </Box>
    </Box>
  );
}

export default TrialBalanceToolbar;