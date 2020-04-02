# Paginación Firestore
Agregaremos algunas mejoras a nuestro proyecto actual

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

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

Agregar al login al momento de crear cuentas nuevas:
```js
db.collection(res.user.uid).add({
    name: 'Tarea de ejemplo #1',
    fecha: Date.now()
})
```

Ahora podemos pintar la fecha:
```html
<div className="col-8">
    {item.name} - { moment(item.fecha).format('MMMM Do YYYY, h:mm:ss a') }
</div>
```

Agregar nueva tarea:
```js
db.collection(props.user.uid).add({
    name: tarea,
    fecha: Date.now()
})
```

## Ordenar y limitar datos
[https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0](https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0)

```js
db.collection(props.user.uid)
    .orderBy('fecha', "desc")
    .limit(2)
    .onSnapshot(...)
```