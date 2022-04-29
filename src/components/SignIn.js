import { useState } from "react";
import { Link } from "react-router-dom";
import { OpenEyeIcon, ClosedEyeIcon, ArrowRightIcon } from "./Icons";
const InputField = ({ type, label, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative mt-8 animate-fade-in">
            <input
                className="border-b-2 p-1 outline-none bg-transparent focus:border-amber-500 placeholder-transparent peer text-zinc-600 dark:text-slate-300"
                type={
                    type !== "password"
                        ? type
                        : showPassword
                        ? "text"
                        : "password"
                }
                placeholder={label}
            />
            <label className="absolute top-1 left-2 text-xs font-semibold text-zinc-800 dark:text-slate-100 -translate-y-6  -translate-x-1 peer-placeholder-shown:translate-y-0 transition-all pointer-events-none peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:translate-x-0">
                {label}{" "}
            </label>
            {type === "password" && (
                <button
                    className="absolute right-1 top-1 text-zinc-600 dark:text-slate-300"
                    onClick={() => setShowPassword((state) => !state)}>
                    {showPassword ? (
                        <ClosedEyeIcon className={"h-5 w-5"} />
                    ) : (
                        <OpenEyeIcon className={"h-5 w-5"} />
                    )}
                </button>
            )}
        </div>
    );
};

export const SignIn = ({}) => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="border-2 border-amber-500 shadow-md p-12 pb-6 rounded-3xl flex flex-col">
            <InputField type="text" label="Email" />
            <InputField type="password" label="Password" />
            <button className="px-4 py-2 bg-amber-300 rounded-md mt-6 text-zinc-700 font-bold hover:scale-105">
                Sign In
            </button>

            <Link
                to="/notes"
                className="ml-auto text-sm mt-10 flex items-center p-1 text-zinc-800 dark:text-slate-300 group hover:text-amber-500 dark:hover:text-amber-300">
                <p>Sign In Demo</p>
                <ArrowRightIcon
                    className={"h-6 w-6 pt-1 group-hover:translate-x-2"}
                />
            </Link>
        </form>
    );
};
