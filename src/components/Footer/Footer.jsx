import React from 'react';
import {Container,Grid,Box,Button, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <>
        <Box color="text.primary" clone>
        <Grid container className={classes.container} spacing={3} >
         
        <Grid item xs={12} sm={6} className={classes.box1}>

            <Box >
               
                 <Typography variant="h5" color='textPrimary'>About us </Typography>
                 <Typography variant="h7"  color='textSecondary'>
                      A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.
                </Typography>
            </Box>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.box2}>
               <Box >
               <Link to="/"  style={{ textDecoration: 'none' }} color='inherit' >
                 <Typography variant="h5" gutterBottom color='textPrimary'>Help</Typography>
               </Link>
               </Box>
               <Box>
               <Link to="/" style={{ textDecoration: 'none' }}>
                 <Typography variant="h7"  color='textSecondary'>Contact </Typography>
               </Link>
               </Box>
               <Box >
               <Link to="/" style={{ textDecoration: 'none' }} >
                 <Typography variant="h7" color='textSecondary'>Privacy </Typography>
               </Link>
               </Box>
               <Box >
               <Link to="/" style={{ textDecoration: 'none' }} >
                 <Typography variant="h7" color='textSecondary'>Support </Typography>
               </Link>
               </Box>
            </Grid>
            <Grid item xs={6} sm={3} className={classes.box3}>
            <Box >
               <Link to="/"  style={{ textDecoration: 'none' }} color='inherit' >
                 <Typography variant="h5" gutterBottom color='textPrimary'>Help</Typography>
               </Link>
               </Box>
               <Box>
               <Link to="/" style={{ textDecoration: 'none' }}>
                 <Typography variant="h7"  color='textSecondary'>Contact </Typography>
               </Link>
               </Box>
               <Box >
               <Link to="/" style={{ textDecoration: 'none' }} >
                 <Typography variant="h7" color='textSecondary'>Privacy </Typography>
               </Link>
               </Box>
               <Box >
               <Link to="/" style={{ textDecoration: 'none' }} >
                 <Typography variant="h7" color='textSecondary'>Support </Typography>
               </Link>
               </Box>
            </Grid>
           
        </Grid>
        </Box>
        </>
    )
}

export default Footer
