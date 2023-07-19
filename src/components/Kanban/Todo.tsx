import {
    ArrowRightIcon,
    DeleteTrashIcon,
    PencilIcon,
} from "assets/Icons/Icons";
import { useRef, useState } from "react";
import { deleteTodo, updateTodo } from "store/todosSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { TodoType } from "types/Todo";

export const Todo: React.FC<{ todoDetails: TodoType }> = ({ todoDetails }) => {
    const [edit, setEdit] = useState({ mode: false, name: "" });
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todos);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text", JSON.stringify(todoDetails));
            }}
            className="border dark:border-zinc-700 rounded-md flex p-1 cursor-pointer active:cursor-move">
            {edit.mode ? (
                <div className="flex">
                    <input
                        ref={inputRef}
                        className="dark:bg-zinc-700 w-full rounded-md p-2 mr-1 outline-none border-b"
                        type="text"
                        value={edit.name}
                        onBlur={() =>
                            setTimeout(
                                () => setEdit({ mode: false, name: "" }),
                                100
                            )
                        }
                        onChange={(e) =>
                            setEdit((edit) => ({
                                ...edit,
                                name: e.target.value,
                            }))
                        }
                    />
                    <button
                        disabled={
                            !!todos.find((todo) => todo.name === edit.name)
                        }
                        className="disabled:opacity-20"
                        onClick={() => {
                            dispatch(
                                updateTodo({ ...todoDetails, name: edit.name })
                            );
                        }}>
                        <ArrowRightIcon className={"h-5 w-5"} />
                    </button>
                </div>
            ) : (
                <h1 className="p-2">{todoDetails.name}</h1>
            )}
            <div className="flex ml-auto">
                <button
                    className={`${edit.mode ? "text-red-500 scale-105" : ""}`}
                    onClick={() => {
                        if (!edit.mode) {
                            setEdit({ mode: true, name: todoDetails.name });
                            console.log(inputRef.current);
                            // inputRef.current?.focus();
                            setTimeout(() => inputRef.current?.focus(), 10);
                        } else {
                            setEdit({ mode: false, name: "" });
                        }
                    }}>
                    <PencilIcon className={"h-5 w-5"} />
                </button>
                <button onClick={() => dispatch(deleteTodo(todoDetails))}>
                    <DeleteTrashIcon className={"h-5 w-5"} />
                </button>
            </div>
        </div>
    );
};
