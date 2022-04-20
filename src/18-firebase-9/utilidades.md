Register.jsx

```jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";

// sacar a otro componente ErrorMessage.jsx
const ErrorMessage = ({ msg }) => {
    return (
        <>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {msg}
            </p>
        </>
    );
};

const Register = () => {
    const { registerUser } = useUser();

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        // defaultValues: {
        //     email: "bluuweb1@test.com",
        //     password: "123123",
        //     repassword: "123123",
        // },
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await registerUser(data.email, data.password);
        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/email-already-in-use") {
                return setError("email", {
                    type: "firebase",
                    message: "Correo ya registrado",
                });
            }
            if (error.code === "auth/invalid-email") {
                return setError("email", {
                    type: "firebase",
                    message: "Escriba un correo válido",
                });
            }
        }
    };

    useEffect(() => {
        console.log(errors);
    }, [errors.repassword]);

    return (
        <div className="w-9/12 sm:w-7/12 mx-auto">
            <h1 className="text-center my-10">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Your email
                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Campo obligatorio",
                            },
                        })}
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        autoComplete="off"
                    />
                    {errors.email && (
                        <ErrorMessage msg={errors.email.message} />
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message: "Mínimo 6 carácteres",
                            },
                            required: {
                                value: true,
                                message: "Campo obligatorio",
                            },
                            validate: {
                                trim: (v) => {
                                    if (!v.trim()) {
                                        return "No sea payaso 🤡";
                                    } else true;
                                },
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage msg={errors.password.message} />
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Repit password
                    </label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("repassword", {
                            validate: {
                                trim: (v) => {
                                    if (!v.trim()) {
                                        return "No sea payaso 🤡";
                                    } else true;
                                },
                                iquals: (v) =>
                                    getValues("password") === v ||
                                    "Contraseñas no coinciden",
                            },
                        })}
                    />
                    {errors.repassword && (
                        <ErrorMessage msg={errors.repassword.message} />
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
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
