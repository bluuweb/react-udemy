# 04.01 Formularios
Documentación oficial: [https://es.reactjs.org/docs/forms.html](https://es.reactjs.org/docs/forms.html)

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

```jsx
import React from 'react';

const Formulario = () => {


    const [fruta, setFruta] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')

    const guardarDatos = (e) => {
        e.preventDefault()
        
        if(!fruta.trim()){
            console.log('esta vacio fruta')
            return
        }
        
        if(!descripcion.trim()){
            console.log('esta vacio descripcion')
            return
        }
        
        console.log('procesando datos...' + fruta + descripcion)

        e.target.reset()
        setFruta('')
        setDescripcion('')
    }

    return (
        <div>
            <h2>Formulario</h2>
            <form onSubmit={ guardarDatos } >
                <input 
                    type="text"
                    placeholder="Ingrese Fruta"
                    className="form-control mb-2"
                    onChange={ (e) => setFruta(e.target.value) }
                />
                <input 
                    type="text"
                    placeholder="Ingrese Descripcion"
                    className="form-control mb-2"
                    onChange={ e => setDescripcion(e.target.value) }
                />
                <button className="btn btn-primary btn-block" type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Formulario

```

## State
Los datos que utilizaremos en nuestro formulario:

```jsx
const [fruta, setFruta] = React.useState('')
const [descripcion, setDescripcion] = React.useState('')
```

## Evento onChange
Estará al pendiente de los cambios que se registren en nuestro input.

```jsx
onChange={ (e) => setFruta(e.target.value) }
```

## onSubmit
Ahora con los datos ya ingresados podemos utilizar el evento onSubmit para procesar el formulario:

```jsx
<form onSubmit={ guardarDatos } >
```

```jsx
const guardarDatos = (e) => {
        e.preventDefault()
        
        if(!fruta.trim()){
            console.log('esta vacio fruta')
            return
        }
        
        if(!descripcion.trim()){
            console.log('esta vacio descripcion')
            return
        }
        
        console.log('procesando datos...' + fruta + descripcion)

        e.target.reset()
        setFruta('')
        setDescripcion('')
    }
```

## Agregar a una Lista
```jsx
const [lista, setLista] = React.useState([])
```

```jsx
const guardarDatos = (e) => {
    e.preventDefault()
    
    if(!fruta.trim()){
        console.log('esta vacio fruta')
        return
    }
    
    if(!descripcion.trim()){
        console.log('esta vacio descripcion')
        return
    }
    
    console.log('procesando datos...' + fruta + descripcion)

    setLista([
        ...lista,
        {nombraFruta: fruta, nombreDescripcion: descripcion}
    ])

    e.target.reset()
    setFruta('')
    setDescripcion('')
}
```

```jsx
<ul>
    {
        lista.map((item, index) => (
            <li key={index}>
                {item.nombraFruta} - {item.nombreDescripcion}
            </li>
        ))
    }
</ul>
```

## React Hook Form
[https://react-hook-form.com/get-started](https://react-hook-form.com/get-started)

#### Instalación
```
npm install react-hook-form
```

#### Utilización
```jsx{2}
import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form'

const HookForm = () => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Fragment>
            <h2>Hooks Forms</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Ingrese nombre de usuario"
                    className="form-control mb-2"
                    name="usuario"
                    ref={register({
                        required: {
                            value: true, 
                            message: 'Nombre es requerido'
                            }, 
                        maxLength: {
                            value: 5, 
                            message: 'No más de 5 carácteres!'
                            },
                        minLength: {
                            value: 2, 
                            message: 'Mínimo 2 carácteres'
                            }
                    })}
                ></input>
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
            
        </Fragment>
    );
}
 
export default HookForm;
```

#### onSubmit
Uno de los conceptos clave en el formulario React Hook, es pasar su componente no controlado en el gancho. Esto hará que su valor esté disponible tanto para la validación como para el envío del formulario. register
```jsx
const onSubmit = (data) => {
    console.log(data)
}

// En el formulario
<form onSubmit={handleSubmit(onSubmit)}>
```

#### Validación
Muy importante pasar el atributo "name" con clave única.

Pasamos ref con "register" y sus respectivas validaciones:
```jsx
<input
    placeholder="Ingrese nombre de usuario"
    className="form-control mb-2"
    name="usuario"
    ref={
        register({
            required: {
                value: true, 
                message: 'Nombre es requerido'
                }, 
            maxLength: {
                value: 5, 
                message: 'No más de 5 carácteres!'
                },
            minLength: {
                value: 2, 
                message: 'Mínimo 2 carácteres'
                }
        })
    }
/>
```

#### Errores
```jsx
{
    errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>
}
```
[https://react-hook-form.com/advanced-usage#ErrorMessage](https://react-hook-form.com/advanced-usage#ErrorMessage)
```jsx
<span className="text-danger text-small d-block mb-2">
    {errors.usuario && errors.usuario.message}
</span>
```

```jsx
<span className="text-danger text-small d-block mb-2">
    {errors?.email?.message}
</span>
```
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)


#### Limpiar campos (Reset)
[https://codesandbox.io/s/jjm3wyqmjy](https://codesandbox.io/s/jjm3wyqmjy)
```jsx
const onSubmit = (data, e) => {
    console.log(data)
    
    // limpiar campos
    e.target.reset();
}

```

#### Ejemplo #1
Puedes ver el siguiente video explicando el ejemplo a continuación...

```jsx

import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormCrud = () => {

    const {register, errors, handleSubmit} = useForm();

    const [entradas, setentradas] = useState([]);

    const procesarFormulario = (data, e) => {
        console.log(data);
        setentradas([
            ...entradas,
            data
        ])
        // limpiar campos
        e.target.reset();
    }

    return (
        <Fragment>
            <h1>FORM</h1>
            <form onSubmit={handleSubmit(procesarFormulario)}>
                <input
                    name="titulo"
                    ref={
                        register({
                            required: {value:true, message: 'Ingrese un nombre'}
                        })
                    }
                    className="form-control my-2"
                    placeholder="Ingrese título"
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors?.titulo?.message}
                </span>
                <input
                    name="descripcion"
                    ref={
                        register({
                            required: {value:true, message: 'Ingrese descripción'}
                        })
                    }
                    className="form-control my-2"
                    placeholder="Ingrese descripción"
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors?.descripcion?.message}
                </span>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    >
                Agregar
                </button>
            </form>
            <ul className="mt-2">
                {
                    entradas.map((item, index) =>
                        <li key={index}>
                            {item.titulo} - {item.descripcion}
                        </li>
                    )
                }
            </ul>
        </Fragment>
    );
}
 
export default FormCrud;

```

#### Ejemplo #2 setError y clearError
[https://github.com/email2vimalraj/Bin2Dec/blob/master/src/index.js](https://github.com/email2vimalraj/Bin2Dec/blob/master/src/index.js)

```jsx
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

const Binary = () => {

    const [Decimal, setDecimal] = useState('');
    const {register, errors, handleSubmit, setError, clearError} = useForm();

    const onSubmit = (data, e) => {
        // console.log(data)

        if (data.binario.match(/^[0-1]+$/g) === null) {
            setError(
                "binario",
                "notMatch",
                "Ingrese 0 o 1"
            );
            return
        }else{
            clearError("binario");
        }

        // Formula:
        // input = 1 => output = 1 * (2^0) = 1
        // input = 10 => output = (0 * (2^0)) + (1 * (2^1)) = 2
        // So we reverse and iterate from the back
        const reversedBinaryText = data.binario
            .split('')
            .map(Number) // Convert to a number from string
            .reverse()

        // Calculate the result by accumulating previous vaue
        const result = reversedBinaryText.reduce(
        (accumulator, currentValue, idx) =>
            accumulator + currentValue * Math.pow(2, idx)
        )
        
        console.log(result)
        setDecimal(result)
    }

    return (
        <Fragment>
            <h1>Calculadora Binaria</h1>
            <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <input 
                        name="binario"
                        className="form-control rounded-0"
                        placeholder="Ingrese 0 y 1"
                        ref={register(
                            {
                                required:{value: true, message: 'Campo obligatorio'}
                            }
                        )}
                    ></input>
                </div>
                <div className="form-group mb-2">
                    <button className="btn btn-primary rounded-0">Transformar</button>
                </div>
                
            </form>
            {errors.binario && 
                <span className="text-danger text-small d-block mb-2">
                    {errors.binario.message}
                </span>
            }
            <p>Resultado: {Decimal}</p>
        </Fragment>
    );
}
 
export default Binary;
```






