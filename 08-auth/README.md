# Auth Email & Pass
Vamos a construir una aplicación para registrar nuevos usuarios a través de email y contraseña. Este también es un servicio de Firebase.

## Rutas
```html
<div className="container mt-5">
    <Router>
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
        </Switch>
    </Router>
</div>
```

```js
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import Dashboard from './components/Dashboard.jsx'
```

## Login
```js
import React from 'react'
import { useForm } from 'react-hook-form'
import firebase from '../firebase'
import { withRouter } from "react-router";

const Login = (props) => {


    const {register, errors, handleSubmit} = useForm();
    const [login, setLogin] = React.useState(true)

    const onSubmit = async (data) => {
        if(login){
            console.log('Entro al login')
            try {
                await firebase.login(data.email, data.password)
                props.history.replace("/dashboard")
            } catch (error) {
                alert(error.message)
            }
        }else{
            console.log('Entro al registro')
            try {
                await firebase.register(data.displayName, data.email, data.password)
                await firebase.addQuote('quote1')
                props.history.replace("/dashboard")
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <div>
            <h2>
                {login ? 'Login de acceso' : 'Registro de nuevo usuario'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    !login && <input type="text" className="form-control my-2" placeholder="Ingrese alias" name="displayName" ref={register()}/>
                }
                
                <input type="email" className="form-control my-2" placeholder="Ingrese email" name="email" ref={register({required:{value:true, message:'Email obligatorio'}})}/>
                {
                    errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>
                }
                <input 
                    type="password" 
                    className="form-control my-2" 
                    placeholder="Ingrese contraseña" 
                    name="password" 
                    ref={register({
                        required:{value:true, message:'Contraseña obligatorio'},
                        minLength:{value:6, message:'Mínimo 6 carácteres'}
                    })}/>
                {
                    errors.password && <span className="text-danger text-small d-block mb-2">{errors.password.message}</span>
                }
                <button className="btn btn-success btn-block" type="submit">Acceder</button>
                <button className="btn btn-dark btn-block" type="button" onClick={() => setLogin(!login)}>
                    {
                        login ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'
                    }
                </button>
            </form>

        </div>
    )
}

export default withRouter(Login)

```
