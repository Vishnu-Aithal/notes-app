import { ReactNode, useState } from "react";
import { updateTodo } from "store/todosSlice";
import { useAppDispatch } from "store/TypedExports";

interface KanBanContainerProps {
    children: ReactNode;
    heading: string;
}

export const KanbanContainer: React.FC<KanBanContainerProps> = ({
    children,
    heading,
}) => {
    const [dragOver, setDragOver] = useState(false);
    const containerType = heading.toLowerCase();
    const dispatch = useAppDispatch();
    return (
        <div
            id={heading}
            className={`flex flex-col gap-2 sm:w-1/3 w-full p-6 kanban-container border sm:border-0 ${
                dragOver ? "bg-gray-100 dark:bg-zinc-700" : ""
            }`}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={(e) => {
                setDragOver(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                if (
                    (e?.relatedTarget as HTMLElement)?.closest(
                        ".kanban-container"
                    )?.id !== heading
                )
                    setDragOver(false);
            }}
            onDrop={(e) => {
                const recievedTodo = JSON.parse(e.dataTransfer.getData("text"));
                setDragOver(false);
                if (recievedTodo.status !== containerType) {
                    dispatch(
                        updateTodo({ ...recievedTodo, status: containerType })
                    );
                }
            }}>
            <h1 className="tex-lg font-bold text-center mb-4">{heading}</h1>
            {children}
        </div>
    );
};
