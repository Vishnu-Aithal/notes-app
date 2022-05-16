import { useState } from "react";
import { OpenEyeIcon, ClosedEyeIcon } from "./Icons";

export const InputField = ({ type, label, name, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative mt-8 after:w-full after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:scale-x-0 focus-within:after:scale-x-100 after:transition-transform">
            <input
                value={value}
                onChange={onChange}
                className="border-b p-1 outline-none bg-transparent placeholder-transparent peer text-zinc-600 dark:text-slate-300"
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
