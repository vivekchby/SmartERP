import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getGroups } from "../../services/groupApi";
import LedgerToolbar from "../../components/Ledger/LedgerToolbar";
import LedgerTable from "../../components/Ledger/LedgerTable";
import LedgerDialog from "../../components/Ledger/LedgerDialog";
import ConfirmDialog from "../../components/common/CommonDialog";
import { exportToExcel } from "../../utils/exportExcel";

import {
  getLedgers,
  createLedger,
  updateLedger,
  deleteLedger,
} from "../../services/ledgerApi";
import { useRef } from "react";
import useFormShortcuts from "../hooks/useFormShortcuts";

const initialForm = {
  ledger_name: "",
  group_id: "",
  opening_balance: 0,
  balance_type: "Dr",
  phone: "",
  email: "",
  gst_number: "",
  address: "",
};

function Ledgers() {
  const searchRef = useRef(null);
  const [ledgers, setLedgers] = useState([]);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
const [confirmOpen,setConfirmOpen]=useState(false);
const [deleteId,setDeleteId]=useState(null);
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetchLedgers();
  fetchGroups();
}, []);

  const fetchLedgers = async () => {
    try {
      const response = await getLedgers();

      if (response.ledgers) {
        setLedgers(response.ledgers);
      } else {
        setLedgers(response);
      }
    } catch (error) {
      toast.error("Failed to load ledgers");
    }
  };
  const fetchGroups = async () => {
  try {
    const response = await getGroups();

    if (response.groups) {
      setGroups(response.groups);
    } else {
      setGroups(response);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load groups");
  }
};

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (ledger) => {
    setEditMode(true);
    setSelectedId(ledger.id);
    setFormData(ledger);
    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (editMode) {
        await updateLedger(selectedId, formData);
        toast.success("Ledger Updated");
      } else {
        await createLedger(formData);
        toast.success("Ledger Created");
      }

      fetchLedgers();

      setOpen(false);
      setFormData(initialForm);
      setSelectedId(null);
      setEditMode(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
setDeleteId(id);
setConfirmOpen(true);
    try {
      await deleteLedger(id);
      toast.success("Ledger Deleted");
      fetchLedgers();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };
const confirmDelete=async()=>{

try{

await deleteLedger(deleteId);

toast.success("Ledger Deleted");

fetchLedgers();

}catch{

toast.error("Delete Failed");

}

setConfirmOpen(false);

}
  useFormShortcuts({
    onSave: handleSave,
    onNew: handleAdd,
    onClose: () => setOpen(false),
    searchRef,
  });

  const filtered = ledgers.filter((ledger) =>
    ledger.ledger_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleExport = () => {
    exportToExcel(filtered, "Ledgers");
  };

  return (
    <DashboardLayout>

      <LedgerToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <LedgerTable
        ledgers={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <LedgerDialog
  groups={groups}
  open={open}
  onClose={() => setOpen(false)}
  formData={formData}
  setFormData={setFormData}
  onSave={handleSave}
  editMode={editMode}
  loading={loading}
/>
<ConfirmDialog
open={confirmOpen}
title="Delete Ledger"
message="Delete this ledger?"
onConfirm={confirmDelete}
onCancel={()=>setConfirmOpen(false)}
/>
    </DashboardLayout>
  );
}

export default Ledgers;