import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { Download, FileText } from "lucide-react";

function ReportToolbar({
  search,
  setSearch,
  onExport,
  onPDF,
}) {
  return (
    <Box
  sx={{
    display: "flex",
    gap: 2,
  }}
>
  <TextField
    size="small"
    placeholder="Search..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <Button
    variant="contained"
    startIcon={<Download size={18} />}
    onClick={onExport}
  >
    Excel
  </Button>

  <Button
    color="error"
    variant="contained"
    startIcon={<FileText size={18} />}
    onClick={onPDF}
  >
    PDF
  </Button>
</Box>
  );
}

export default ReportToolbar;