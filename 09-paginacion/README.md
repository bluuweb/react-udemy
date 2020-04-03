# 09 Paginación Firestore
Agregaremos algunas mejoras a nuestro proyecto actual

## Ordenar y limitar datos
[https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0](https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0)

```js
const [ultimo, setUltimo] = React.useState(null)
const [desactivar, setDesactivar] = React.useState(false)
```

```js
const data = await db.collection(props.user.uid)
    .limit(2)
    .orderBy('fecha')
    .get()

setUltimo(data.docs[data.docs.length - 1])

const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
setTareas(arrayData)
```

Agregar boton siguiente
```js
<button 
    className="btn btn-block btn-sm mt-2 btn-info"
    disabled={desactivar}
    onClick={() => siguiente()}
>
    Más tareas...
</button>
```

Acción siguiente
```js
const siguiente = async () => {
    setDesactivar(true)
    try {
        const data = await db.collection(props.user.uid)
            .limit(2)
            .orderBy('fecha')
            .startAfter(ultimo)  
            .get()
        
        setUltimo(data.docs[data.docs.length - 1])

        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        if(arrayData.length !== 0){
            setTareas([...tareas, ...arrayData])
        }

        const query = await db.collection(props.user.uid)
            .limit(2)
            .orderBy('fecha')
            .startAfter(data.docs[data.docs.length - 1])  
            .get()

        if(query.empty){
            console.log('no hay más...')
            setDesactivar(true)
        }else{
            setDesactivar(false)
        }

    } catch (error) {
        console.log(error)
    }
}
```

Modificar 'obtenerDatos' para desactivar botón
```js
try {
    setDesactivar(true)
    const data = await db.collection(props.user.uid)
        .limit(2)
        .orderBy('fecha')
        .get()

    setUltimo(data.docs[data.docs.length - 1])

    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setTareas(arrayData)

    const query = await db.collection(props.user.uid)
        .limit(2)
        .orderBy('fecha')
        .startAfter(data.docs[data.docs.length - 1])  
        .get()
    if(query.empty){
        setDesactivar(true)
    }else{
        setDesactivar(false)
    }
    
} catch (error) {
    console.log(error)
}
```
