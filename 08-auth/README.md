# 08 Auth Email & Pass
Vamos a construir una aplicación para registrar nuevos usuarios a través de email y contraseña. Este también es un servicio de Firebase.

## Instalaciones

```
npx create-react-app login-udemy-1
```
```
npm i firebase
```
```
npm i react-router-dom
```

## Firebase
```js
import app from 'firebase/app'
import 'firebase/firestore'
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

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db, auth}
```

## Rutas
```js
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <div className="container">
                navbar...
                <Switch>
                    <Route path="/login">
                        Ruta de login
                    </Route>
                    <Route path="/admin">
                        Ruta de administracion
                    </Route>
                    <Route path="/" exact>
                        Ruta de inicio
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
```

## Navbar
```js
import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">React Admin</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/admin"
                    >
                        Admin
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark" 
                        to="/login"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

## Registro estructura
```js
import React from 'react'

const Login = () => {
    return (
        <div className="mt-5">
            <h3 className="text-center">Acceso o Registro de usuarios</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form>
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Ingresar
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                        >
                            ¿No tienes cuenta?
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

```

## Registro useState
```js
import React from 'react'

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim() || !pass.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }
        if(pass.length < 6){
            console.log('6 o más carácteres')
            setError('6 o más carácteres en pass')
            return
        }
        console.log('correcto...')
        setError(null)

    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Registro de usuarios</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Ingresar
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                        >
                            ¿Ya tienes cuenta?
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

```

## Registro y Login
```js
const [esRegistro, setEsRegistro] = React.useState(true)
```
```html
<h3 className="text-center">
    {
        esRegistro ? 'Registro' : 'Login'
    }
</h3>
<hr/>
<div className="row justify-content-center">
    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
        <form onSubmit={procesarDatos}>
            {
                error ? (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                ) : null
            }
            <input 
                type="email" 
                className="form-control mb-2"
                placeholder="Ingrese Email"
                onChange={ e => setEmail(e.target.value) }
                value={email}
            />
            <input 
                type="password" 
                className="form-control mb-2"
                placeholder="Ingrese Contraseña"
                onChange={ e => setPass(e.target.value) }
                value={pass}
            />
            <button 
                className="btn btn-lg btn-dark btn-block"
                type="submit"
            >
                {esRegistro ? 'Registrar' : 'Acceder'}
            </button>
            <button 
                className="btn btn-sm btn-info btn-block"
                type="button"
                onClick={() => setEsRegistro(!esRegistro)}
            >
                {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            </button>
        </form>
    </div>
</div>
```

## Firebase Registrar
[https://firebase.google.com/docs/auth/web/password-auth?hl=es](https://firebase.google.com/docs/auth/web/password-auth?hl=es)

```js
import {db, auth} from '../firebase'

// después de pasar validaciones de datos...
if(esRegistro){
    auth.createUserWithEmailAndPassword(email, pass)
        .then((res) => {
            console.log('exito')
            console.log(res)
            db.collection('usuarios').doc(res.user.uid).set({
                fechaCreacion: Date.now(),
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
        })
        .catch(error => {
            console.log(error)
            // setError(error.message)
            if(error.code === 'auth/email-already-in-use'){
                setError('Usuario ya registrado...')
                return
            }
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
                return
            }
        })
}
```

## Firebase Login
```js
if(!esRegistro){
    auth.signInWithEmailAndPassword(email, pass)
        .then(res => {
            console.log(res)
            setEmail('')
            setPass('')
            setError(null)
        })
        .catch(error => {
            if(error.code === 'auth/user-not-found'){
                setError('Usuario o contraseña incorrecta')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Usuario o contraseña incorrecta')
            }
            console.log(error.code)
            console.log(error.message)
        })
}
```

## Push rutas
```js
// Importar
import { withRouter } from "react-router";

// Envolver
export default withRouter(Login)

// Utilizar props
const Login = (props) => {...}

// Push
props.history.push('/admin')
```

## Ruta protegida
#### Estructura
```js
import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'

const Admin = (props) => {

    return (
        <div className="mt-5">
            <h3 className="text-center">Ruta protegida</h3>
        </div>
    )
}

export default withRouter(Admin)
```
#### useEffect
currentUser: nos trae la información del usuario
[https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
```js
import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'

const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){
            console.log('existe')
            setUser(auth.currentUser)
        }else{
            console.log('no existe')
            props.history.push('/login')
        }
    }, [props.history])


    return (
        <div className="mt-5">
            <h3 className="text-center">Ruta protegida</h3>
            {
                user && (
                    <p>{user.email}</p>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
```

#### App.jsx (detectar usuario)
onAuthStateChanged: va evaluando si existe el usuario, por lo tanto si se cierra sesión se vuelve a ejecutar onAuthStateChanged()
```js
// Recuerde hacer la importación de firebase
import {auth } from './firebase'

const [firebaseUser, setFirebaseUser] = React.useState(false)

React.useEffect(() => {
    auth.onAuthStateChanged(user => {
        console.log(user)
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })
}, [])

return firebaseUser !== false ? (
    <Router>
        <div className="container">
            <Navbar firebaseUser={firebaseUser} />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/" exact>
                    Ruta de inicio
                </Route>
            </Switch>
        </div>
    </Router>
) : (
    <div>Cargando...</div>
)
```

#### Navbar cerrar sesión y ocultar "admin"
```js
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {auth} from '../firebase'
import { withRouter } from "react-router";

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">React Admin</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    {
                        props.firebaseUser !== null ? (
                            <NavLink 
                                className="btn btn-dark mr-2" 
                                to="/admin"
                            >
                                Admin
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                        <button 
                            className="btn btn-dark" 
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                        ): (
                        <NavLink 
                            className="btn btn-dark" 
                            to="/login"
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

## Firestore
Al agregar un usuario configurar nueva collection
```js
db.collection(res.user.uid).add({name: 'Tarea de ejemplo #1'})
```

Crear un componente nuevo y agregarlo al Admin
```js
return (
    <div className="mt-5">
        <h3 className="text-center">Ruta protegida</h3>
        {
            user && (
                <FirestoreCrud user={user} />
            )
        }
    </div>
)
```

Utilizar el ejercicio de CRUD Firestore en el nuevo componente
```js
import React, {useState, useEffect} from 'react'
import {db} from '../firebase'

const FirestoreCrud = (props) => {

    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {

        const obtenerDatos = () => {

            db.collection(props.user.uid).onSnapshot(data => {
                // console.log(data.docs)
                setTareas(data.docs.map(item => ({ id: item.id, ...item.data() })))
            })

        }
        obtenerDatos()

    }, [])

    const eliminarTarea = id => {
        console.log(id)
        db.collection(props.user.uid).doc(id).delete()
    }

    const agregarTarea = e => {
        e.preventDefault()

        if(!tarea.trim()){
            console.log('esta vacio')
            e.target.reset()
            return
        }

        db.collection(props.user.uid).add({name: tarea})
        e.target.reset()

    }

    const formularioEdicion = (item) => {
        setModoEdicion(true)
        setId(item.id)
        setTarea(item.name)
        console.log(item)
    }

    const editarTarea = e => {
        e.preventDefault()
        if(!tarea.trim()){
            console.log('esta vacio')
            e.target.reset()
            return
        }

        db.collection(props.user.uid).doc(id).set({name: tarea})
        e.target.reset()
        setId('')
        setModoEdicion(false)

    }


    return (
        <div className="row mt-5">
            <div className="col-6">
                <h3>Listado de Tareas</h3>
                {
                    tareas.map(item => (
                        <div className="alert alert-primary" key={item.id}>
                            <div className="row">
                                <div className="col-8">
                                    {item.name}
                                </div>
                                <div className="col-2">
                                    <div 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarTarea(item.id)}
                                    >Eliminar
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div 
                                        className="btn btn-warning btn-sm"
                                        onClick={() => formularioEdicion(item)}
                                    >Editar
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="col-6">
                <h3>Formulario {modoEdicion ? 'Editar' : 'Agregar'}</h3>
                <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                    <input 
                        type="text" 
                        className="form-control mb-2"
                        placeholder={modoEdicion ? tarea : 'Agregar Tarea'}
                        onChange={ e => setTarea(e.target.value) }
                    />
                    {
                        modoEdicion ? (
                            <button className="btn btn-warning btn-block">Editar</button>
                        ) : (
                            <button className="btn btn-dark btn-block">Agregar</button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default FirestoreCrud
```

## Deploy Firebase
Antes compilar nuestra aplicación con:
```
npm run build
```

Instalar herramientas de firebase solo una vez por computador:
```
npm install -g firebase-tools
```

Acceder
```
firebase login
```

Iniciar
```
firebase init
```

Subir
```
firebase deploy
```

## Reglas de seguridad básicas
[https://firebase.google.com/docs/rules/basics?authuser=0#all_authenticated_users](https://firebase.google.com/docs/rules/basics?authuser=0#all_authenticated_users)
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```






