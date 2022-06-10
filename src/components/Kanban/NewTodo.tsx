import { PlusIcon } from "assets/Icons/Icons";
import { useState } from "react";
import { addNewTodo } from "store/todosSlice";
import { useAppDispatch } from "store/TypedExports";
import { TodoType } from "types/Todo";

export const NewTodo: React.FC<{ todos: TodoType[] }> = ({ todos }) => {
    const [newTodo, setNewTodo] = useState("");
    const dispatch = useAppDispatch();
    return (
        <div className="flex">
            <input
                className="dark:bg-zinc-700 w-full rounded-md p-2 mr-1 outline-none border-b"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />{" "}
            <button
                className="disabled:opacity-50"
                disabled={
                    !newTodo || !!todos.find((todo) => todo.name === newTodo)
                }
                onClick={() => {
                    dispatch(addNewTodo({ name: newTodo, status: "todo" }));
                    setNewTodo("");
                }}>
                <PlusIcon className={"h-5 w-5"} />
            </button>
        </div>
    );
};
