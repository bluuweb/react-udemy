# 12 Perfil Usuario
Vamos a crear un perfil de usuario para que pueda cambiar tanto su nombre como su fotografía de perfil.

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

## Guardar usuario en DB

```js
import 'firebase/firestore'
const db = firebase.firestore()
export {auth, firebase, db}
```

```js
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        const objetoUsuario = {
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName
        }
        
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get()
        if(usuarioDB.exists){
            console.log(usuarioDB.data())
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            console.log('no existe')
            await db.collection('usuarios').doc(res.user.email).set(objetoUsuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: objetoUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(objetoUsuario))
        }

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR 
        })
    }
}
```

## Actualizar nombre
```js
export const actualizarDisplayNameAccion = (nuevoNombre) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nuevoNombre
        })
        const usuarioEditado = {
            ...user,
            displayName: nuevoNombre
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}
```

## Componente Perfil
```js
import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {actualizarDisplayNameAccion} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    // console.log(usuario)

    const [displayName, setDisplayName] = React.useState(usuario.displayName)
    const [editarNombre, setEditarNombre] = React.useState(false)

    const botonEditarNombre = () => {
        if(!displayName.trim()){
            console.log('nombre vacío')
            return
        }
        dispatch(actualizarDisplayNameAccion(displayName))
        setEditarNombre(false)
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} width="100" className="img-fluid rounded" />
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button 
                        className='btn btn-dark' 
                        onClick={() => setEditarNombre(true)}
                    >
                        Editar Nombre
                    </button>
                </div>
                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    editarNombre && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        value={displayName}  
                                        onChange={ e => setDisplayName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            onClick={() => botonEditarNombre()}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Perfil
```

## Storage
```js
import 'firebase/storage'
const storage = firebase.storage()
export {auth, firebase, db, storage}
```

```js
export const actualizarFotoAccion = (imagen) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario

    try {

        const refImagen = storage.ref().child(user.email).child('foto perfil')
        await refImagen.put(imagen)
        const urlDescarga = await refImagen.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: urlDescarga
        })

        const usuarioEditado = {
            ...user,
            photoURL: urlDescarga
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))

        
    } catch (error) {
        console.log(error)
    }

}
```

```js
// subir imagen
const [error, setError] = React.useState(false)

const seleccionarArchivo = (e) => {
    console.log(e.target.files[0])   
    const imagen = e.target.files[0]

    if(imagen === undefined){
        console.log('sin imagen')
        return
    }

    if(imagen.type === 'image/jpeg' || imagen.type === 'image/png'){
        dispatch(actualizarFotoAccion(imagen))       
        setError(false) 
        }else{
        console.log('archivo no válido')
        setError(true)
        return
        }
}

<div className="custom-file">
    {
        error &&
        <div className="alert alert-warning">
            Foto en .png o .jpg
        </div>
    }
    <input 
        type="file" 
        className="custom-file-input" 
        id="validatedCustomFile" 
        onChange={e => seleccionarArchivo(e)}
        required 
        disabled={loading}
        style={{display:'none'}}
        />
    <label 
        className={loading ? "btn btn-dark disabled" : "btn btn-dark"}
        htmlFor="validatedCustomFile"
        >
            Editar foto perfil
    </label>
</div>
```