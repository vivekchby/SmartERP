import { useEffect, useState } from "react";
import { getTrialBalance } from "../../services/reportApi";
import TrialBalanceCards from "../../components/Reports/TrialBalanceCards";
import TrialBalanceToolbar from "../../components/Reports/TrialBalanceToolbar";
import TrialBalanceTable from "../../components/Reports/TrialBalanceTable";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  Typography,
  Alert,
} from "@mui/material";


function TrialBalance() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupFilter, setGroupFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getTrialBalance();
      const fetchedRows = response?.rows || [];
      setRows(fetchedRows);
      setTotalDebit(Number(response?.totalDebit ?? fetchedRows.reduce((s, r) => s + (Number(r.debit) || 0), 0)));
      setTotalCredit(Number(response?.totalCredit ?? fetchedRows.reduce((s, r) => s + (Number(r.credit) || 0), 0)));
      setError("");
    } catch (err) {
      console.error(err);
      setRows([]);
      setTotalDebit(0);
      setTotalCredit(0);
      setError("Unable to load trial balance right now.");
    } finally {
      setLoading(false);
    }
  };

const filteredRows = rows.filter((row) => {
  const searchMatch =
    (row.ledger_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const groupMatch =
    groupFilter === "" ||
    (row.group_name || "") === groupFilter;

  return searchMatch && groupMatch;
});
   

  return (
  <DashboardLayout>

    <Typography
      variant="h4"
      fontWeight="bold"
      mb={3}
    >
      Trial Balance
    </Typography>
{loading && (
  <Typography mb={2}>
    Loading...
  </Typography>
)}
{error && (
  <Alert
    severity="error"
    sx={{ mb: 2 }}
  >
    {error}
  </Alert>
)}
    <TrialBalanceCards
      debit={totalDebit}
      credit={totalCredit}
    />

    <Alert
      severity={
        totalDebit===totalCredit
        ?"success"
        :"error"
      }
      sx={{mb:3}}
    >
      {
        totalDebit===totalCredit
        ?
        "Trial Balance Matched"
        :
        "Trial Balance Not Matched"
      }
    </Alert>

    <TrialBalanceToolbar

      search={search}

      setSearch={setSearch}

      groupFilter={groupFilter}

      setGroupFilter={setGroupFilter}

    />

    {filteredRows.length === 0 ? (

<Typography
sx={{ mt:5 }}
align="center"
>

No Trial Balance Data Found

</Typography>

) : (

<TrialBalanceTable

rows={filteredRows}

totalDebit={totalDebit}

totalCredit={totalCredit}

/>

)}

  </DashboardLayout>
);
}

export default TrialBalance;