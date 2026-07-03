import {
Paper,
Table,
TableHead,
TableBody,
TableRow,
TableCell
}
from "@mui/material";

function VoucherTable({
vouchers
}){

return(

<Paper>

<Table>

<TableHead>

<TableRow>

<TableCell>
Voucher No
</TableCell>

<TableCell>
Type
</TableCell>

<TableCell>
Date
</TableCell>

<TableCell>
Amount
</TableCell>

</TableRow>

</TableHead>

<TableBody>

{
vouchers.map(v=>(

<TableRow
key={v.id}
>

<TableCell>
{v.voucher_number}
</TableCell>

<TableCell>
{v.voucher_type}
</TableCell>

<TableCell>
{v.voucher_date}
</TableCell>

<TableCell>
₹ {v.total_amount}
</TableCell>

</TableRow>

))
}

</TableBody>

</Table>

</Paper>

)

}

export default VoucherTable;