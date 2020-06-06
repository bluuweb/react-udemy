# 16 Custom Claims
Configuraremos atributos personalizados en las cuentas de usuario (roles). Implementando estrategias de control de acceso.
[https://firebase.google.com/docs/auth/admin/custom-claims?hl=es-419](https://firebase.google.com/docs/auth/admin/custom-claims?hl=es-419)

## Introducción
1. Tendremos que crear un custom claims a una cuenta, por ejemplo admin.
```js
admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
  // The new custom claims will propagate to the user's ID token the
  // next time a new one is issued.
});
```

2. Preguntar por el token (si existe el custom claims admin)
```js
if(context.auth.token.admin !== true){
    return {error: 'solo admin puede modificar'}
}
```

3. Mostrar diferentes vistas según roles.
```js
firebase.auth().currentUser.getIdTokenResult()
  .then((idTokenResult) => {
     // Confirm the user is an Admin.
     if (!!idTokenResult.claims.admin) {
       // Show admin UI.
       showAdminUI();
     } else {
       // Show regular user UI.
       showRegularUI();
     }
  })
  .catch((error) => {
    console.log(error);
  });
```

## Functions
Este es otro servicio de Firebase que nos permite ejecutar código de backend en respuesta a eventos activados por las funciones de Firebase y las solicitudes HTTPS. 

1. Tener instalado firebase CLI
```
npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools
```

2. Login
```
firebase login
```

3. Firebase init
```
firebase init functions
```

4. Agregar módulos en archivo de configuración
```js
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const auth = admin.auth()
```

5. Agregar admin
```js
exports.agregarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => error)
})
```

## Frontend

1. Crear archivo de configuración de Firebase.
2. Crear contextApi
3. Generar Vistas

## UsuarioProvider

```jsx
import React from 'react'
import {auth, firebase, db} from '../firebase'

export const UsuarioContext = React.createContext()

const UsuarioProvider = (props) => {

    const dataUsuarioInicial = {email: null, uid: null, activo: null}
    const [usuario, setUsuario] = React.useState(dataUsuarioInicial)

    React.useEffect(() => {
        detectarUsuario()
    }, [])

    const detectarUsuario = () => {
        auth.onAuthStateChanged(userChange => {
            if(userChange){
                userChange.getIdTokenResult().then(idTokenResult => {
                    console.log(idTokenResult.claims)
                    // console.log(idTokenResult.claims.accounts.admin)
                    if (!!idTokenResult.claims.admin) {
                        console.log('es admin')
                        console.log(idTokenResult.claims.admin)
                        setUsuario({email: userChange.email, uid: userChange.uid, activo: true, rol: 'admin'})
                    } else if(!!idTokenResult.claims.autor){
                        console.log('es autor')
                        setUsuario({email: userChange.email, uid: userChange.uid, activo: true, rol: 'autor'})
                    }else {
                        console.log('es invitado')
                        setUsuario({email: userChange.email, uid: userChange.uid, activo: true, rol: 'invitado'})
                    }
                })
            }else{
                setUsuario({email: null, uid: null, activo: false, rol: null})
            }
        })
    }

    const iniciarSesion = async() => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider)
            
            // crearmos al usuario en db si no existe registro.
            const existe = await db.collection('usuarios').doc(res.user.email).get()
            console.log(existe.exists)
            if(!existe.exists){
                await db.collection('usuarios').doc(res.user.email).set({
                    email: res.user.email,
                    uid: res.user.uid,
                    rol: 'invitado'
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesion = () => {
        auth.signOut()
    }

    return (
        <UsuarioContext.Provider value={{usuario, iniciarSesion, cerrarSesion}}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider
```

## LibrosProvider
```jsx
import React from 'react'
import {db} from '../firebase'

export const LibrosContext = React.createContext()

const LibrosProvider = (props) => {

    const [libros, setLibros] = React.useState([])

    React.useEffect(() => {
        fetchLibros()
    }, [])

    const fetchLibros = async() => {
        try {
            const res = await db.collection('libros').get()
            const arrayLibros = res.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setLibros(arrayLibros)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LibrosContext.Provider value={{libros, fetchLibros}}>
            {props.children}
        </LibrosContext.Provider>
    )
}

export default LibrosProvider
```

## index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import LibrosProvider from './context/LibrosProvider'
import UsuarioProvider from './context/UsuarioProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <LibrosProvider>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </LibrosProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## App.jsx
```jsx
import React from 'react'
import ListaLibros from './components/ListaLibros'
import Navbar from './components/Navbar'

import {UsuarioContext} from './context/UsuarioProvider'
import AdminRoles from './components/AdminRoles'
import AgregarLibro from './components/AgregarLibro'

const App = () => {

    const {usuario} = React.useContext(UsuarioContext)

    return (
        <div>
            <Navbar />
            
            <div className="container mt-3">
                {
                    usuario.rol === 'admin' && <AdminRoles usuario={usuario} />
                }

                {
                    (usuario.rol === 'autor' || usuario.rol === 'admin') && <AgregarLibro />
                }

                <ListaLibros />
            </div>
        </div>
    )
}

export default App
```

## Navbar.jsx
```jsx
import React from 'react'

import {UsuarioContext} from '../context/UsuarioProvider'

const Navbar = () => {

    const {usuario, iniciarSesion, cerrarSesion} = React.useContext(UsuarioContext)

    console.log(usuario)

    return (
        <div className='navbar navbar-dark bg-dark'>
            <div className="container">
                <div>
                    {
                        usuario.email ? (
                            <button className="btn btn-dark" onClick={cerrarSesion}>Cerrar Sesión</button>
                        ) : (
                            <button className="btn btn-dark" onClick={iniciarSesion}>Login</button>
                        )
                    }
                </div>
                <div>
                    <span className='text-light'>
                        {
                            usuario.email ? usuario.email : 'Invitado'
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

## AdminRoles.jsx
```jsx
import React from 'react'

import {functions, db} from '../firebase'

const AdminRoles = (props) => {

    const [email, setEmail] = React.useState('')
    const [usuarios, setUsuarios] = React.useState([])

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        try {
            const res = await db.collection('usuarios').get()
            setUsuarios(res.docs.map(doc => doc.data()))
        } catch (error) {
            console.log(error)
        }
    }

    const administrador = (email) => {
        if(!email.trim()){
            console.log('email vacio')
            return
        }
        const agregarRol = functions.httpsCallable('agregarAdministrador');
        
        agregarRol({email: email})
            .then(res => {
                console.log(res)
                if(res.data.error){
                    return console.log('no está autorizado')
                }
                db.collection('usuarios').doc(email).update({rol: 'admin'}).then(res => {
                    console.log('usuario admin actualizado')
                    fetchData()
                })
            })
            .catch(error => console.log(error))

        setEmail('')
    }

    const eliminarAdministrador = (email) => {
        if(!email.trim()){
            console.log('email vacio')
            return
        }
        const agregarRol = functions.httpsCallable('eliminarAdministrador');
        
        agregarRol({email: email})
            .then(res => {
                console.log(res)
                if(res.data.error){
                    return console.log('no está autorizado')
                }
                db.collection('usuarios').doc(email).update({rol: 'invitado'}).then(res => {
                    console.log('usuario invitado actualizado')
                    fetchData()
                })
            })
            .catch(error => console.log(error))

        setEmail('')
    }

    const agregarAutor = (email) => {
        if(!email.trim()){
            console.log('email vacio')
            return
        }
        const agregarRol = functions.httpsCallable('agregarAutor');
        
        agregarRol({email: email})
            .then(res => {
                console.log(res)
                if(res.data.error){
                    return console.log('no está autorizado')
                }
                db.collection('usuarios').doc(email).update({rol: 'autor'}).then(res => {
                    console.log('usuario autor actualizado')
                    fetchData()
                })
            })
            .catch(error => console.log(error))

        setEmail('')
    }

    const eliminarAutor = (email) => {
        if(!email.trim()){
            console.log('email vacio')
            return
        }
        const agregarRol = functions.httpsCallable('eliminarAutor');
        
        agregarRol({email: email})
            .then(res => {
                console.log(res)
                if(res.data.error){
                    return console.log('no está autorizado')
                }
                db.collection('usuarios').doc(email).update({rol: 'invitado'}).then(res => {
                    console.log('usuario invitado actualizado')
                    fetchData()
                })
            })
            .catch(error => console.log(error))

        setEmail('')
    }

    return (
        <div className='my-5'>
            <h3>Admin Roles</h3>
            <form onSubmit={administrador}>
                <input type="email" placeholder='ingrese email' onChange={e => setEmail(e.target.value)} value={email} className='form-control mb-2' />
                <button type='submit' className='btn btn-dark mb-2'>Agregar Admin</button>
            </form>
            {
                usuarios.map(usuario => (
                    <div key={usuario.uid} className='mb-2'>
                        {usuario.email} - rol: {usuario.rol}
                        {
                            usuario.rol === 'admin' ? (
                                <button className="btn btn-danger btn-sm mx-2" onClick={() => eliminarAdministrador(usuario.email)}>Eliminar Admin</button>
                            ) : (
                                <>
                                    <button className="btn btn-warning btn-sm mx-2" onClick={() => administrador(usuario.email)}>Admin</button>
                                    <button className="btn btn-info btn-sm mr-2" onClick={() => agregarAutor(usuario.email)}>Autor</button>
                                    <button className="btn btn-success btn-sm mr-2" onClick={() => eliminarAutor(usuario.email)}>Lector</button>
                                </>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default AdminRoles

```

## Functions Custom Claims
1. [https://firebase.google.com/docs/functions/config-env](https://firebase.google.com/docs/functions/config-env)
2. [https://medium.com/@jobsamuel/variables-de-entorno-en-firebase-functions-ec9b82e76e16](https://medium.com/@jobsamuel/variables-de-entorno-en-firebase-functions-ec9b82e76e16)
```js
// Agregar admin desde terminal
// firebase functions:config:set accounts.admin="admin@bluuweb.cl"
// firebase functions:config:get -> ver configuración de entorno // https://firebase.google.com/docs/functions/config-env
// firebase functions:config:unset variable -> para eliminar una variable de entorno // https://medium.com/@jobsamuel/variables-de-entorno-en-firebase-functions-ec9b82e76e16

const functions = require('firebase-functions');

const admin = require('firebase-admin')

admin.initializeApp();

const auth = admin.auth()

exports.agregarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => error)
})

exports.eliminarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: false})
        })
        .then(() => {
            return {message: 'se eliminó con éxito el administrador'}
        })
        .catch(error => error)
})

exports.agregarAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => error)
})

exports.eliminarAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: false})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => error)
})
```

## ListaLibros.jsx
```jsx
import React from 'react'

import {LibrosContext} from '../context/LibrosProvider'

import PintarAutor from './PintarAutor'

const ListaLibros = () => {

    const {libros} = React.useContext(LibrosContext)

    return (
        <div className='mb-5'>
            <ul className='list-group'>
                {
                    libros.map(libro => (
                        <li key={libro.id} className='list-group-item'>
                            <span className='lead text-uppercase text-primary'>
                                {libro.titulo}
                            </span>
                            <br/>
                            <span className=''>
                                Pág: {libro.paginas} Autor: 
                                <PintarAutor autor={libro.autor} id={libro.id}/>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListaLibros
```

## PintarAutor.jsx
```jsx
import React from 'react'
import {UsuarioContext} from '../context/UsuarioProvider'
import {LibrosContext} from '../context/LibrosProvider'
import {db} from '../firebase'

const PintarAutor = (props) => {

    const {usuario} = React.useContext(UsuarioContext)
    const {fetchLibros} = React.useContext(LibrosContext)

    const [autor, setAutor] = React.useState('')

    const eliminarLibro = () => {
        db.collection('libros').doc(props.id).delete()
            .then(() => {
                console.log('libro eliminado')
                fetchLibros()
            })
            .catch(error => console.log(error))
    }

    React.useEffect(() => {
        props.autor.get().then(res => {
            // console.log(res)
            setAutor(res.data().email)
        })
    }, [props.autor])

    return (
        <>
            <span> {autor}</span>
            {
                (autor === usuario.email || usuario.rol === 'admin') && (
                    <button className='btn btn-danger float-right' onClick={eliminarLibro}>Eliminar</button>
                )
            }
        </>
    )
}

export default PintarAutor
```

## AgregarLibro.jsx
```jsx
import React from 'react'
import {db} from '../firebase'
import {UsuarioContext} from '../context/UsuarioProvider'
import {LibrosContext} from '../context/LibrosProvider'

const AgregarLibro = () => {

    const {usuario} = React.useContext(UsuarioContext)
    const {fetchLibros} = React.useContext(LibrosContext)

    const [titulo, setTitulo] = React.useState('')
    const [paginas, setPaginas] = React.useState('')

    const agregarLibro = e => {
        e.preventDefault()
        if(!titulo.trim() || !paginas.trim()){
            console.log('campo vacio')
            return
        }

        db.collection('libros').add({
            autor: db.collection('usuarios').doc(usuario.email),
            paginas: paginas,
            titulo: titulo,
            uid: usuario.uid
        })
        .then(res => {
            console.log(res)
            fetchLibros()
        })
        .catch(error => console.log(error))     
        
        setTitulo('')
        setPaginas('')
    }

    return (
        <div className='my-5'>
            <h1>Agregar libros</h1>
            <form onSubmit={agregarLibro}>
                <input 
                    type="text" 
                    placeholder='Ingrese título' 
                    className='form-control mb-2' 
                    onChange={e => setTitulo(e.target.value)}
                    value={titulo}
                />
                <input 
                    type="text" 
                    placeholder='Ingrese páginas' 
                    className='form-control mb-2' 
                    onChange={e => setPaginas(e.target.value)}
                    value={paginas}
                />
                <button
                    className='btn btn-dark'
                    type='submit'
                >
                    Agregar
                </button>
            </form>
        </div>
    )
}

export default AgregarLibro

```