import {
Box,
Button
}
from "@mui/material";

import {
Plus
}
from "lucide-react";

function VoucherToolbar(){

return(

<Box
sx={{
display:"flex",
justifyContent:"space-between",
mb:3
}}
>

<Button
variant="contained"
startIcon={<Plus/>}
>

New Voucher

</Button>

</Box>

)

}

export default VoucherToolbar;