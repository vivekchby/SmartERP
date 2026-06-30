import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Role</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(user)}>
                    <Pencil size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(user.id)}>
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default UserTable;
