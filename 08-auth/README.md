# 08 Auth Email & Pass
Vamos a construir una aplicación para registrar nuevos usuarios a través de email y contraseña. Este también es un servicio de Firebase.

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

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
    registrar()
}
// Función externa
const registrar = React.useCallback(async() => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, pass)
        console.log(res.user)
        await db.collection('usuarios').doc(res.user.uid).set({
            fechaCreacion: Date.now(),
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email,
            uid: res.user.uid
        })
        setEmail('')
        setPass('')
        setError(null)
        props.history.push('/admin') 
    } catch (error) {
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
    }
}, [email, pass, props.history])
```

## Firebase Login
```js
if(!esRegistro){
    login()
}

// Función externa
const login = React.useCallback(async() => {
    try {
        await auth.signInWithEmailAndPassword(email, pass)  
        setEmail('')
        setPass('')
        setError(null)
        props.history.push('/admin') 
    } catch (error) {
        if(error.code === 'auth/user-not-found'){
            setError('Usuario o contraseña incorrecta')
        }
        if(error.code === 'auth/wrong-password'){
            setError('Usuario o contraseña incorrecta')
        }
        console.log(error.code)
        console.log(error.message)
    }
}, [email, pass, props.history])
```

## Push rutas
```js
// Importar
import { withRouter } from "react-router-dom";

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
import {Link, NavLink, withRouter} from 'react-router-dom'
import {auth} from '../firebase'

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
await db.collection(res.user.uid).add({name: 'Tarea de ejemplo #1'})
```

Crear un componente nuevo y agregarlo al Admin
```js
return (
    <div className="mt-5">
        <h3 className="text-center">Ruta protegida</h3>
        {
            user && (
                <Firestore user={user} />
            )
        }
    </div>
)
```

Utilizar el ejercicio de CRUD Firestore en el nuevo componente
```js
import React from 'react'
import {firebase} from '../firebase'

const Firestore = () => {

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
  
  
    React.useEffect(() => {
  
      const obtenerDatos = async () => {
  
        try {
  
          const db = firebase.firestore()
          const data = await db.collection('tareas').get()
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData)
          setTareas(arrayData)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
      obtenerDatos()
  
    }, [])
  
    const agregar = async (e) => {
      e.preventDefault()
  
      if(!tarea.trim()){
        console.log('está vacio')
        return
      }
  
      try {
  
        const db = firebase.firestore()
        const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
        }
        const data = await db.collection('tareas').add(nuevaTarea)
  
        setTareas([
          ...tareas,
          {...nuevaTarea, id: data.id}
        ])
  
        setTarea('')
        
      } catch (error) {
        console.log(error)
      }
  
      console.log(tarea)
    }
  
    const eliminar = async (id) => {
      try {
        
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).delete()
  
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setTarea(item.name)
      setId(item.id)
    }
  
    const editar = async (e) => {
      e.preventDefault()
      if(!tarea.trim()){
        console.log('vacio')
        return
      }
      try {
        
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).update({
          name: tarea
        })
        const arrayEditado = tareas.map(item => (
          item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
        ))
        setTareas(arrayEditado)
        setModoEdicion(false)
        setTarea('')
        setId('')
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Lista de tareas</h3>
                    <ul className="list-group">
                        {
                        tareas.map(item => (
                            <li className="list-group-item" key={item.id}>
                            {item.name}
                            <button 
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => eliminar(item.id)}
                            >
                                Eliminar
                            </button>
                            <button 
                                className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                Editar
                            </button>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>
                        {
                        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h3>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <input 
                        type="text"
                        placeholder="Ingrese tarea"
                        className="form-control mb-2"
                        onChange={e => setTarea(e.target.value)}
                        value={tarea}
                        />
                        <button 
                        className={
                            modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
                        }
                        type="submit"
                        >
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default Firestore
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

## Fechas
Agregaremos momentjs para formatear fechas de una forma sencilla. 
[https://momentjs.com/](https://momentjs.com/)

```
npm install moment --save
```

```js
import moment from 'moment'
import 'moment/locale/es' // Pasar a español
```

```js
{item.name} - { moment(item.fecha).format('MMMM Do YYYY, h:mm:ss a') }
```

## Recuperar contraseña
[https://firebase.google.com/docs/auth/web/manage-users?authuser=0#send_a_password_reset_email](https://firebase.google.com/docs/auth/web/manage-users?authuser=0#send_a_password_reset_email)
Agregar botón en login:
```js
{
    !esRegistro ? (
        <button 
            className="btn btn-sm btn-info btn-danger"
            type="button"
            onClick={() => props.history.push('/reset')}
        >
            Perdí mi contraseña
        </button>

    ): null
}
```

Componente Reset
```js
import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const ResetPass = (props) => {

    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(null)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        setError(null)

        recuperar()

    }

    const recuperar = React.useCallback(
        async () => {
            try {
                await auth.sendPasswordResetEmail(email)
                props.history.push('/login')
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        },
    [email, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                Recuperar contraseña
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
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Recuperar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ResetPass)
```




