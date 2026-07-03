import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import UserToolbar from "../../components/Users/UserToolbar";
import UserTable from "../../components/Users/UserTable";
import UserDialog from "../../components/Users/UserDialog";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userApi";
import ConfirmDialog from "../../components/common/CommonDialog";
import useFormShortcuts from "../hooks/useFormShortcuts";
import { exportToExcel } from "../../utils/exportExcel";

const initialForm = {
  name: "",
  email: "",
  role: "",
  password: "",
};

function Users() {
  const searchRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
const [confirmOpen,setConfirmOpen]=useState(false);
const [deleteId,setDeleteId]=useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.users ?? response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedId(user.id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      password: "",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (editMode) {
        await updateUser(selectedId, payload);
        toast.success("User updated successfully");
      } else {
        await createUser(payload);
        toast.success("User created successfully");
      }

      setOpen(false);
      setFormData(initialForm);
      setSelectedId(null);
      setEditMode(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to save user"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
setConfirmOpen(true);
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  const confirmDelete=async()=>{

try{

await deleteUser(deleteId);

toast.success("User Deleted");

fetchUsers();

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

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleExport = () => {
    exportToExcel(filteredUsers, "Users");
  };

  return (
    <DashboardLayout>
      <UserToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserDialog
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
title="Delete User"
message="Delete this user?"
onConfirm={confirmDelete}
onCancel={()=>setConfirmOpen(false)}
/>
    </DashboardLayout>
  );
}

export default Users;
