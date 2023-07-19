import { ChangeEvent, useState } from "react";
import { logInAction } from "store/authSlice";
import { InputField } from "./InputField";
import { useAppDispatch } from "store/TypedExports";
import { FormActionBtn } from "./FormActionBtn";
import { SignInDemo } from "./SignInDemo";

export const SignIn: React.FC = () => {
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });
    const dispatch = useAppDispatch();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(logInAction(formFields));
            }}
            className="border-2 border-amber-500 shadow-md p-12 pb-6 rounded-3xl flex flex-col animate-fade-in">
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
                name="Sign In"
                type="submit"
                disabled={!(formFields.password && formFields.email)}
            />

            <SignInDemo />
        </form>
    );
};
