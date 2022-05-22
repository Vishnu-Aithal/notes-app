import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAction } from "store/authSlice";
import { InputField } from "./InputField";
export const SignUp = () => {
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(signUpAction(formFields));
            }}
            className="border-2 border-amber-500 shadow-md p-12 pb-6 rounded-3xl flex flex-col animate-fade-in">
            <InputField
                type="text"
                label="Name"
                value={formFields.name}
                onChange={(e) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        name: e.target.value,
                    }))
                }
            />
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
                className="px-4 py-2 bg-amber-300 rounded-md mt-6 text-zinc-700 font-bold hover:scale-105">
                Sign Up
            </button>
        </form>
    );
};