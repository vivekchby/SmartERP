import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import VoucherToolbar from "../../components/Voucher/VoucherToolbar";
import VoucherTable from "../../components/Voucher/VoucherTable";
import VoucherDialog from "../../components/Voucher/VoucherDialog";
import {
  getVouchers,
} from "../../services/voucherApi";

function Vouchers() {

  const [vouchers,setVouchers]=useState([]);

  const fetchVouchers=async()=>{

    try{

      const response=
      await getVouchers();

      setVouchers(
        response.vouchers || []
      );

    }catch(error){

      console.log(error);

    }

  }

  useEffect(()=>{

    fetchVouchers();

  },[])

  return(

    <DashboardLayout>

      <VoucherToolbar/>

      <VoucherTable
        vouchers={vouchers}
      />

      <VoucherDialog/>

    </DashboardLayout>

  )

}

export default Vouchers;