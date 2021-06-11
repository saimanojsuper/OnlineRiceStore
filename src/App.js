import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, CheckOut ,ReactHookForm, Footer} from './components';
import res from './api/items.json'
//import { commerce } from './lib/commerce';

const App = () => {
 // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState(res);
  const [cart, setCart] = useState({noOfitems:0,totalAmount:0,items:[res.items[0],res.items[1]
   ,res.items[2],res.items[3],res.items[4],res.items[5],res.items[6],res.items[7]]});
  //const [order, setOrder] = useState({});
  //const [errorMessage, setErrorMessage] = useState('');
 // const res = await fetch('/api/data/prices.json');

  const fetchProducts = async () => {
    //const res  = await fetch('./api/items.json');
    //const data = await res.json();
    console.log(res);
    setProducts(res);
  };

//   const fetchCart = async () => {
//     setCart(await commerce.cart.retrieve());
//   };

  const handleAddToCart = async (product, quantity) => {
    //const item = await commerce.cart.add(productId, quantity);
    // var cart1 =  (cart.items.map((item)=>
    // {
    //        // console.log('item',item);
    //         if(item.id === product.id){
    //             item.quantity = item.quantity+quantity;
    //         }
    //         return item;
        
    // }));
    // console.log("cart1", cart1);
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
    //const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(prevState => ({
        noOfitems: prevState.noOfitems+quantity,
        totalAmount: prevState.totalAmount+(cart.items[lineItemId-1].price*quantity),
        //items : [...prevState.items,product]
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
        //items : [...prevState.items,product]
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
    fetchProducts();
    //fetchCart();
    //setCart({noOfitems:0,items:[]});
    // console.log('cart',cart);
    // let id =0;
    // var cart1 = (id)=>(cart.items.filter((item)=>
    // {
    //         console.log('item',item);
    //         if(item.id === id){
    //             item.quantity = item.quantity+1;
    //         }
    //         return item.id=== id;
        
    // }));
    // var cartf = cart1(1);
    // console.log('var', cartf)
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
          
          <Products products={products} onAddToCart={handleAddToCart} />
          <Footer />
          
            
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
        
      </div>
    </Router>
  );
};

export default App;