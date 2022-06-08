import { useState } from "react";
import { useDispatch } from "react-redux";
import { ArrowRightIcon } from "../../assets/Icons/Icons";
import { logInAction } from "store/authSlice";
import { InputField } from "./InputField";

export const SignIn = () => {
    const demoSignIn = {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
    };
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(logInAction(formFields));
            }}
            className="border-2 border-amber-500 shadow-md p-12 pb-6 rounded-3xl flex flex-col animate-fade-in">
            <InputField
                type="text"
                label="Email"
                value={formFields.email}
                onChange={(e) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        email: e.target.value,
                    }))
                }
            />
            <InputField
                type="password"
                label="Password"
                value={formFields.password}
                onChange={(e) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        password: e.target.value,
                    }))
                }
            />
            <button
                type="submit"
                disabled={!(formFields.password && formFields.email)}
                className="px-4 py-2 bg-amber-300 rounded-md mt-6 text-zinc-700 font-bold hover:scale-105 disabled:pointer-events-none disabled:bg-gray-400">
                Sign In
            </button>

            <button
                type="button"
                onClick={() => dispatch(logInAction(demoSignIn))}
                className="ml-auto text-sm mt-10 flex items-center p-1 text-zinc-800 dark:text-slate-300 group hover:text-amber-500 dark:hover:text-amber-300">
                <p>Sign In Demo</p>
                <ArrowRightIcon
                    className={"h-6 w-6 pt-1 group-hover:translate-x-2"}
                />
            </button>
        </form>
    );
};
