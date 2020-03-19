# 04 Formularios
Documentación oficial: [https://es.reactjs.org/docs/forms.html](https://es.reactjs.org/docs/forms.html)

```js
import React, {Fragment, useState} from 'react';

const Formulario = () => {


    const [datos, setDatos] = useState({
        nombre: '',
        apellido: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.nombre + ' ' + datos.apellido)
    }

    return (
        <Fragment>
            <h1>Formulario</h1>
            <form className="row" onSubmit={enviarDatos}>
                <div className="col-md-3">
                    <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre"></input>
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Apellido" className="form-control" onChange={handleInputChange} name="apellido"></input>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            <ul>
                <li>{datos.nombre}</li>
                <li>{datos.apellido}</li>
            </ul>
        </Fragment>
    );
}
 
export default Formulario;
```

## State
Los datos que utilizaremos en nuestro formulario:

```js
const [datos, setDatos] = useState({
    nombre: '',
    apellido: ''
})
```

## Form
Utilizando clases de Bootstrap para que se vea más bonito, atributos y eventos para que la magia funcione:

```html
<form className="row" onSubmit={enviarDatos}>
    <div className="col-md-3">
        <input 
            type="text" 
            placeholder="Nombre" 
            className="form-control" 
            onChange={handleInputChange} 
            name="nombre" />
    </div>
    <div className="col-md-3">
        <input 
            type="text" 
            placeholder="Apellido" 
            className="form-control" 
            onChange={handleInputChange} 
            name="apellido" />
    </div>
    <button type="submit" className="btn btn-primary">Enviar</button>
</form>
```

## Evento onChange
Estará al pendiente de los cambios que se registren en nuestro input, por lo tanto creamos una función para modificar nuestro state.

```js
const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
}
```

A partir de ECMAScript 2015, la sintaxis del inicializador de objetos también admite nombres de propiedades calculados. Eso le permite poner una expresión entre paréntesis [], que se calculará y usará como el nombre de la propiedad. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)

## onSubmit
Ahora con los datos ya ingresados podemos utilizar el evento onSubmit para procesar el formulario:

```html
<form onSubmit={enviarDatos}>
```

```js
const enviarDatos = (event) => {
    event.preventDefault()
    console.log('enviando datos...' + datos.nombre + ' ' + datos.apellido)
}
```

## React Hook Form
[https://react-hook-form.com/get-started](https://react-hook-form.com/get-started)

#### Instalación
```
npm install react-hook-form
```

#### Utilización
```js{2}
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
```js
const onSubmit = (data) => {
    console.log(data)
}

// En el formulario
<form onSubmit={handleSubmit(onSubmit)}>
```

#### Validación
Muy importante pasar el atributo "name" con clave única.

Pasamos ref con "register" y sus respectivas validaciones:
```js
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
[https://react-hook-form.com/advanced-usage#ErrorMessage](https://react-hook-form.com/advanced-usage#ErrorMessage)
```html
<span className="text-danger text-small d-block mb-2">
    {errors.usuario && errors.usuario.message}
</span>
```

```html
<span className="text-danger text-small d-block mb-2">
    {errors?.email?.message}
</span>
```
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

#### Limpiar campos (Reset)
[https://codesandbox.io/s/jjm3wyqmjy](https://codesandbox.io/s/jjm3wyqmjy)
```js
const onSubmit = (data, e) => {
    console.log(data)
    
    // limpiar campos
    e.target.reset();
}

```

#### Ejemplo #1
Puedes ver el siguiente video explicando el ejemplo a continuación...

```js

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

```js
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






