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
```js
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
```html
<Button color="primary">
    primary
</Button>
```

#### variant: text, outlined, contained
```html
<Button color="secondary" variant='contained'>
    contained
</Button>
```

#### disableElevation
```html
<Button 
    color="secondary" 
    variant='contained'
    disableElevation
>
    disableElevation
</Button>
```

#### href
```html
<Button
    variant='outlined'
    color='primary'
    href='https://google.com'
>
    Google
</Button>
```

#### fullWidth
```html
<Button
    variant='outlined'
    color='primary'
    fullWidth
>
    fullWidth
</Button>
```

#### size: small, medium, large
```html
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
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

#### Utilización
```js
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
        variant='contained'
      >
        <DeleteIcon />
      </IconButton>
      
    </div>
  );
}

export default App;
```

