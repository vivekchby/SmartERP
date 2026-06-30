import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function InventoryCard({ value }) {
  return (
    <Card elevation={3}>
      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          Inventory Value
        </Typography>

        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
        >
          ₹{value}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default InventoryCard;