import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const initialForm = {
  name: "",
  email: "",
  role: "",
  password: "",
};

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

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
    if (!window.confirm("Delete this user?")) return;

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

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <UserToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
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
    </DashboardLayout>
  );
}

export default Users;
