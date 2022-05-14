import {
    ArchiveIcon,
    ColorSwatchIcon,
    LabelIcon,
    PinIcon,
    TrashIcon,
} from "./Icons";
const Label = ({ name }) => {
    return (
        <div className="rounded-full px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            {name}
        </div>
    );
};
export const Note = ({}) => {
    return (
        <div className="flex flex-col h-fit border-1 border-gray-200 dark:border-zinc-700 sm:w-96 w-72 rounded-lg p-4 text-gray-600 hover:shadow-md dark:shadow-zinc-700 transition-shadow group dark:bg-zinc-800 dark:text-slate-300">
            {/* Header */}
            <div className="flex">
                <h1 className="text-xl font-semibold">Note Heading</h1>
                <button className="ml-auto  opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                    <PinIcon
                        className={"h-6 w-6 hover:-rotate-45 transition-all"}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="my-4">Body of the Note</div>

            {/* Label */}
            <div className="flex flex-wrap gap-2 items-center my-2">
                <Label name={"label name"} />
            </div>

            {/* Footer */}
            <div className="flex items-center mt-auto   ">
                {/* Time Stamp */}
                <p className="text-xs cursor-default text-gray-500">
                    12:24 PM 12/18/22
                </p>

                {/* Footer CTA */}
                <div className="flex ml-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                    <button>
                        <ColorSwatchIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
                    </button>
                    <button>
                        <LabelIcon className="h-5 w-5 stroke-1 hover:stroke-2" />
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
