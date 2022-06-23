import { ChangeEvent, useState } from "react";
import { signUpAction } from "store/authSlice";
import { useAppDispatch } from "store/TypedExports";
import { FormActionBtn } from "./FormActionBtn";
import { InputField } from "./InputField";
import { SignInDemo } from "./SignInDemo";
export const SignUp: React.FC = () => {
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: "",
    });
    const dispatch = useAppDispatch();

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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        name: e.target.value,
                    }))
                }
            />
            <InputField
                type="email"
                label="Email"
                value={formFields.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        email: e.target.value,
                    }))
                }
            />
            <InputField
                type="password"
                label="Password"
                pattern=".{8,}"
                title="8 characters minimum"
                value={formFields.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormFields((formFields) => ({
                        ...formFields,
                        password: e.target.value,
                    }))
                }
            />
            <FormActionBtn
                name="Sign Up"
                type="submit"
                disabled={Object.values(formFields).some(
                    (value) => value === ""
                )}
            />
            <SignInDemo />
        </form>
    );
};
