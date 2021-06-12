import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, CheckOut ,ReactHookForm, Footer} from './components';
import res from './api/items.json'
import {useSelector,useDispatch} from 'react-redux';
import fetchProductAction from './redux/actions/fetchProduct'


const App = () => {

  const productsFromRedux = useSelector(state=> state.fetchProductsFromRedux)
  console.log('products from redux', productsFromRedux)
  const disptach = useDispatch();
  if(productsFromRedux.initialState.items != undefined){
  console.log('products res from redux', productsFromRedux.initialState)
  }
  
  const [cart, setCart] = useState({noOfitems:0,totalAmount:0,items:[res.items[0],res.items[1]
    ,res.items[2],res.items[3],res.items[4],res.items[5],res.items[6],res.items[7]]});

  //const [products, setProducts] = useState(res); used before creating redux container
  
  //const [order, setOrder] = useState({});
  //const [errorMessage, setErrorMessage] = useState('');
 // const res = await fetch('/api/data/prices.json');

  // const fetchProducts = async () => {
  //   //const res  = await fetch('./api/items.json');
  //   //const data = await res.json();
  //   console.log(res);
  //   setProducts(res);
  // };

//   const fetchCart = async () => {
//     setCart(await commerce.cart.retrieve());
//   };

  const handleAddToCart = async (product, quantity) => {

    setCart(prevState => ({
        noOfitems: prevState.noOfitems+quantity,
        totalAmount: prevState.totalAmount+product.price,
        //items : [...prevState.items,product]
        items : cart.items.map((item)=>
        {
                if(item.id === product.id){
                    item.quantity = item.quantity+quantity;
                    item.subTotal = item.subTotal+item.price;
                }
                return item;
        })
    
  }))
  console.log(cart);
};

  const handleUpdateCartQty = async (lineItemId, quantity) => {

    setCart(prevState => ({
        noOfitems: prevState.noOfitems+quantity,
        totalAmount: prevState.totalAmount+(cart.items[lineItemId-1].price*quantity),
        items : cart.items.map((item)=>
        {
                if(item.id === lineItemId){
                    item.quantity = item.quantity+quantity;
                    item.subTotal = item.subTotal+(item.price*quantity);
                }
                return item;
        })
    
  }))
  };

  const handleRemoveFromCart = async (lineItemId) => {
    console.log('cart items',cart.items[lineItemId-1])
    console.log('cart id',lineItemId);
    setCart(prevState => ({
        noOfitems: prevState.noOfitems-cart.items[lineItemId-1].quantity,
        totalAmount: prevState.totalAmount-cart.items[lineItemId-1].subTotal,
        items : cart.items.map((item)=>
        {
                if(item.id === lineItemId){
                    item.quantity = 0;
                    item.subTotal = 0;
                }
                return item;
        })
    
  }))
  };

  const handleEmptyCart = async () => {
    setCart(prevState => ({
        noOfitems: 0,
        totalAmount: 0,
        items : cart.items.map((item)=>
        {
                item.quantity = 0;
                item.subTotal = 0;
                return item;
        })
    
  }))
  };

//   const refreshCart = async () => {
//     const newCart = await commerce.cart.refresh();

//     setCart(newCart);
//   };

//   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
//     try {
//       const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

//       setOrder(incomingOrder);

//       refreshCart();
//     } catch (error) {
//       setErrorMessage(error.data.error.message);
//     }
//   };

  useEffect(() => {
    
    //fetchProducts();
    //console.log('products from state', products)
    disptach(fetchProductAction());
    console.log('products taking redux', productsFromRedux.initialState)
  }, []);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen); style={{ display: 'flex' }}

  return (
    <Router>
      <div > 
        <CssBaseline />

        {/* <Navbar totalItems={cart.noOfitems} />
        <Products products={products} onAddToCart={handleAddToCart} /> */}
        <Switch>
          <Route exact path="/">
          <Navbar totalItems={cart.noOfitems} />
          
          <Products products={productsFromRedux.initialState} onAddToCart={handleAddToCart} />
          
          
            
          </Route>
          <Route exact path="/cart">
          <Navbar totalItems={cart.noOfitems} />
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} removeItem={handleRemoveFromCart}
                  makeCartEmpty={handleEmptyCart}
            />
          </Route>
          <Route path="/checkout" exact>
            <CheckOut cart={cart}/>
             {/* cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} /> */}
          </Route>
          <Route path="/form" exact>
              <ReactHookForm />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;