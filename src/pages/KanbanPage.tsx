import { CalenderIcon } from "assets/Icons/Icons";
import { KanbanContainer } from "components/Kanban/KanbanContainer";
import { NewTodo } from "components/Kanban/NewTodo";
import { Todo } from "components/Kanban/Todo";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/TypedExports";
import { TodoType } from "types/Todo";

export const KanbanPage: React.FC = () => {
    const todos = useAppSelector((state) => state.todos);
    const [classifiedTodos, setClassifiedTodos] = useState({
        todo: [] as TodoType[],
        doing: [] as TodoType[],
        done: [] as TodoType[],
    });
    useEffect(() => {
        const classifiedTodos = {
            todo: todos.filter((todo) => todo.status === "todo"),
            doing: todos.filter((todo) => todo.status === "doing"),
            done: todos.filter((todo) => todo.status === "done"),
        };
        setClassifiedTodos(classifiedTodos);
    }, [todos]);
    return (
        <div className="flex lg:flex-row flex-col gap-2 sm:gap-0 w-full p-6 dark:text-slate-300 lg:divide-x-2 dark:divide-zinc-600 h-fit min-h-full">
            {todos.length === 0 && (
                <div className="w-full">
                    <h1 className="w-full text-center text-lg mt-5 font-bold">
                        No Todos Here! Create New Todos.
                    </h1>
                    <CalenderIcon className="h-1/2 w-1/2 m-auto opacity-50" />
                </div>
            )}
            <KanbanContainer heading={"TODO"}>
                <NewTodo todos={todos} />
                {classifiedTodos.todo.map((todo) => (
                    <Todo key={todo._id} todoDetails={todo} />
                ))}
            </KanbanContainer>
            {todos.length > 0 && (
                <>
                    {" "}
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
                </>
            )}
        </div>
    );
};
