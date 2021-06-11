import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item,onUpdateCartQty,removeItem }) => {
  const classes = useStyles();



  return (
    item.quantity ? (
    <Card className="cart-item">
      <CardMedia image={item.image} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.subTotal}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,-1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography> {/* quantigyt */}
          <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" 
        onClick={()=>removeItem(item.id)} >Remove</Button>
      </CardActions>
    </Card>):(<div></div>)
  );
};

export default CartItem;