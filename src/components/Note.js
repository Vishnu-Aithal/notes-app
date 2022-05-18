import {
    ArchiveIcon,
    ColorSwatchIcon,
    TagIcon,
    PinIcon,
    TrashIcon,
} from "./Icons";
import { Interweave } from "interweave";
const Tag = ({ name }) => {
    return (
        <div className="rounded-full px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            {name}
        </div>
    );
};
export const Note = ({ note }) => {
    const bgColor = {
        red: "bg-red-300",
        yellow: "bg-yellow-300",
        blue: "bg-blue-300",
        green: "bg-green-300",
        default: "",
    };
    const borderColor = {
        red: "border-red-300",
        yellow: "border-yellow-300",
        blue: "border-blue-300",
        green: "border-green-300",
        default: "border-gray-300",
    };
    return (
        <div
            className={
                "flex flex-col h-fit border-1 sm:w-96 w-72 rounded-lg p-4 text-gray-600 hover:shadow-md dark:shadow-zinc-700 transition-shadow group dark:bg-zinc-800 dark:text-slate-300 " +
                borderColor[note.color] +
                " " +
                bgColor[note.color]
            }>
            {/* Header */}
            <div className="flex">
                <h1 className="text-xl font-semibold">{note.heading}</h1>
                <button className="ml-auto  opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                    <PinIcon
                        className={"h-6 w-6 hover:-rotate-45 transition-all"}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="my-4">
                <Interweave content={note.body} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-center my-2">
                {note.tags.map((tag) => (
                    <Tag name={tag} />
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center mt-auto   ">
                {/* Time Stamp */}
                <p className="text-xs cursor-default text-gray-500">
                    {note.created.toString()}
                </p>

                {/* Footer CTA */}
                <div className="flex ml-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                    <button>
                        <ColorSwatchIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
                    </button>
                    <button>
                        <TagIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
                    </button>
                    <button>
                        <ArchiveIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
                    </button>
                    <button>
                        <TrashIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};
