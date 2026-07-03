import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import { getLedgerDropdown } from "../../services/ledgerApi";
import VoucherEntriesTable from "../../components/Voucher/VoucherEntriesTable";
import VoucherTotals from "../../components/Voucher/VoucherTotals";
import { createVoucher } from "../../services/voucherApi";
import { toast } from "react-toastify";

function VoucherEntry() {
  const [ledgers, setLedgers] = useState([]);
  const [entries, setEntries] = useState([
    {
      ledger_id: "",
      debit: "",
      credit: "",
      remarks: "",
    },
  ]);
  const [voucher, setVoucher] = useState({
    voucher_number: "",
    voucher_type: "Payment",
    voucher_date: new Date().toISOString().split("T")[0],
    narration: "",
  });

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const response = await getLedgerDropdown();
        setLedgers(response.ledgers || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLedgers();
  }, []);

  const handleSave = async () => {
    try {
      await createVoucher({
        ...voucher,
        entries,
      });

      toast.success("Voucher Saved Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Save Voucher"
      );
    }
  };

  const totalDebit = entries.reduce(
    (sum, row) => sum + Number(row.debit || 0),
    0
  );

  const totalCredit = entries.reduce(
    (sum, row) => sum + Number(row.credit || 0),
    0
  );

  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Voucher Entry
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Voucher No"
            value={voucher.voucher_number}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Voucher Type"
            value={voucher.voucher_type}
          >
            <MenuItem value="Payment">
              Payment
            </MenuItem>

            <MenuItem value="Receipt">
              Receipt
            </MenuItem>

            <MenuItem value="Contra">
              Contra
            </MenuItem>

            <MenuItem value="Journal">
              Journal
            </MenuItem>

          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="date"
            label="Voucher Date"
            InputLabelProps={{
              shrink: true,
            }}
            value={voucher.voucher_date}
          />
        </Grid>

      </Grid>
      <VoucherEntriesTable
  entries={entries}
  setEntries={setEntries}
  ledgers={ledgers}
/>

<VoucherTotals
  debit={
    entries.reduce(
      (sum, row) =>
        sum + Number(row.debit || 0),
      0
    )
  }
  credit={
    entries.reduce(
      (sum, row) =>
        sum + Number(row.credit || 0),
      0
    )
  }
/>
<Button
variant="contained"
size="large"
disabled={!isBalanced}
onClick={handleSave}
>

Save Voucher

</Button>

    </Paper>
  );
}

export default VoucherEntry;