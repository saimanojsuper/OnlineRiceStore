import React from 'react'
import {AppBar,Card,CardActions,Grid,ButtonGroup,Typography,Button, Toolbar, IconButton, CssBaseline, Container, CardMedia, CardContent} from '@material-ui/core'
import {Camera} from '@material-ui/icons';
import useStyles from './styles'

const array = [0,1,2,3,4,5,6,7,8];

const Learning = () => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar position='sticky' color='primary'>
                <Toolbar>
                    <IconButton >
                        <Camera />
                    </IconButton>
                <Typography variant='h6'>
                    Photo Album
                </Typography>
                </Toolbar>
            </AppBar>
            <main>
              <div>
                  <Container maxWidth='sm' className={classes.container}>
                  <Typography variant='h2' align='center' gutterBottom color='textPrimary'>
                      Photo Album
                  </Typography>
                  <Typography variant='h5' align='center' color='textSecondary' paragraph>
                      Need to check the long paragraph to trying to write the text as much as possible
                      to make it paragraph.If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.

                  </Typography>

                  
                  </Container>
                  <Grid container justify='center' align='center'>
                      <Grid item xs={12}>
                  <ButtonGroup className={classes.button} variant="contained" color="primary" aria-label="contained primary button group">
                    <Button>See my photos</Button>
                    
                  </ButtonGroup>
                  <ButtonGroup className={classes.button} color="primary" aria-label="contained primary button group">
                    <Button>Secondary Actions</Button>
                    
                  </ButtonGroup>
                  </Grid>
                  </Grid>
                  <Container maxWidth='md' className={classes.containerCard}>
                      <Grid container >
                          {array.map((id)=>(
                          <Grid item xs={12} sm={6} md={4}className={classes.cardItem}>
                              <Card  className={classes.card}>
                                  <CardMedia 
                                  className={classes.cardMedia}
                                  image='https://source.unsplash.com/random'
                                  title='image title'
                                  />
                                  <CardContent className={classes.cardContent}>
                                    <Typography variant='body1' color='textPrimary' gutterBottom>
                                        Heading
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary' gutterBottom>
                                        This is card description
                                    </Typography>

                                  </CardContent>
                                  <CardActions className={classes.cardActions}>
                                  <Button color='primary'>View</Button>
                                  <Button color='primary'>Edit</Button>
                                      
                                  </CardActions>
                              </Card>

                          </Grid>
                          ))}
                      </Grid>
                  </Container>
              </div>

            </main>
            
        </>
    )
}

export default Learning;
