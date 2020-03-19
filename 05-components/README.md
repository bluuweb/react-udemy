# 05 Components
Los componentes permiten separar la interfaz de usuario en piezas independientes, reutilizables y pensar en cada pieza de forma aislada. Ya vimos como crearlos ahora analizaremos los props: [https://es.reactjs.org/docs/components-and-props.html](https://es.reactjs.org/docs/components-and-props.html)

## Props
Conceptualmente, los componentes son como las funciones de JavaScript. Aceptan entradas arbitrarias (llamadas “props”) y devuelven a React elementos que describen lo que debe aparecer en la pantalla.

```js
import React, { Fragment } from 'react';

const Saludo = (props) => {
    return (
        <Fragment>
            <h2>Hola! {props.nombre}</h2>
        </Fragment>
    );
}
 
export default Saludo;
```

En el componente Padre: `<Saludo nombre="Juanito" />`

## Extracción de componentes
No tengas miedo de dividir los componentes. Intenta separar este ejemplo en componentes más pequeños:

```js
import React, { Fragment } from 'react'

const Comment = ({author}) => {
    return (
        <Fragment>
            <h2>Comments</h2>
            <hr className="bg-light" />
            <div className="media">
                <img className="mr-3" src={author.avatarUrl} alt=""/>
                <div className="media-body">
                    <h5 className="mt-0">{author.name}</h5>
                    {author.text}
                </div>
            </div>
        </Fragment>
    );
}
 
export default Comment;
```

#### Avatar
```js
import React from 'react'

const Avatar = ({avatarUrl}) => {
    return (<img className="mr-3" src={avatarUrl} alt=""/>);
}
 
export default Avatar;
```

En el padre: `<Avatar urlImagen={author.avatarUrl} />`