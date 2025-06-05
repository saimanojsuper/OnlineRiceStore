import { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import "./search.css"

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    position: 'relative',
    width: 400,
    zIndex: 1000,
  },
  dropdown: {
    position: 'absolute',
    top: '100%', // place directly below input
    // left: 0,
    // right: 0,
    width: 200,
    zIndex: 1200,
    backgroundColor: '#fff',
    maxHeight: 200,
    overflowY: 'auto',
    border: '1px solid #ccc',
  },
}));


export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const debouncedValue = useDebounce(searchTerm, 300);
    const [showResults, setShowResults] = useState(false);
    const [cache, setCache] = useState({});
    const classes = useStyles();


    useEffect(async () => {
        console.log('change');

        if(cache[debouncedValue]){
            console.log('returned form cache')
            setResults(cache[debouncedValue]);
            return 
        }

        if (debouncedValue) {
            const products = await fetchProducts(searchTerm);
            setResults(products);
            setCache((prev)=> ({ ...prev, [debouncedValue] : products}));
            console.log("Search results:", products);
        }

        // if (timer === 0) {
        //     console.log('came inside')
        //     const timerId = setTimeout(async () => {
        //         if (searchTerm) {
        //             const products = await fetchProducts(searchTerm);
        //             setResults(products);
        //             console.log("Search results:", products);
        //         } else {
        //             console.log("Please enter a search term.");
        //         }
        //         setTimer(0);
        //     }, 1000);
        //     setTimer(timerId);
        // } else {
        //     console.log('cancelled events');
        //     clearTimeout(timer);
        //     setTimer(0);
        // }
    }, [debouncedValue])


    // const handleSuggestion = async (event) => {
    //     event.preventDefault();
    //     const searchTerm = event.target.value;
    //     if (searchTerm) {
    //         const products = await fetchProducts(searchTerm);
    //         console.log("Search results:", products);
    //     } else {
    //         console.log("Please enter a search term.");
    //     }
    // }

    return (
        <div>
            <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
        onFocus={() => setShowResults(true)} 
        onBlur={() => setShowResults(false)}
      />

      {(showResults && results.length > 0) && (
        <Paper className={classes.dropdown}>
          <List dense>
            {results.map((item, idx) => (
              <ListItem button key={idx} >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
        </div>

        // <div className="search-container">
        //     <input type="text" placeholder="Search products..." onChange={(e) => setSearchTerm(e.target.value)}
        //         onFocus={() => setShowResults(true)} onBlur={() => setShowResults(false)} />
        //     <button type="submit">Search Product</button>
        //     <br />
        //     {(results ) && results.map(name => <li className={`result`} key={name}>{name}</li>)}
        // </div>
    );
}

async function fetchProducts(searchTerm) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.recipes ? data.recipes.map(recipe => recipe.name) : [];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}


const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            console.log('cancelled api calls')
            clearTimeout(timer);
        }
    }, [value, delay])

    return debouncedValue;

}