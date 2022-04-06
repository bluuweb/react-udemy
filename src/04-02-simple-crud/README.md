# 04.02 Simple CRUD

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

## Estructura
```jsx
<div className="container mt-5">
  <h1 className="text-center">CRUD APP</h1>
  <hr/>
  <div className="row">

    <div className="col-8">
      <h4 className="text-center">Lista de Tareas</h4>
      <ul className="list-group">
        <li className="list-group-item" key={item.id}>
          <span className="lead">Tarea #1</span>
          <button 
            className="btn btn-sm btn-danger float-right mx-2"
          >Eliminar</button>
          <button 
            className="btn btn-sm btn-warning float-right"
          >Editar</button>
        </li>
      </ul>
    </div>

    <div className="col-4">
      <h4 className="text-center">
        Agregar Tarea
      </h4>
      <form>
        <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese Tarea"
        />
        <button className="btn btn-dark btn-block" type="submit">Agregar</button>
      </form>
    </div>

  </div>
</div>
```

## Estado Tarea
```jsx
const [tarea, setTarea] = React.useState('')
```
```jsx{5-6}
<input 
  type="text" 
  className="form-control mb-2"
  placeholder="Ingrese Tarea"
  onChange={e => setTarea(e.target.value)}
  value={tarea}
/>
```

## Agregar Tarea
Instalar [https://www.npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)

```
npm i shortid
```

```jsx
<form onSubmit={agregarTarea}>
```
```jsx
const [tarea, setTarea] = React.useState('')
const [tareas, setTareas] = React.useState([])

const agregarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Campo vacio')
    return
  }
  setTareas([
    ...tareas,
    {tarea, id: shortid.generate()}
  ])
  setTarea('')
}
```

## Listar Tareas
```js
{
  tareas.map(item => (
    <li className="list-group-item" key={item.id}>
      <span className="lead">{item.tarea}</span>
      <button 
        className="btn btn-sm btn-danger float-right mx-2"
        onClick={() => eliminarTarea(item.id)}
      >Eliminar</button>
      <button 
        className="btn btn-sm btn-warning float-right"
        onClick={() => editar(item)}
      >Editar</button>
    </li>
  ))
}
```

## Eliminar Tarea
```jsx
// onClick={() => eliminarTarea(item.id)}
const eliminarTarea = id => {
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)
}
```

## Editar Tarea
```jsx
const [modoEdicion, setModoEdicion] = React.useState(false)
const [id, setId] = React.useState('')

// onClick={() => editar(item)}
const editar = item => {
  setModoEdicion(true)
  setTarea(item.tarea)
  setId(item.id)
}

const editarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Campo vacio')
    return
  }

  const arrayEditado = tareas.map(item => item.id === id ? {id, tarea} : item)
  setTareas(arrayEditado)
  setModoEdicion(false)
  setTarea('')
  setId('')
}
```

```jsx
<div className="col-4">
  <h4 className="text-center">
    {
      modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
    }
  </h4>
  <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
    <input 
      type="text" 
      className="form-control mb-2"
      placeholder="Ingrese Tarea"
      onChange={e => setTarea(e.target.value)}
      value={tarea}
    />
    {
      modoEdicion ? (
        <button className="btn btn-warning btn-block" type="submit">Editar</button>
      ) : (
        <button className="btn btn-dark btn-block" type="submit">Agregar</button>
      )
    }
  </form>
</div>
```

## Sin Tareas
```jsx
<ul className="list-group">
  {
    tareas.length === 0 ? (
      <li className="list-group-item">Sin Tareas</li>
    ) : (
      tareas.map(item => (
        <li className="list-group-item" key={item.id}>
          <span className="lead">{item.tarea}</span>
          <button 
            className="btn btn-sm btn-danger float-right mx-2"
            onClick={() => eliminarTarea(item.id)}
          >Eliminar</button>
          <button 
            className="btn btn-sm btn-warning float-right"
            onClick={() => editar(item)}
          >Editar</button>
        </li>
      ))
    )
  }
</ul>
```

## Campos vacíos
```jsx
const [error, setError] = React.useState(null)

// en agregarTarea y editarTarea
if(!tarea.trim()){
  console.log('Campo vacio')
  setError('El campo no puede estar Vacío')
  return
}

setError(null)
```

```jsx
<form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
  {
    error ? <span className="text-danger">{error}</span> : null
  }
  ...
</form>
```

## Todo junto

```jsx
import React from 'react';
import shortid from 'shortid' //https://www.npmjs.com/package/shortid

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar Vacío')
      return
    }
    setTareas([
      ...tareas,
      {tarea, id: shortid.generate()}
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar vacío')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id, tarea} : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    abajo el código...
  );
}

export default App;

```

```jsx
<div className="container mt-5">
  <h1 className="text-center">CRUD APP</h1>
  <hr/>
  <div className="row">
    <div className="col-8">
      <h4 className="text-center">Lista de Tareas</h4>
      <ul className="list-group">
        {
          tareas.length === 0 ? (
            <li className="list-group-item">Sin Tareas</li>
          ) : (
            tareas.map(item => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.tarea}</span>
                <button 
                  className="btn btn-sm btn-danger float-right mx-2"
                  onClick={() => eliminarTarea(item.id)}
                >Eliminar</button>
                <button 
                  className="btn btn-sm btn-warning float-right"
                  onClick={() => editar(item)}
                >Editar</button>
              </li>
            ))
          )
        }
      </ul>
    </div>
    <div className="col-4">
      <h4 className="text-center">
        {
          modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
        }
      </h4>
      <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
        {
          error ? <span className="text-danger">{error}</span> : null
        }
        <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese Tarea"
          onChange={e => setTarea(e.target.value)}
          value={tarea}
        />
        {
          modoEdicion ? (
            <button className="btn btn-warning btn-block" type="submit">Editar</button>
          ) : (
            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
          )
        }
      </form>
    </div>
  </div>
</div>
```