# 15 Chat Realtime
Aprendamos a utilizar las bases de datos en tiempo real, un servicio que ya viene incorporado en Firestore:
[https://firebase.google.com/docs/firestore/query-data/listen?authuser=0](https://firebase.google.com/docs/firestore/query-data/listen?authuser=0)

```js
db.collection("cities").doc("SF")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });
```

## index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import ChatProvider from './context/ChatProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## App.jsx
```jsx
import React from 'react'
import {ChatContext} from './context/ChatProvider'
import Chat from './components/Chat'
import Navbar from './components/Navbar'

const App = () => {

    const {usuario} = React.useContext(ChatContext)

    return usuario.activo !== null ? (
        <div>
            <Navbar />
            {
                usuario.activo ? (
                    <Chat />
                ) : (
                    <div className='text-center mt-5 lead'>
                        click en acceder para iniciar chat
                    </div>
                )
            }
        </div>
    ) : (<div>Cargando...</div>)
}

export default App
```

## ChatProvider.js

```jsx
import React from 'react'
import {auth, provider, db} from '../firebase'

export const ChatContext = React.createContext()

const ChatProvider = (props) => {
    
    const dataUsuarioInicial = {email: null, uid: null, activo: null}
    const [usuario, setUsuario] = React.useState(dataUsuarioInicial)
    const [mensajes, setMensajes] = React.useState([])

    React.useEffect(() => {
        detectarUsuario()
    }, [])
    
    const detectarUsuario = () => {
        auth.onAuthStateChanged(userChange => {
            if(userChange){
                // console.log(userChange)
                setUsuario({email: userChange.email, uid: userChange.uid, activo: true})
                cargarMensajes()
            }else{
                // console.log(userChange)
                setUsuario({email: null, uid: null, activo: false})
            }
        })
    }

    const iniciarSesion = async() => {
        try {
            const res = await auth.signInWithPopup(provider)
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesion = () => {
        auth.signOut()
    }

    const cargarMensajes = () => {
        db.collection('messages').orderBy('fecha')
        .onSnapshot(query => {
            const arrayMensajes = query.docs.map(item => item.data())
            setMensajes(arrayMensajes)
        })
    } 

    const agregarMensaje = async (uid, texto) => {
        try {
            await db.collection('messages').add({
                uid: uid,
                texto: texto,
                fecha: Date.now()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ChatContext.Provider value={{usuario, iniciarSesion, cerrarSesion, mensajes, agregarMensaje}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatProvider
```

## Navbar.jsx

```jsx
import React from 'react'
import {ChatContext} from '../context/ChatProvider'

const Navbar = () => {

    const {usuario, iniciarSesion, cerrarSesion} = React.useContext(ChatContext)

    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand">Chat</span>
            <div>
                {
                    usuario.activo ? (
                        <button 
                            className="btn btn-outline-success my-2 my-sm-0" 
                            onClick={cerrarSesion}
                        >
                            Salir
                        </button>
                    ) : (
                        <button 
                            className="btn btn-outline-success my-2 my-sm-0" 
                            onClick={iniciarSesion}
                        >
                            Acceder
                        </button>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
```

## Chat.jsx

```jsx
import React from 'react'

import {ChatContext} from '../context/ChatProvider'
import Agregar from './Agregar'

const Chat = () => {

    const {usuario, mensajes} = React.useContext(ChatContext)
    const refZonaChat = React.useRef(null)

    React.useEffect(() => {
        if(refZonaChat.current !== null){
        //   console.log('useefecct', refZonaChat.current)
        //   console.log('scrollTop', refZonaChat.current.scrollTop)
        //   console.log('scrollHeight', refZonaChat.current.scrollHeight)
          refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight;
        }
      }, [mensajes])

    return (
        <div 
            className='mt-3 px-2' 
            ref={refZonaChat} 
            style={{ height: '75vh', overflowY: 'scroll'}}
        >

            {
                mensajes.map((item, index) => (
                    item.uid === usuario.uid ? (
                        <div className="d-flex justify-content-end mb-2" key={index}>
                            <span className="badge badge-pill badge-primary">{item.texto}</span>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-start mb-2" key={index}>
                            <span className="badge badge-pill badge-secondary">{item.texto}</span>
                        </div>
                    )
                ))
            }

            <Agregar />
        
        </div>
    )
}

export default Chat

```

## Agregar.jsx

```jsx
import React from 'react'

import {ChatContext} from '../context/ChatProvider'

const Agregar = () => {

    const {agregarMensaje, usuario} = React.useContext(ChatContext)

    const [mensaje, setMensaje] = React.useState('')

    const formulario = e => {
        e.preventDefault()
        if(!mensaje.trim()){
            console.log('texto vacío')
            return
        }
        agregarMensaje(usuario.uid, mensaje)
        setMensaje('')
    }

    return (
        <form 
            className="input-group fixed-bottom p-3 bg-dark"
            onSubmit={formulario}
        >
            <input 
                type="text" 
                className="form-control"
                onChange={e => setMensaje(e.target.value)}
                value={mensaje}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" type="submit">Enviar</button>
            </div>
        </form>
    )
}

export default Agregar

```
