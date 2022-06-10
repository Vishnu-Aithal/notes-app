import { EditorState, setColor } from "store/editorSlice";
import { useAppDispatch } from "store/TypedExports";
import { NoteColors } from "types/Note";

type ColorMap<T> = {
    [P in T as string]: string;
};

export const ColorSelector: React.FC<{ noteDetails: EditorState }> = ({
    noteDetails,
}) => {
    const dispatch = useAppDispatch();
    const colors: ColorMap<NoteColors> = {
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
                    onClick={() => dispatch(setColor(color as NoteColors))}
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
