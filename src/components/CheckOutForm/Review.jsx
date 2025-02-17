import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => (
  <>
    <Typography variant="h6" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      {checkoutToken.items.map((product) => (
        <ListItem style={{ padding: "10px 0" }} key={product.name}>
          <ListItemText
            primary={product.name}
            secondary={`Quantity: ${product.quantity}`}
          />
          <Typography variant="body2">{product.subTotal}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: "10px 0" }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {checkoutToken.totalAmount}
        </Typography>
      </ListItem>
    </List>
  </>
);

export default Review;
