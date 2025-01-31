import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Navbar,
  Products,
  Cart,
  CheckOut,
  ReactHookForm,
  Footer,
} from "./components";
import res from "./api/items.json";
import theme from "./materialui/theme";

const App = () => {
  const [products, setProducts] = useState(res);
  const [cart, setCart] = useState({
    noOfitems: 0,
    totalAmount: 0,
    items: [
      res.items[0],
      res.items[1],
      res.items[2],
      res.items[3],
      res.items[4],
      res.items[5],
      res.items[6],
      res.items[7],
    ],
  });

  const fetchProducts = async () => {
    console.log(res);
    setProducts(res);
  };

  const handleAddToCart = async (product, quantity) => {
    setCart((prevState) => ({
      noOfitems: prevState.noOfitems + quantity,
      totalAmount: prevState.totalAmount + product.price,
      //items : [...prevState.items,product]
      items: cart.items.map((item) => {
        if (item.id === product.id) {
          item.quantity = item.quantity + quantity;
          item.subTotal = item.subTotal + item.price;
        }
        return item;
      }),
    }));
    console.log(cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    //const response = await commerce.cart.update(lineItemId, { quantity });

    setCart((prevState) => ({
      noOfitems: prevState.noOfitems + quantity,
      totalAmount:
        prevState.totalAmount + cart.items[lineItemId - 1].price * quantity,
      //items : [...prevState.items,product]
      items: cart.items.map((item) => {
        if (item.id === lineItemId) {
          item.quantity = item.quantity + quantity;
          item.subTotal = item.subTotal + item.price * quantity;
        }
        return item;
      }),
    }));
  };

  const handleRemoveFromCart = async (lineItemId) => {
    console.log("cart items", cart.items[lineItemId - 1]);
    console.log("cart id", lineItemId);
    setCart((prevState) => ({
      noOfitems: prevState.noOfitems - cart.items[lineItemId - 1].quantity,
      totalAmount: prevState.totalAmount - cart.items[lineItemId - 1].subTotal,
      items: cart.items.map((item) => {
        if (item.id === lineItemId) {
          item.quantity = 0;
          item.subTotal = 0;
        }
        return item;
      }),
    }));
  };

  const handleEmptyCart = async () => {
    setCart((prevState) => ({
      noOfitems: 0,
      totalAmount: 0,
      //items : [...prevState.items,product]
      items: cart.items.map((item) => {
        item.quantity = 0;
        item.subTotal = 0;
        return item;
      }),
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <CssBaseline />
          <Switch>
            <Route exact path="/">
              <Navbar totalItems={cart.noOfitems} />

              <Products products={products} onAddToCart={handleAddToCart} />
              <Footer />
            </Route>
            <Route exact path="/cart">
              <Navbar totalItems={cart.noOfitems} />
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                removeItem={handleRemoveFromCart}
                makeCartEmpty={handleEmptyCart}
              />
            </Route>
            <Route path="/checkout" exact>
              <CheckOut cart={cart} />
            </Route>
            <Route path="/form" exact>
              <ReactHookForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
