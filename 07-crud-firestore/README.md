# 07 CRUD Firestore
Si no conoces Firestore no te preocupes, aquí viene un ejemplo para practicar. Firestore es un servicio de Firebase (creado por Google) para almacenar collection (base de datos no relacionales) y utilizarlas de forma gratuita.

## Crear Proyecto
Dirigete a [https://firebase.google.com/](https://firebase.google.com/) accede con alguna cuenta de Gmail y listo!

1. Pinchamos en añadir proyecto
2. Nos vamos a database
3. Comenzamos en modo de prueba
4. Listo

## Configurar
En este ejemplo utilizaremos un proyecto limpio de React, pero es importante instalar Firebase con:

```
npm i firebase
```

Luego crear un archivo en la carpeta `src` llamado `fireabase.js`

```js
import firebase from 'firebase/app'
import 'firebase/firestore'

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

const db = firebase.firestore()

export default db;
```

## Componente
Puedes crear un componente nuevo o bien trabajar en el `app.js`

## Leer
[https://firebase.google.com/docs/firestore/query-data/listen?authuser=0](https://firebase.google.com/docs/firestore/query-data/listen?authuser=0)
```js
import db from '../firebase'
```
```js
const [tareas, setTareas] = React.useState([])

React.useEffect(() => {

    const obtenerDatos = async () => {
    db.collection('tasks').onSnapshot(data => {
        // console.log(data)
        setTareas(data.docs.map(item => ({id: item.id, ...item.data()})))
    })
    }
    obtenerDatos()

}, [])
```
```html
<div className="row mt-5">
    <div className="col-6">
        <h3>Lista de Tareas</h3>
        {
            tareas.map(item => (
                <div className="alert alert-primary" key={item.id}>
                    <div className="row">
                        <div className="col-8">
                            {item.name}
                        </div>
                        <div className="col-2">
                            <button className="btn btn-sm btn-danger">Eliminar</button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-sm btn-warning">Editar</button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
    <div className="col-6">
        <h3>Formulario</h3>
    </div>
</div>
```

## Eliminar
[https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=0](https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=0)
```js
const eliminarTarea = id => {
    db.collection('tasks').doc(id).delete()
}
```

```js
<button 
    className="btn btn-sm btn-danger" 
    onClick={() => eliminarTarea(item.id)}>
    Eliminar
</button>
```

## Agregar
[https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#add_a_document](https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#add_a_document)
```js
const [tarea, setTarea] = React.useState([])

const agregarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
        console.log('campo vacío')
        e.target.reset()
        return 
    }
    db.collection('tasks').add({name: tarea})
    e.target.reset()
}
```

```js
<h3>Formulario</h3>
<form onSubmit={agregarTarea}>
    <input 
        type="text"
        placeholder='Agregue Tarea'
        className="form-control mb-2"
        onChange={e => setTarea(e.target.value)}
    />
    <button className="btn btn-dark btn-block" type="submit">Agregar</button>
</form>
```

## Editar
[https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update_fields_in_nested_objects](https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update_fields_in_nested_objects)
```js
const [modoEdicion, setModoEdicion] = React.useState(false)
const [id, setId] = React.useState('')

const formularioEdicion = item => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
}

const editarTarea = e => {
    e.preventDefault()
    // console.log(id)
    if(!tarea.trim()){
        console.log('campo vacío')
        e.target.reset()
        return 
    }
    db.collection('tasks').doc(id).set({name: tarea})
    e.target.reset()
    setModoEdicion(false)
    setId('')
}

<button 
    className="btn btn-sm btn-warning" 
    onClick={() => formularioEdicion(item)}>
    Editar
</button>

<div className="col-6">
    <h3>Formulario {modoEdicion ? 'Editar' : 'Agregar'}</h3>
    <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
        <input 
            type="text"
            placeholder={modoEdicion ? tarea : 'Agregue Tarea'}
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
        />
        {
            modoEdicion ? (
                <button className="btn btn-warning btn-block">Editar</button>
            ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            )
        }
    </form>
</div>
```
