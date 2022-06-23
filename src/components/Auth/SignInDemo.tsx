import { ArrowRightIcon } from "assets/Icons/Icons";
import { logInAction } from "store/authSlice";
import { useAppDispatch } from "store/TypedExports";

export const SignInDemo: React.FC = () => {
    const dispatch = useAppDispatch();
    const demoSignIn = {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
    };
    return (
        <button
            type="button"
            onClick={() => dispatch(logInAction(demoSignIn))}
            className="ml-auto text-sm mt-10 flex items-center p-1 text-zinc-800 dark:text-slate-300 group hover:text-amber-500 dark:hover:text-amber-300">
            <p>Sign In Demo</p>
            <ArrowRightIcon
                className={"h-6 w-6 pt-1 group-hover:translate-x-2"}
            />
        </button>
    );
};
