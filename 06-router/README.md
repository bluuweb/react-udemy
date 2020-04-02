# 06 Rutas
Una parte fundamental de nuestras aplicaciones web es la navegación entre diferentes rutas. React no viene con un Router integrado pero podemos añadirlo fácilmente.

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

## Instalación
[https://reacttraining.com/react-router/web/guides/quick-start](https://reacttraining.com/react-router/web/guides/quick-start)

```
npm install react-router-dom
```

## Ejemplo
En la siguiente práctica podrás aprender los conceptos principales:

```js
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import Inicio from './components/Inicio';
import Bla from './components/Bla';
import Parametros from './components/Parametros';
import User from './components/User';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark">Inicio</Link>
          <Link to="/bla" className="btn btn-dark">Bla bla bla</Link>
          <NavLink to="/users" className="btn btn-dark" activeClassName="active">Users</NavLink>
        </div>
        <hr />
        <Switch>
          <Route path="/" exact>
            <Inicio />
          </Route>
          <Route path="/bla">
            <Bla />
          </Route>
          <Route path="/users/:id" exact>
            <User />
          </Route>
          <Route path="/users">
            <Parametros />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

### Componentes principales
[https://reacttraining.com/react-router/web/guides/primary-components](https://reacttraining.com/react-router/web/guides/primary-components)
```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
```

#### BrowserRouter as Router
En el núcleo de cada aplicación React Router debe haber un componente de enrutador. Para usar un enrutador, solo asegúrese de que se represente en la raíz de su jerarquía de elementos. Por lo general, envolverá su ``<App>`` elemento de nivel superior en un enrutador.

#### Matchers
Hay dos componentes de coincidencia de ruta: Switch y Route. Cuando ``<Switch>`` se representa busca a través de sus children ``<Route>`` así encuentra coincidencias con la URL actual y devuelve un componente. Cuando encuentra uno, lo representa ``<Route>`` e ignora todos los demás. Esto significa que usted debe poner ``<Route>`` lo más específico antes de las menos específicos.

#### exact
Generalmente la ruta raíz irá al final, pero si no deseas que devuelva otra coincidencia puedes obligar a que sea exacta con:
```html
<Route path="/" exact>
```

#### Navegación
React Router proporciona un ``<Link>`` componente para crear enlaces en su aplicación. Donde sea que renderice un ``<Link>``, se representará un ancla ``<a>`` en su documento HTML.

El ``<NavLink>`` es un tipo especial ``<Link>`` que puede activar una clase activa cuando esté en la ruta específica.
```html
<NavLink to="/users" className="btn btn-dark" activeClassName="active">Users</NavLink>
```

## Parámetros
En este ejercicio trabajaremos rutas con parámetros, consumiremos la API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

```js
import React from 'react'
import { Link } from "react-router-dom";

const Parametros = () => {

    const [usuarios, setUsuarios] = React.useState([])

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await data.json()
        // console.log(users)
        setUsuarios(users)
    }

    return (
        <div>
            <ul>
                {
                    usuarios.map(item => (
                        <li key={item.id}>
                            <Link to={`/users/${item.id}`}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Parametros
```

## useParams()
```js
import React from 'react'
import {useParams} from 'react-router-dom'

const User = () => {

    // console.log(useParams())
    const {id} = useParams();
    // console.log(id)

    const [usuario, setUsuario] = React.useState({})

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const user = await data.json()
        console.log(user)
        setUsuario(user)
    }

    return (
        <div>
            <h3>{usuario.name}</h3>
            <ul>
                <li>{usuario.username}</li>
                <li>{usuario.email}</li>
                <li>{usuario.phone}</li>
                <li>{usuario.website}</li>
            </ul>
        </div>
    )
}

export default User
```

