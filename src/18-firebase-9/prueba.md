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
