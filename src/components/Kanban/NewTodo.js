import { PlusIcon } from "assets/Icons/Icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "store/todosSlice";

export const NewTodo = ({ todos }) => {
    const [newTodo, setNewTodo] = useState("");
    const dispatch = useDispatch();
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
                    !newTodo || todos.find((todo) => todo.name === newTodo)
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
