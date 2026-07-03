import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  Plus,
  Trash2,
} from "lucide-react";

function VoucherEntriesTable({
  entries,
  setEntries,
  ledgers,
}) {
  return (
    <Paper sx={{ mt: 3 }}>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell width="40%">
              Ledger
            </TableCell>

            <TableCell>

<TextField
    fullWidth
    type="number"
    value={entry.debit}
    onChange={(e)=>{

        const updated=[...entries];

        updated[index].debit=e.target.value;

        if(e.target.value!==""){
            updated[index].credit="";
        }

        setEntries(updated);

    }}
/>

</TableCell>

            <TableCell>

<TextField
    fullWidth
    type="number"
    value={entry.credit}
    onChange={(e)=>{

        const updated=[...entries];

        updated[index].credit=e.target.value;

        if(e.target.value!==""){
            updated[index].debit="";
        }

        setEntries(updated);

    }}
/>

</TableCell>

            <TableCell>

<TextField
    fullWidth
    value={entry.remarks}
    onChange={(e)=>{

        const updated=[...entries];

        updated[index].remarks=e.target.value;

        setEntries(updated);

    }}
/>

</TableCell>

            <TableCell align="center">
              Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {entries.map((entry, index) => (

            <TableRow key={index}>

              <TableCell>
                <TextField
  select
  fullWidth
  value={entry.ledger_id}
  onChange={(e) => {
    const updated = [...entries];
    updated[index].ledger_id =
      e.target.value;
    setEntries(updated);
  }}
>
  {ledgers.map((ledger) => (
    <MenuItem
      key={ledger.id}
      value={ledger.id}
    >
      {ledger.ledger_name}
    </MenuItem>
  ))}
</TextField>
              </TableCell>

              <TableCell>
                Debit
              </TableCell>

              <TableCell>
                Credit
              </TableCell>

              <TableCell>
                Remarks
              </TableCell>

              <TableCell align="center">

                <IconButton

color="error"

onClick={()=>{

    if(entries.length===1) return;

    const updated=entries.filter(
        (_,i)=>i!==index
    );

    setEntries(updated);

}}

>

<Trash2 size={18}/>

</IconButton>

              </TableCell>

            </TableRow>

          ))}

          <TableRow>

            <TableCell
              colSpan={5}
              align="center"
            >

              <IconButton

color="primary"

onClick={()=>{

    setEntries([

        ...entries,

        {

            ledger_id:"",

            debit:"",

            credit:"",

            remarks:""

        }

    ])

}}

>

<Plus/>

</IconButton>

            </TableCell>

          </TableRow>

        </TableBody>

      </Table>

    </Paper>
  );
}
<Box
  sx={{
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <Button
    variant="contained"
    size="large"
  >
    Save Voucher
  </Button>
</Box>

export default VoucherEntriesTable;