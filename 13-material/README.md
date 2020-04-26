# 13 Material UI
El framework de IU para React más popular del mundo.
[https://material-ui.com/es/](https://material-ui.com/es/)

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

## ¿Qué es Material UI?
Es un Framework para React donde podrás trabajar con los estilos de material Design [https://material.io/design](https://material.io/design)

Es como utilizar Bootstrap pero con Super poderes.

Esta guía tratará de explicar el funcionamiento de diferentes componentes, primero vamos con su instalación.

## Intalación
[https://material-ui.com/es/getting-started/installation/](https://material-ui.com/es/getting-started/installation/)

1. Crear un proyecto de React js.
```
npx create-react-app material-1
```

2. Agregar Framework
```
npm install @material-ui/core
```

3. Material-UI fue diseñado con la fuente Roboto en mente. 
```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

4. Iconos: lo dejaremos pendiente por ahora, ya que existirá un apartado específico para trabajar con iconos.

## Inicio rápido
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hola Mundo!
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Button
[https://material-ui.com/es/components/buttons/](https://material-ui.com/es/components/buttons/)

#### Importar Button
```js
import {Button} from '@material-ui/core'
```

#### color: default, primary, secondary
```jsx
<Button color="primary">
    primary
</Button>
```

#### variant: text, outlined, contained
```jsx
<Button color="secondary" variant='contained'>
    contained
</Button>
```

#### disableElevation
```jsx
<Button 
    color="secondary" 
    variant='contained'
    disableElevation
>
    disableElevation
</Button>
```

#### href
```jsx
<Button
    variant='outlined'
    color='primary'
    href='https://google.com'
>
    Google
</Button>
```

#### fullWidth
```jsx
<Button
    variant='outlined'
    color='primary'
    fullWidth
>
    fullWidth
</Button>
```

#### size: small, medium, large
```jsx
<Button 
    color="secondary" 
    variant='contained'
    size='small'
>
    small
</Button>
```

## Iconos
Existen dos formas de utilizarlos: [https://material-ui.com/es/components/icons/](https://material-ui.com/es/components/icons/)
#### SVG
```
npm install @material-ui/icons
```

#### Google
```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

#### Utilización
```jsx
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

function App() {
  return (
    <div>

      <DeleteIcon color="primary" fontSize="large"/>

      <Icon color="primary">star</Icon>

      <Button 
        variant='contained'
        color='primary'
        startIcon={<DeleteIcon />}
      >
        Eliminar
      </Button>

      <IconButton 
        aria-label="delete" 
        color="primary"
      >
        <DeleteIcon />
      </IconButton>
      
    </div>
  );
}

export default App;
```

## Typography
[https://material-ui.com/es/components/typography/](https://material-ui.com/es/components/typography/)

API: [https://material-ui.com/es/api/typography/](https://material-ui.com/es/api/typography/)

```js
import Typography from '@material-ui/core/Typography';
// or
import { Typography } from '@material-ui/core';
```

#### variant: h1, h2..., subtitle1, body1, caption...
```jsx
<Typography variant="h1">
  variant
</Typography>
```

#### align: center, right, justify
```jsx
<Typography align="center" variant="h6">
  variant
</Typography>
```

#### gutterBottom y paragraph: Agregar bottom margin
```jsx
<Typography gutterBottom variant="body1">
  lorem
</Typography>
```

## makeStyle
[https://material-ui.com/es/styles/basics/](https://material-ui.com/es/styles/basics/)

```jsx
import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

const useStyle = makeStyles({
  boton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  }
})

function App() {

  const classes = useStyle()

  return (
    <div>
      <Button className={classes.boton}>
        Diseñado con useStyle
      </Button>
    </div>
  );
}

export default App;
```

## createMuiTheme
[https://material-ui.com/es/customization/theming/#anidando-el-tema](https://material-ui.com/es/customization/theming/#anidando-el-tema)

```jsx
import {ThemeProvider} from '@material-ui/core/styles'

// Crear archivo con configuración del tema
import theme from './theme'

unction App() {

  return (
    <ThemeProvider theme={theme}>
      ...componentes
    </ThemeProvider>
  );
}

export default App;
```

[https://material-ui.com/es/customization/theming/#api](https://material-ui.com/es/customization/theming/#api)
```jsx
import {createMuiTheme} from '@material-ui/core/styles'
import {purple} from '@material-ui/core/colors'
import {deepOrange} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: purple
    }
})

export default theme;
```

## App bar
[https://material-ui.com/es/components/app-bar/](https://material-ui.com/es/components/app-bar/)

```jsx
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    offset: {
        ...theme.mixins.toolbar, // min-height: 56px;
        marginBottom: '1rem' // margen opcional
    }
}))

const Navbar = () => {

    const classes = useStyle();

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary">
              <Toolbar>
                <Typography variant="h6">
                  bluuweb
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </React.Fragment>
    )
}

export default Navbar
```
## List
[https://material-ui.com/components/lists/#simple-list](https://material-ui.com/components/lists/#simple-list)
```jsx
import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ListaMUI = () => {
    return (
        <div>
            <List component='nav' aria-label='cicle'>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary='Nombre de usuario' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary='Carrito' />
                </ListItem>
            </List>
            <Divider />
        </div>
    )
}

export default ListaMUI
```

## Drawer
Contenedor
```jsx
const [abrir, setAbrir] = React.useState(false)

const desplegar = () => {
    setAbrir(!abrir)
}

return (
    <div className={classes.root}>
        <Navbar desplegar={desplegar} />
        <Hidden xsDown>
            <Cajon 
                variant='permanent' 
                open={true}
            />
        </Hidden>
        <Hidden smUp>
            <Cajon 
                variant='temporary'
                open={abrir}
                onClose={desplegar}
            />
        </Hidden>
        <div className={classes.content}>
            <div className={classes.toolbar}></div>
            contenido
            {/* <button onClick={() => desplegar()}>Abrir</button> */}
        </div>
    </div>
)
```

Navbar
```jsx
const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title:{
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
    },
}))

const Navbar = (props) => {
    const classes = useStyles()
    return (

        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton 
                    color="inherit" 
                    aria-label="menu" 
                    className={classes.menuButton}
                    onClick={() => props.desplegar()}
                >
```

Drawer
```jsx
<Drawer
  className={classes.drawer}  
  classes={{
      paper: classes.drawerPaper,
  }}
  anchor="left"
  variant={props.variant}
  open={props.open}
  onClose={props.onClose ? props.onClose : null}
>
```
