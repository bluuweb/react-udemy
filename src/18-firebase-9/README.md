# 18 Firebase 9

En esta sección vamos a trabajar con Vite + Router 6 + Composition API + Firebase 9.

## Videos

-   [Todos los videos aquí](https://www.youtube.com/watch?v=cFVidjxu9v0&list=PLPl81lqbj-4JRDKtkG91u3Y4Dq6b4NrKE)

<iframe width="560" height="315" src="https://www.youtube.com/embed/cFVidjxu9v0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Códigos

-   [main](https://github.com/bluuweb/react-firebase9-router6-vite)
-   [auth](https://github.com/bluuweb/react-firebase9-router6-vite/tree/01-auth)
-   [hook-form](https://github.com/bluuweb/react-firebase9-router6-vite/tree/02-hook-form)
-   [tailwindcss](https://github.com/bluuweb/react-firebase9-router6-vite/tree/03-tailwindcss)
-   [firestore](https://github.com/bluuweb/react-firebase9-router6-vite/tree/04-firestore)

## Vite

-   [Vite web oficial](https://vitejs.dev/): Vite se define como una herramienta de frontend que te ayudará a crear proyectos (sin atarte a ningún framework concreto) y que su desarrollo y construcción final sea lo más sencilla posible.
-   Está desarrollada por Evan You, el creador de Vue.
-   Actualmente, Vite soporta tanto proyectos vanilla (sin utilizar frameworks), como proyectos utilizando Vue, React, Preact o Lit-element (tanto en versión Javascript, como Typescript). [Fuente](https://lenguajejs.com/automatizadores/vite/guia-tutorial-inicial-de-vite/)
-   [Templates](https://github.com/vitejs/awesome-vite#templates)
-   [Comunidad DEV](https://dev.to/t/vite)

```sh
# npm 6.x
npm create vite@latest my-vue-app

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

## React Router v6

-   [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/installation)

```sh
npm i react-router-dom@6
```

main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
```

Crear:

```
components
    - Navbar.jsx
routes
    - Home.jsx
    - Login.jsx
    - NotFound.jsx
```

App.jsx

```jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
```

Navbar.jsx

```jsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/login">Login</NavLink>
        </>
    );
};

export default Navbar;
```

## Contex API

-   [contex API](https://es.reactjs.org/docs/context.html)
-   [Hook useContext](https://es.reactjs.org/docs/hooks-reference.html#usecontext)
-   Context provee una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.
-   Context está diseñado para compartir datos que pueden considerarse “globales” para un árbol de componentes en React, como el usuario autenticado actual, el tema o el idioma preferido.
-   Si trabajas con diferentes vistas estas no estarán anidadas, por ende Context proporciona una solución.

![global props propagation](https://bluuweb.github.io/desarrollo-web-bluuweb/img/context-props.png)

## Redux vs Context

-   Redux proporciona un conjunto de herramientas completo para administrar el estado:
    -   Viene con un depurador que viaja en el tiempo.
    -   Proporciona una API de middleware que le brinda acceso a herramientas como redux-sagas.
    -   Sus enlaces de React evitan muchos renderizados innecesarios.

Como puede ver, el contexto no reemplaza a Redux. El contexto no le permitirá viajar en el tiempo con depuración, middleware configurable.

Context es una forma de obtener datos de un lugar a otro. Si desea una herramienta que lo ayude a administrar su estado, Redux es una excelente opción.

-   Fuentes
    -   [alternativa a redux](https://www.itdo.com/blog/react-context-api-puede-ser-alternativa-a-redux/)
    -   [context-api-vs-redux](https://daveceddia.com/context-api-vs-redux/)
    -   [when context replaces redux](https://frontarm.com/james-k-nelson/when-context-replaces-redux/)

## CreateContext

context/UserProvider.jsx

```jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(false);

    const signIn = () => {
        setUser(true);
    };

    const signOut = () => {
        setUser(false);
    };

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
```

main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider";

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
```

## UseContext

Login.jsx

```jsx
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Login = () => {
    const { user, signIn, signOut } = useContext(UserContext);

    return (
        <div>
            <h1>Login</h1>
            <h2>{user ? "Conectado" : "Desconectado"}</h2>
            {user ? (
                <button className="btn btn-danger" onClick={signOut}>
                    Cerrar sesión
                </button>
            ) : (
                <button className="btn btn-primary" onClick={signIn}>
                    Iniciar sesión
                </button>
            )}
        </div>
    );
};

export default Login;
```

components/Navbar.jsx

```jsx
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, signOut } = useContext(UserContext);

    return (
        <>
            <NavLink to="/">Inicio</NavLink>
            {user ? (
                <button onClick={signOut}>Cerrar Sesión</button>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </>
    );
};

export default Navbar;
```

## Ruta Protegida

-   [Navigate](https://reactrouter.com/docs/en/v6/api#navigate): Cambia la ubicación cuando se rederiza.
-   [useNavigate](https://reactrouter.com/docs/en/v6/api#usenavigate): La navegación programática (navigate programmatically) se refiere a cuando un usuario es redirigido como resultado de una acción que ocurre en una ruta, como una acción de inicio de sesión o registro.

routes/Protected.jsx

```jsx
const Protected = () => {
    return (
        <>
            <h1>Ruta protegida</h1>
        </>
    );
};

export default Protected;
```

components/RequireAuth.jsx

```jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const RequireAuth = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RequireAuth;
```

App.jsx

```jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Protected from "./routes/Protected";
import Login from "./routes/Login";

import RequireAuth from "./components/RequireAuth";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/protected"
                    element={
                        <RequireAuth>
                            <Protected />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
```

Navbar

```jsx
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, signOut } = useContext(UserContext);

    return (
        <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/protected">Protected</NavLink>
            {user ? (
                <button onClick={signOut}>Cerrar Sesión</button>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </>
    );
};

export default Navbar;
```

## Firebase 9

-   [install and guies](https://firebase.google.com/docs/web/setup?authuser=0&hl=es)
-   [consola](https://console.firebase.google.com/)

```sh
npm install firebase
```

firebaseConfig.js

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

## Login && Register

UserProvider.jsx

```jsx
import { createContext, useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                const { uid, email, photoURL, displayName } = user;
                setUser({ uid, email, photoURL, displayName });
            } else {
                setUser(null);
            }
        });
        return () => unsuscribe();
    }, []);

    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logOutUSer = () => signOut(auth);

    return (
        <UserContext.Provider
            value={{ user, setUser, registerUser, loginUser, logOutUSer }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
```

Register.jsx

```jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const [email, setEmail] = useState("bluuweb1@test.com");
    const [password, setPassword] = useState("123123");

    const { registerUser } = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("procesando form..." + email + password);
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
```

Login.jsx

```jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {
    const [email, setEmail] = useState("bluuweb1@test.com");
    const [password, setPassword] = useState("123123");

    const { loginUser } = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("procesando form..." + email + password);
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Acceder</button>
            </form>
        </>
    );
};

export default Login;
```

Navbar.jsx

```jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, logOutUser } = useContext(UserContext);
    const navegate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOutUser();
            navegate("/login");
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <NavLink to="/">Inicio</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </>
            )}
        </div>
    );
};

export default Navbar;
```

App.jsx

```jsx
import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
    const { user } = useContext(UserContext);
    if (user === false) return <p>Loading...</p>;

    return (
        <>
            <div className="container">
                <Navbar />
                <h1>APP</h1>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
```

## useUser Hook

hooks/useUser.js

```js
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const useUser = () => useContext(UserContext);

export default useUser;
```

## React Hook Form

-   [React Hook Form](https://react-hook-form.com/get-started)

```jsx
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
            repassword: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        console.log(email, password);
        try {
            await registerUser(email, password);
            console.log("Usuario creado");
            navegate("/");
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", {
                        message: "Usuario ya registrado",
                    });
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Formato email no válido",
                    });
                    break;
                default:
                    console.log("Ocurrio un error en el server");
            }
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Campo obligatorio",
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: "Formato de email incorrecto",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("password", {
                        setValueAs: (v) => v.trim(),
                        minLength: {
                            value: 6,
                            message: "Mínimo 6 carácteres",
                        },
                        validate: {
                            trim: (v) => {
                                if (!v.trim()) {
                                    return "No seas 🤡, escribe algo";
                                }
                                return true;
                            },
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("repassword", {
                        setValueAs: (v) => v.trim(),
                        validate: {
                            equals: (v) =>
                                v === getValues("password") ||
                                "No coinciden las contraseñas",
                        },
                    })}
                />
                {errors.repassword && <p>{errors.repassword.message}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
```

## Register (refactoring)

-   [error code auth firebase](https://firebase.google.com/docs/auth/admin/errors)

utils/errorsFirebase.js

```js
export const errorsFirebase = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return { code: "email", message: "Usuario ya registrado" };

        case "auth/invalid-email":
            return { code: "email", message: "Formato email no válido" };

        case "auth/invalid-email-verified":
            return { code: "email", message: "El email no está verificado" };

        case "auth/invalid-password":
            return {
                code: "password",
                message: "Contraseña mínimo 6 carácteres",
            };

        case "auth/user-not-found":
            return { code: "email", message: "Usuario no registrado" };

        case "auth/wrong-password":
            return { code: "password", message: "Contraseña incorrecta" };

        default:
            return { code: "email", message: "Error, intentelo más tarde" };
    }
};
```

utils/formValidate.js

```js
export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Campo obligatorio",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
        },
        minLength: {
            value: 6,
            message: "Mínimo 6 carácteres",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas 🤡, escribe algo";
                }
                return true;
            },
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "No coinciden las contraseñas",
            };
        },
    };
};
```

components/FormAlert.jsx

```jsx
const FormAlert = ({ error }) => {
    return <>{error && <p>{error.message}</p>}</>;
};
export default FormAlert;
```

## useRef

-   [useRef](https://es.reactjs.org/docs/hooks-reference.html#useref)
-   Un caso de uso común es para acceder a un hijo imperativamente

```jsx
import { useRef } from "react";

const ExampleRef = () => {
    const inputEl = useRef(null);

    const onButtonClick = () => {
        // `current` apunta al elemento de entrada de texto montado
        inputEl.current.focus();
    };

    return (
        <>
            <input type="text" ref={inputEl} />
            <button onClick={onButtonClick}>Focus the</button>
        </>
    );
};

export default ExampleRef;
```

:::warning Ref entre componentes
A los componentes de función no se les pueden dar refs. Los intentos de acceder a esta referencia fallarán. ¿Querías usar `React.forwardRef()`?
:::

```jsx
import { useRef } from "react";

const InputText = () => {
    return <input type="text" />;
};

const ExampleRef = () => {
    const inputEl = useRef(null);

    const onButtonClick = () => {
        // `current` apunta al elemento de entrada de texto montado
        inputEl.current.focus();
    };

    return (
        <>
            <InputText ref={inputEl} />
            <button onClick={onButtonClick}>Focus the</button>
        </>
    );
};

export default ExampleRef;
```

## forwardRef

-   [forwarRef](https://es.reactjs.org/docs/forwarding-refs.html)
-   El Reenvío de refs es una característica opcional que permite a algunos componentes tomar una ref que reciben, y pasarla (en otras palabras, “reenviarla”) a un hijo.

```js
import { forwardRef, useRef } from "react";

const InputText = forwardRef((props, ref) => {
    return <input type="text" ref={ref} />;
});

const ExampleRef = () => {
    const inputEl = useRef(null);

    const onButtonClick = () => {
        // `current` apunta al elemento de entrada de texto montado
        inputEl.current.focus();
    };

    return (
        <>
            <InputText ref={inputEl} />
            <button onClick={onButtonClick}>Focus the</button>
        </>
    );
};

export default ExampleRef;
```

## Ahora en nuestro form:

-   [reusable form components](https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript)
-   [register hook form](https://react-hook-form.com/api/useform/register)

components/FormInput.jsx

```jsx
import { forwardRef } from "react";
const FormInput = forwardRef(
    ({ children, type, placeholder, onChange, onBlur, name }, ref) => {
        return (
            <>
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                />
                {children}
            </>
        );
    }
);
export default FormInput;
```

routes/Register.jsx

```jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";

const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
            repassword: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingresa un email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormAlert error={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingresa un password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                >
                    <FormAlert error={errors.password} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Repita password"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                >
                    <FormAlert error={errors.repassword} />
                </FormInput>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
```

## Login

```jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";

const Login = () => {
    const navegate = useNavigate();
    const { loginUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingresa un email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormAlert error={errors.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingresa un password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                >
                    <FormAlert error={errors.password} />
                </FormInput>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
```

## TailwindCSS & flowbite

-   [flowbite](https://flowbite.com/)
-   [tailwindcss](https://tailwindcss.com/)
-   [cheatsheet](https://tailwindcomponents.com/cheatsheet/)
-   [getting-started/react](https://flowbite.com/docs/getting-started/react/)

:::danger ¡Me faltó!

-   Corregir errores firebase ☝ (login y register) [ir aquí](#register-refactoring)
-   Optimizar en register: `validate: validateEquals(getValues("password"))`

:::

App.jsx

```jsx
<Route path="/" element={<AccessContainer />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
</Route>
```

components/AccessContainer.jsx

```jsx
<div className="w-96 mx-auto mt-20">
    <Outlet />
</div>
```

components/Title.jsx

```jsx
const Title = ({ title }) => (
    <h1 className="text-3xl my-10 text-center ">{title}</h1>
);
export default Title;
```

components/FormAlert.jsx

```jsx
const FormAlert = ({ error }) => {
    return (
        <>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops! </span>
                    {error.message}
                </p>
            )}
        </>
    );
};
export default FormAlert;
```

components/FormInput.jsx

```jsx
import { forwardRef } from "react";
const FormInput = forwardRef(
    (
        { children, type, placeholder, onChange, onBlur, name, label, error },
        ref
    ) => {
        const classLabel = `block mb-2 text-sm font-medium ${
            error
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
        }`;

        const classInput = error
            ? "border block w-full p-2.5 bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500  dark:bg-red-100 dark:border-red-400"
            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

        return (
            <>
                <div className="mb-6">
                    <label className={classLabel}>{label}</label>
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        autoComplete="off"
                        className={classInput}
                    />
                    {children}
                </div>
            </>
        );
    }
);
export default FormInput;
```

Button.jsx

```jsx
const Button = ({ text }) => (
    <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
        {text}
    </button>
);
export default Button;
```

Register.jsx

```jsx
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
            repassword: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };

    return (
        <>
            <Title title="Register" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    label="Ingrese Email"
                    placeholder="Ingresa un email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                >
                    <FormAlert error={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    label="Ingrese Password"
                    placeholder="Ingresa un password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
                >
                    <FormAlert error={errors.password} />
                </FormInput>

                <FormInput
                    type="password"
                    label="Repita Password"
                    placeholder="Repita password"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    error={errors.repassword}
                >
                    <FormAlert error={errors.repassword} />
                </FormInput>
                <Button text="Register" />
            </form>
        </>
    );
};

export default Register;
```

Login.jsx

```jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const navegate = useNavigate();
    const { loginUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            console.log(error.code);
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };

    return (
        <>
            <Title title="Login" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingresa un email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                    label="Ingrese Email"
                >
                    <FormAlert error={errors.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingresa un password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
                    label="Ingrese Password"
                >
                    <FormAlert error={errors.password} />
                </FormInput>
                <Button text="Login" />
            </form>
        </>
    );
};

export default Login;
```

## Navbar.jsx

```jsx
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const classNavLink =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const classLogout =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);

    const handleClickLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        😍 RedirectAPP
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <>
                            <NavLink to="/" className={classNavLink}>
                                Inicio
                            </NavLink>
                            <button
                                onClick={handleClickLogout}
                                className={classLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={classNavLink}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={classNavLink}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
```

## button loading

UserProvider.jsx

```jsx
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
```

components/ButtonLoading.jsx

```jsx
const ButtonLoading = () => {
    return (
        <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
            <svg
                role="status"
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                />
            </svg>
            Loading...
        </button>
    );
};

export default ButtonLoading;
```

Login.jsx

```jsx
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
    const { loginUser, loading, setLoading } = useContext(UserContext);
    const navegate = useNavigate();
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "bluuweb1@test.com",
            password: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        } finally {
            setLoading(false);
        }
    };

    const buttonSubmit = loading ? (
        <ButtonLoading />
    ) : (
        <Button text="Login" type="submit" />
    );

    return (
        <>
            <Title text="Login" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa tu correo"
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>

                <FormInput
                    label="Ingresa contraseña"
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>

                {buttonSubmit}
            </form>
        </>
    );
};

export default Login;
```

## Layouts

App.jsx

```jsx
const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<RequireAuth />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="*" element={<Layout404 />} />
            </Routes>
        </>
    );
};

export default App;
```

RequiereAuth.jsx

```jsx
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    );
};

export default RequireAuth;
```

Layout404.jsx

```jsx
const Layout404 = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-center">404</h1>
        </div>
    );
};
export default Layout404;
```

LayoutContainerForm.jsx

```jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const LayoutContainerForm = () => {
    const { user } = useContext(UserContext);
    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-sm mx-auto mt-10">
            <Outlet />
        </div>
    );
};

export default LayoutContainerForm;
```

## Firestore

-   [doc](https://firebase.google.com/docs/firestore/quickstart?hl=es#initialize)

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {...};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

### Agregar datos manualmente

```js
urls: [
    id1: {
        name: 'https://bluuweb.org',
        short: 'aDgdGd',
        user: 'pQycjKGmIKQ2wL4P1jvkAPhH4gh2'
    },
    id2: {
        name: 'https://firebase.com',
        short: 'aDgdGd',
        user: 'pQycjKGmIKQ2wL4P1jvkAPhH4gh2'
    }
]
```

### Leer doc

-   [Obtén varios documentos de una colección](https://firebase.google.com/docs/firestore/query-data/get-data?hl=es#get_multiple_documents_from_a_collection)

hooks/useFirestore.js

```js
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const useFirestoreState = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});
    const uid = auth.currentUser.uid;

    const getData = async () => {
        try {
            setLoading((prev) => ({ ...prev, getData: true }));
            const q = query(collection(db, "urls"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            const datos = querySnapshot.docs.map((doc) => doc.data());
            setData(datos);
        } catch (error) {
            console.log(error);
            setError(error.code);
        } finally {
            setLoading((prev) => ({ ...prev, getData: false }));
        }
    };

    return { data, error, loading, getData };
};
```

Home.jsx

```jsx
import Title from "../components/Title";
import { useFirestoreState } from "../hooks/useFirestoreState";
const Home = () => {
    const { data, loading, error, getData } = useFirestoreState();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    const loadingData = loading.getData && <p>Loading data...</p>;
    const errorData = error && <p>{error}</p>;

    return (
        <>
            <Title text="Home" />
            {loadingData}
            {errorData}
            {data?.map(({ nanoid, origin }) => (
                <div key={nanoid}>
                    <p>{origin}</p>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </div>
            ))}
        </>
    );
};

export default Home;
```

## Add Doc

-   [Agrega un documento](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es#add_a_document)
-   [nanoid](https://www.npmjs.com/package/nanoid)

useFirestore.js

```js
const addData = async (url) => {
    try {
        setLoading((prev) => ({ ...prev, addData: true }));
        const newData = { nanoid: nanoid(6), origin: url, uid };
        const docRef = doc(db, "urls", newData.nanoid);
        await setDoc(docRef, newData);
        setData([...data, newData]);
    } catch (error) {
        console.log(error);
        setError(error.code);
    } finally {
        setLoading((prev) => ({ ...prev, addData: false }));
    }
};
```

Home.jsx

```js
const Home = () => {
    const { data, loading, error, addData } = useFirestoreState();
    const [url, setUrl] = useState("");

    ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addData(url);
        setUrl("");
    };

    return (
        <>
            ...

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </form>

            ...

        </>
    );
};

export default Home;
```

## Delete Doc

-   [deleteDoc](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=es#delete_documents)

useFirestore.js

```js
const deleteData = async (nanoid) => {
    try {
        setLoading((prev) => ({ ...prev, [nanoid]: true }));
        const docRef = doc(db, "urls", nanoid);
        await deleteDoc(docRef);
        setData(data.filter((doc) => doc.nanoid !== nanoid));
    } catch (error) {
        console.log(error);
        setError(error.code);
    } finally {
        setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
};
```

Home.jsx

```jsx
const Home = () => {
    const { data, loading, error, addData, deleteData } = useFirestoreState();

    ...

    const handleButtonDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    return (
        <>
            ...

            {data?.map(({ nanoid, origin }) => (
                <div key={nanoid}>
                    <p>{origin}</p>
                    <button>Editar</button>
                    <button onClick={() => handleButtonDelete(nanoid)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </>
    );
};

export default Home;
```

## Update Doc

-   [update-data](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es#update-data)

useFirestore.js

```js
const updateData = async (nanoid, newUrl) => {
    try {
        setLoading((prev) => ({ ...prev, updateData: true }));
        const docRef = doc(db, "urls", nanoid);
        await updateDoc(docRef, { origin: newUrl });
        setData(
            data.map((item) =>
                item.nanoid === nanoid ? { ...item, origin: newUrl } : item
            )
        );
    } catch (error) {
        console.log(error);
        setError(error.code);
    } finally {
        setLoading((prev) => ({ ...prev, updateData: false }));
    }
};
```

Home.jsx

```jsx
<button onClick={() => handleButtonEdit(nanoid, origin)}>Editar</button>
```

Home.jsx

```jsx
const [url, setUrl] = useState("");
const [docEdit, setDocEdit] = useState();

const handleSubmit = async (e) => {
    e.preventDefault();
    if (docEdit) {
        await updateData(docEdit, url);
        setDocEdit();
        setUrl("");
        return;
    }
    await addData(url);
    setUrl("");
};

const handleButtonEdit = (nanoid, origin) => {
    setDocEdit(nanoid);
    setUrl(origin);
};
```

## Otra ruta (Editar opción #02)

Este es un ejemplo si quieren configurar una página nueva para la edición del documento.

### Leer único doc

-   [getDoc](https://firebase.google.com/docs/firestore/query-data/get-data?hl=es#get_a_document)
-   [useparams](https://reactrouter.com/docs/en/v6/api#useparams)

Home.jsx

```js
{
    data?.map(({ nanoid, origin }) => (
        <div key={nanoid}>
            <p>{origin}</p>
            <Link to={`/editar/${nanoid}`}>Editar</Link>
            <button onClick={() => handleButtonDelete(nanoid)}>Eliminar</button>
        </div>
    ));
}
```

App.jsx

```jsx
<Route path="/" element={<RequireAuth />}>
    <Route index element={<Home />} />
    <Route path="editar/:nanoid" element={<Editar />} />
</Route>
```

Editar.jsx

```jsx
import { useEffect, useState } from "react";
import { useFirestoreState } from "../hooks/useFirestoreState";
import { useParams } from "react-router-dom";
import Title from "../components/Title";

const Editar = () => {
    const params = useParams();
    const [url, setUrl] = useState("");
    const { getDataParams, loading, error } = useFirestoreState();

    useEffect(() => {
        console.log("getUrlDB");
        getDataParams(params.nanoid).then((res) => setUrl(res));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const loadingData = loading.getDataParams && <p>Loading data...</p>;
    const errorData = error && <p>{error}</p>;

    return (
        <>
            <Title text="Editar" />
            {errorData}
            {loadingData}
            {url !== "" && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit">Editar</button>
                </form>
            )}
        </>
    );
};

export default Editar;
```

useFirestore.js

```js
const getDataParams = async (nanoid) => {
    try {
        setLoading((prev) => ({ ...prev, getDataParams: true }));
        const docRef = doc(db, "urls", nanoid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().origin;
        } else {
            throw new Error("No se encontró el documento");
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
    } finally {
        setLoading((prev) => ({ ...prev, getDataParams: false }));
    }
};
```

### Update Doc

-   [update-data](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es#update-data)

useFirestore.js

```js
const updateData = async (nanoid, newUrl) => {
    try {
        setLoading((prev) => ({ ...prev, updateData: true }));
        const docRef = doc(db, "urls", nanoid);
        await updateDoc(docRef, { origin: newUrl });
        setData(
            data.map((item) =>
                item.nanoid === nanoid ? { ...item, origin: newUrl } : item
            )
        );
    } catch (error) {
        console.log(error);
        setError(error.code);
    } finally {
        setLoading((prev) => ({ ...prev, updateData: false }));
    }
};
```

Editar.jsx

```js
const handleSubmit = (e) => {
    e.preventDefault();
    updateData(params.nanoid, url).then(() => navigate("/"));
};
```

## Components

### Button + Loading

```jsx
import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, loading, onClick, color = "purple" }) => {
    if (loading) return <ButtonLoading />;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`}
        >
            {text}
        </button>
    );
};

export default Button;
```

```jsx
<Button
    text="Eliminar"
    type="button"
    loading={loading[nanoid]}
    color="red"
    onClick={() => handleButtonDelete(nanoid)}
/>
```

## Error interpolación colores

-   [tailwind-custom-colors-not-complied](https://stackoverflow.com/questions/66330112/tailwind-custom-colors-not-complied)

```jsx
<Button text="Login" color="pink" type="submit" loading={loading} />
```

```jsx
import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, color = "indigo", loading, onClick }) => {
    if (loading) return <ButtonLoading />;

    const classButtonBase =
        "focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ";

    let classButtonColor;
    if (color === "indigo") {
        classButtonColor =
            "bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900";
    }
    if (color === "pink") {
        classButtonColor =
            "bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900";
    }
    if (color === "purple") {
        classButtonColor =
            "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
    }
    if (color === "red") {
        classButtonColor =
            "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    }
    if (color === "blue") {
        classButtonColor =
            "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900";
    }
    if (color === "green") {
        classButtonColor =
            "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900";
    }
    if (color === "yellow") {
        classButtonColor =
            "bg-yellow-400 hover:bg-yellow-700 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900";
    }

    return (
        <button
            onClick={onClick}
            type={type}
            className={classButtonBase + classButtonColor}
        >
            {text}
        </button>
    );
};
export default Button;
```

## Hook Form

```jsx
import { erroresFirebase } from "../utils/erroresFirebase";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Title from "../components/Title";

const Home = () => {
    const { loading, data, error, getData, addData, deleteData, updateData } =
        useFirestore();

    const [newOriginID, setNewOriginID] = useState();
    const { required, patternUrl } = formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
        setValue,
    } = useForm();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    if (loading.getData) return <p>Loading data getData...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginID) {
                await updateData(newOriginID, url);
            } else {
                await addData(url);
            }
            setNewOriginID("");
            resetField("url");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setValue("url", item.origin);
        setNewOriginID(item.nanoid);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa URL"
                    placeholder="https://bluuweb.org/me-gusta-este-video"
                    {...register("url", {
                        required,
                        pattern: patternUrl,
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>
            </form>
        </>
    );
};

export default Home;
```

## Separar botones

-   [space](https://tailwindcss.com/docs/space)

```jsx
<div className="flex space-x-3">
    <Button
        type="button"
        text="Delete"
        color="red"
        loading={loading[item.nanoid]}
        onClick={() => handleClickDelete(item.nanoid)}
    />
    <Button
        type="button"
        text="Edit"
        color="yellow"
        onClick={() => handleClickEdit(item)}
    />
</div>
```

## Card

```jsx
{
    data.map((item) => (
        <article
            key={item.nanoid}
            className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-3"
        >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {window.location.href + item.nanoid}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.origin}
            </p>
            <div className="flex space-x-2">
                <Button
                    type="button"
                    text="Delete"
                    color="red"
                    loading={loading[item.nanoid]}
                    onClick={() => handleClickDelete(item.nanoid)}
                />
                <Button
                    type="button"
                    text="Edit"
                    color="yellow"
                    onClick={() => handleClickEdit(item)}
                />
            </div>
        </article>
    ));
}
```

## handleClickCopy

```js
const [copy, setCopy] = useState({});

const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy((prev) => ({ ...prev, nanoid }));
};
```

```jsx
<Button
    type="button"
    text={copy?.nanoid === item.nanoid ? "Copied!" : "Copy ShortUrl"}
    color="indigo"
    onClick={() => handleClickCopy(item.nanoid)}
/>
```

## Redirect

-   [get_a_document](https://firebase.google.com/docs/firestore/query-data/get-data?hl=es#get_a_document)

useFirestore.js

```js
const searchData = async (nanoid) => {
    try {
        const docRef = doc(db, "urls", nanoid);
        const docSnap = await getDoc(docRef);
        return docSnap;
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
};
```

LayoutRedirect.jsx

```jsx
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import Title from "../Title";

const LayoutRedirect = () => {
    const [loading, setLoading] = useState(true);
    const { searchData } = useFirestore();
    const params = useParams();

    useEffect(() => {
        searchData(params.nanoid).then((res) => {
            if (res.exists()) {
                location.href = res.data().origin;
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <Title text="Cargando redirección..." />;

    return <Outlet />;
};

export default LayoutRedirect;
```

App.jsx

```jsx
<Route path="/:nanoid" element={<LayoutRedirect />}>
    <Route index element={<NotFound />} />
</Route>
```

## Reglas de seguridad

-   [Reglas de seguridad versión 2](https://firebase.google.com/docs/firestore/security/get-started?hl=es)
-   [Reglas básicas de lectura y escritura](https://firebase.google.com/docs/firestore/security/rules-structure?hl=es#basic_readwrite_rules)
-   [Autenticación](https://firebase.google.com/docs/firestore/security/rules-conditions?hl=es#authentication)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /urls/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.uid;
    }
  }
}
```

## Deploy

```sh
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```
