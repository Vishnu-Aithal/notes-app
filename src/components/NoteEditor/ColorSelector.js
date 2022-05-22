import { useDispatch } from "react-redux";
import { setColor } from "store/editorSlice";

export const ColorSelector = ({ noteDetails }) => {
    const dispatch = useDispatch();
    const colors = {
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
        default: "",
    };

    return (
        <div className="ml-auto">
            {Object.keys(colors).map((color) => (
                <button
                    key={color}
                    onClick={() => dispatch(setColor(color))}
                    className={`ml-auto h-5 w-5 ${
                        colors[color]
                    } rounded-md mx-1 ${
                        noteDetails.color === color
                            ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                            : ""
                    }`}></button>
            ))}
        </div>
    );
};
