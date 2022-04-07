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

## Próximante

-   Firestore
-   ¿Qué UI Utilizar?
