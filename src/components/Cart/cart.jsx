import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty,removeItem,makeCartEmpty }) => {
  const classes = useStyles();


  const renderEmptyCart = () => (
    <div className={classes.noItem}>
    <Typography variant="subtitle1"  gutterBottom>You have no items in your shopping cart, 
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
    </div>
  );

  if (!cart.items) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.items.map((lineItem) => {
          console.log('lineItem quantity',lineItem.quantity);
          if(lineItem.quantity ===0){
            return 
          }
          return(
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} removeItem={removeItem} />
          </Grid>
          )
        })}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.totalAmount}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" 
           onClick={()=>makeCartEmpty()} gutterBottom>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.noOfitems ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;