# 11 Redux + Auth
::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

## Intalaciones
```
npm i firebase react-router-dom
```
[https://reacttraining.com/react-router/web/example/auth-workflow](https://reacttraining.com/react-router/web/example/auth-workflow)

```js
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export {auth, firebase}
```

## Navbar
```js
import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Poke API</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Pokemon
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/login"
                        exact
                    >
                        Login
                    </NavLink>
                    <button
                        className="btn btn-dark"
                    >
                        cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

## Login
```js
import React from 'react'

const Login = () => {
    return (
        <div className="mt-5 text-center">
            <h3>Ingreso de usuarios</h3>
            <hr/>
            <button className="btn btn-dark">Google</button>
        </div>
    )
}

export default Login
```
## index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import {Provider} from 'react-redux'
import generateStore from './redux/store'

const store = generateStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

## App.jsx
```js
import React from 'react';

import Pokemones from './components/Pokemones';
import Login from './components/Login';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const store = generateStore()

  return (
    <Router>
        <div className="container mt-3">
            <Navbar />
            <Switch>
                <Route component={Pokemones} path="/" exact/>
                <Route component={Login} path="/login" exact/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
```

## Reducer
```js
const dataInicial = {
    loading: false,
    activo: false
}

const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

export default function usuarioReducer (state = dataInicial, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial}
        case USER_EXITO:
            return {...state, loading: false, activo: true, user: action.payload.user}
        case CERRAR_SESION:
            return {...dataInicial}
        default: 
            return {...state}
    }

}

export const accederAccion = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}
```

[https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk](https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk)

```js
const provider = new firebase.auth.GoogleAuthProvider();
const res = await auth.signInWithPopup(provider)
console.log(res)
dispatch({
    type: USER_EXITO,
    payload: {
        user: {
            uid: res.user.uid,
            email: res.user.email
        }
    }
})
localStorage.setItem('usuario', JSON.stringify({
    uid: res.user.uid,
    email: res.user.email
}))
```

```js
export const leerUsuarioAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }
}
```

```js
export default function generateStore(){
    const store = createStore( rootReducer,  composeEnhancers( applyMiddleware(thunk) ))
    leerUsuarioAccion()(store.dispatch)
    return store;
}
```

## Login
```js
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accederAccion} from '../redux/usuarioDucks'

import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const dispatch = useDispatch()
    const loading = useSelector(store => store.usuario.loading)
    const activo = useSelector(store => store.usuario.activo)
    
    React.useEffect(() => {
        console.log(activo)
        if(activo){
            props.history.push('/')
        }
    }, [activo])

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso de usuarios</h3>
            <hr/>
            <button 
                className="btn btn-dark"
                onClick={() => dispatch(accederAccion())}
                disabled={loading}
            >
                Google
            </button>
        </div>
    )
}

export default withRouter(Login)
```

## Cerrar Sesión
```js
export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('usuario')
}

case CERRAR_SESION:
    return {...dataInicial}
```

```js
import {useDispatch} from 'react-redux'
import { cerrarSesionAccion } from '../redux/usuarioDucks'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {

    const dispatch = useDispatch()

    const cerrar = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }
    <button
        className="btn btn-dark"
        onClick={() => cerrar()}
    >
        cerrar Sesión
    </button>
}
export default withRouter(Navbar)
```

## app.jsx
```js
import React from 'react';

import Pokemones from './components/Pokemones';
import Login from './components/Login';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Firebase
import {auth} from './firebase'

function App() {

  // Firebase
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
}, [])


  // LocalStorage
  const RutaProtegida = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        console.log('son iguales')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log('no exite')
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <RutaProtegida component={Pokemones} path="/" exact/>
          {/* <Route component={Pokemones} path="/" exact/> */}
          <Route component={Login} path="/login" exact/>
        </Switch>
      </div>
    </Router>
  ) : (<div>Cargando...</div>)
}

export default App;
```

## Ocultar botones
```js
import {useDispatch, useSelector} from 'react-redux'

const Navbar = (props) => {

    const dispatch = useDispatch()

    const cerrar = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }

    const activo = useSelector(store => store.usuario.activo)

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Poke API</Link>
            <div>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink 
                                    className="btn btn-dark mr-2" 
                                    to="/"
                                    exact
                                >
                                    Pokemon
                                </NavLink>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => cerrar()}
                                >
                                    cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <NavLink 
                                className="btn btn-dark mr-2" 
                                to="/login"
                                exact
                            >
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)

```







