# 18 Firebase 9

En esta sección vamos a trabajar con Vite + Router 6 + Composition API + Firebase 9.

## Códigos

-   [próximamente]()

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

components/Navbar.jsx

```jsx
import { useContext, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import logo from "../assets/img/logo.svg";

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const menuCollapseRef = useRef(null);

    const handleClickLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error.code);
        }
    };

    const handleMenuCollapse = () => {
        menuCollapseRef.current.classList.toggle("hidden");
    };

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                type="button"
                                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleClickLogout}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                LogOut
                            </button>
                            <button
                                data-collapse-toggle="mobile-menu-4"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mobile-menu-4"
                                aria-expanded="false"
                                onClick={handleMenuCollapse}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    className="hidden w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
                <div
                    className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                    id="mobile-menu-4"
                >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        {user && (
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                        aria-current="page"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        User
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div id="targetEl" className="hidden" ref={menuCollapseRef}>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        Home
                    </li>
                    <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                        User
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
```

## Próximante

-   Firebase Firestore (bases de datos)
-   Firebase Cloud Storage (Almacenamiento de archivos)
