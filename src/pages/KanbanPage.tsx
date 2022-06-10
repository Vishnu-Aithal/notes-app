import { KanbanContainer } from "components/Kanban/KanbanContainer";
import { NewTodo } from "components/Kanban/NewTodo";
import { Todo } from "components/Kanban/Todo";
import { useEffect, useState } from "react";
import { getAllTodos } from "store/todosSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { TodoType } from "types/Todo";

export const KanbanPage: React.FC = () => {
    const todos = useAppSelector((state) => state.todos);
    const [classifiedTodos, setClassifiedTodos] = useState({
        todo: [] as TodoType[],
        doing: [] as TodoType[],
        done: [] as TodoType[],
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllTodos());
    }, [dispatch]);
    useEffect(() => {
        const classifiedTodos = {
            todo: todos.filter((todo) => todo.status === "todo"),
            doing: todos.filter((todo) => todo.status === "doing"),
            done: todos.filter((todo) => todo.status === "done"),
        };
        setClassifiedTodos(classifiedTodos);
    }, [todos]);
    return (
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-0 w-full p-6 dark:text-slate-300 sm:divide-x-2 dark:divide-zinc-600 h-fit min-h-full">
            <KanbanContainer heading={"TODO"}>
                <NewTodo todos={todos} />
                {classifiedTodos.todo.map((todo) => (
                    <Todo key={todo._id} todoDetails={todo} />
                ))}
            </KanbanContainer>
            <KanbanContainer heading={"DOING"}>
                {classifiedTodos.doing.map((todo) => (
                    <Todo key={todo._id} todoDetails={todo} />
                ))}
            </KanbanContainer>
            <KanbanContainer heading={"DONE"}>
                {classifiedTodos.done.map((todo) => (
                    <Todo key={todo._id} todoDetails={todo} />
                ))}
            </KanbanContainer>
        </div>
    );
};
