import { ButtonHTMLAttributes } from "react";

interface FormActionBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
}
export const FormActionBtn: React.FC<FormActionBtnProps> = (props) => {
    const { name } = props;
    return (
        <button
            className="px-4 py-2 bg-amber-300 rounded-md mt-6 text-zinc-700 font-bold hover:scale-105 disabled:pointer-events-none disabled:bg-gray-400"
            {...props}>
            {name}
        </button>
    );
};
