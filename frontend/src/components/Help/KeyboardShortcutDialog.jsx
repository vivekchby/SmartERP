import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const navigation = [
  ["Alt + D", "Dashboard"],
  ["Alt + C", "Customers"],
  ["Alt + S", "Suppliers"],
  ["Alt + I", "Stock"],
  ["Alt + P", "Purchase"],
  ["Alt + L", "Sales"],
  ["Alt + G", "Groups"],
  ["Alt + K", "Ledgers"],
  ["Alt + V", "Vouchers"],
  ["Alt + T", "Trial Balance"],
  ["Alt + R", "Reports"],
  ["Alt + Q", "Logout"],
];

const forms = [
  ["Ctrl + N", "New Record"],
  ["Ctrl + S", "Save Record"],
  ["Ctrl + F", "Focus Search"],
  ["Esc", "Close Dialog"],
];

function ShortcutTable({ title, rows }) {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          mt: 3,
          mb: 1,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Shortcut</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function KeyboardShortcutDialog({
  open,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        SmartERP Keyboard Guide
      </DialogTitle>

      <DialogContent dividers>

        <Typography color="text.secondary">
          Navigate through the ERP faster using these keyboard shortcuts.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <ShortcutTable
          title="Navigation"
          rows={navigation}
        />

        <ShortcutTable
          title="Forms"
          rows={forms}
        />

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default KeyboardShortcutDialog;