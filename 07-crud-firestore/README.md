# 07 CRUD Firestore
Si no conoces Firestore no te preocupes, aquí viene un ejemplo para practicar. Firestore es un servicio de Firebase (creado por Google) para almacenar collection (base de datos no relacionales) y utilizarlas de forma gratuita.

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

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

```jsx
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

export {firebase};
```

## Bootstrap
Podemos seguir utilizando Bootstrap de una manera sencilla utilizando su CDN:
```jsx
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```

## Database
En la consola de firebase configuraremos una nueva colección:

```
tareas => id-Aleatoreo => {name: 'tarea 1' fecha: '30 marzo'}
```

## LEER documentos
[https://firebase.google.com/docs/firestore/quickstart?authuser=0#read_data](https://firebase.google.com/docs/firestore/quickstart?authuser=0#read_data)
```jsx
import {firebase} from './firebase'
```
```jsx
React.useEffect(() => {

    const obtenerDatos = async () => {
        const db = firebase.firestore()
        try {
            const data = await db.collection('tareas').get()
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            console.log(arrayData)      
        } catch (error) {
            console.log(error)
        }
    }
    obtenerDatos()

}, [])
```

Ahora con State
```jsx
const [tareas, setTareas] = React.useState([])

React.useEffect(() => {

    const obtenerDatos = async () => {
        const db = firebase.firestore()
        try {
            const data = await db.collection('tareas').get()
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            console.log(arrayData) 
            setTareas(arrayData)     
        } catch (error) {
            console.log(error)
        }
    }
    obtenerDatos()

}, [])
```

```jsx
<div className="container mb-2">
    <div className="row">
        <div className="col-md-6">
            <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {
                tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.name}</span>
                    <button 
                        className="btn btn-danger btn-sm float-right"
                    >
                        Eliminar
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
        <div className="col-md-6">
            formulario
        </div>
    </div>
</div>
```

## AGREGAR documentos
[https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0](https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0)
```jsx
const [tarea, setTarea] = React.useState('')

const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
        console.log('sin texto')
        return
    }
    console.log(tarea)
}
```

```jsx
<h3>Formulario</h3>
<form onSubmit={agregar}>
    <input 
        type="text" 
        className="form-control mb-2"
        placeholder='Ingrese Tarea'
        value={tarea}
        onChange={e => setTarea(e.target.value)}
    />
    <button 
        type='submit'
        className="btn btn-dark btn-block btn-sm"
    >
        Agregar
    </button>
</form>
```

```jsx
try {
    const db = firebase.firestore()
    const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
    }
    const data = await db.collection('tareas').add({
        name: tarea,
        fecha: Date.now()
    })
    setTareas([
        ...tareas,
        {id: data.id, ...nuevaTarea }
    ])
    setTarea('')
} catch (error) {
    console.log(error)
}
```

## ELIMINAR documentos
[https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=0](https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=0)
```jsx
<button 
    className="btn btn-danger btn-sm float-right"
    onClick={() => eliminar(item.id)}
>
    Eliminar
</button>
```

```jsx
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
```

## EDITAR documentos
[https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update-data](https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update-data)
```jsx
const [modoEdicion, setModoEdicion] = React.useState(false)
```

```jsx
<div className="col-md-6">
    <h3>
    {
        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
    }
    </h3>
    <form onSubmit={agregar}>
    <input 
        type="text" 
        className="form-control mb-2"
        placeholder='Ingrese Tarea'
        value={tarea}
        onChange={e => setTarea(e.target.value)}
    />
    <button 
        type='submit'
        className={
        modoEdicion ? 'btn btn-warning btn-block btn-sm' : 
        'btn btn-dark btn-block btn-sm'
        }
    >
        {
        modoEdicion ? 'Editar' : 'Agregar'
        }
    </button>
    </form>
</div>
```

```jsx
<button 
    className="btn btn-warning btn-sm float-right mr-2"
    onClick={() => activarEdicion(item)}
>
    Editar
</button>
```


```jsx
const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
}
```

```jsx
<form onSubmit={modoEdicion ? editar : agregar}>
```

```jsx
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
      setId('')
      setTarea('')
    } catch (error) {
      console.log(error)
    }
}
```


