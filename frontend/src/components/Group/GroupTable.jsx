import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import {
  Pencil,
  Trash2,
} from "lucide-react";

function GroupTable({
  groups,
  onEdit,
  onDelete,
}) {
  return (
    <Paper>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>
              Group Name
            </TableCell>

            <TableCell>
              Group Type
            </TableCell>

            <TableCell>
              Parent Group
            </TableCell>

            <TableCell>
              Description
            </TableCell>

            <TableCell align="center">Actions</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {groups.map((group) => (
            <TableRow key={group.id}>

              <TableCell>
                {group.group_name}
              </TableCell>

              <TableCell>
                {group.group_type}
              </TableCell>

              <TableCell>
                {group.parent_group || "-"}
              </TableCell>

              <TableCell>
                {group.description || "-"}
              </TableCell>

              <TableCell align="center">

                <IconButton
                  color="primary"
                  onClick={() =>
                    onEdit(group)
                  }
                >
                  <Pencil size={18} />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(group.id)
                  }
                >
                  <Trash2 size={18} />
                </IconButton>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </Paper>
  );
}

export default GroupTable;