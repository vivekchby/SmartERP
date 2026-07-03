import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import GroupToolbar from "../../components/Group/GroupToolbar";
import GroupTable from "../../components/Group/GroupTable";
import GroupDialog from "../../components/Group/GroupDialog";
import ConfirmDialog from "../../components/common/CommonDialog";
import { useRef } from "react";
import useFormShortcuts from "../hooks/useFormShortcuts";
import { exportToExcel } from "../../utils/exportExcel";

import {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../../services/groupApi";

const initialForm = {
  group_name: "",
  group_type: "Asset",
  parent_group: "",
  description: "",
};

function Groups() {
  const searchRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
const [confirmOpen,setConfirmOpen]=useState(false);
const [deleteId,setDeleteId]=useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

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

  const handleEdit = (group) => {
    setEditMode(true);
    setSelectedId(group.id);
    setFormData(group);
    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {

      if (editMode) {
        await updateGroup(
          selectedId,
          formData
        );

        toast.success(
          "Group Updated"
        );

      } else {

        await createGroup(formData);

        toast.success(
          "Group Created"
        );
      }

      setOpen(false);

      setFormData(initialForm);

      setSelectedId(null);

      setEditMode(false);

      fetchGroups();

    } catch (error) {

      console.error(error);

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

      await deleteGroup(id);

      toast.success(
        "Group Deleted"
      );

      fetchGroups();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }
  };
const confirmDelete=async()=>{

try{

await deleteGroup(deleteId);

toast.success("Group Deleted");

fetchGroups();

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

  const filteredGroups =
    groups.filter((group) => {
      return (
        group.group_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        group.group_type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

  const handleExport = () => {
    exportToExcel(filteredGroups, "Groups");
  };

  return (
    <DashboardLayout>

      <GroupToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <GroupTable
        groups={filteredGroups}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <GroupDialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        editMode={editMode}
        loading={loading}
      />
<ConfirmDialog
open={confirmOpen}
title="Delete Group"
message="Delete this group?"
onConfirm={confirmDelete}
onCancel={()=>setConfirmOpen(false)}
/>
    </DashboardLayout>
  );
}

export default Groups;