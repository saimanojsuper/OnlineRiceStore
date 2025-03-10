import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products, onAddToCart, setLoading }) => {

  const classes = useStyles();

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
    }
  }, [products, setLoading]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid
        container
        justify="center"
        spacing={4}
        className={classes.container}
      >
        {products["items"].map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
        {console.log(products["items"])}
      </Grid>
    </main>
  );
};

export default Products;
