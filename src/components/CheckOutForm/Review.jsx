import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ cart }) => {

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {
        (cart && cart.noOfitems > 0) ?
          (<List disablePadding>
            {cart.items.map((product) => (
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
                {cart.totalAmount}
              </Typography>
            </ListItem>
          </List>) : <Typography variant="h7">Please add Items to Cart</Typography>
      }
    </>)
};

export default Review;
