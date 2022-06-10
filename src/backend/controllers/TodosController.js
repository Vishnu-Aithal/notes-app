import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Todos are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all todos in the db.
 * send GET Request at /api/todos
 * */

export const getAllTodosHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        return new Response(
            404,
            {},
            {
                errors: [
                    "The email you entered is not Registered. Not Found error",
                ],
            }
        );
    }
    return new Response(200, {}, { todos: user.todos });
};

/**
 * This handler handles creating a new todo
 * send POST Request at /api/todos
 * body contains {todo}
 * */

export const createTodoHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The email you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const { todo } = JSON.parse(request.requestBody);

        user.todos.push({ ...todo, _id: uuid() });

        this.db.users.update({ _id: user._id }, user);
        return new Response(201, {}, { todos: user.todos });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles creating a new todo
 * send DELETE Request at /api/todos/:todoId
 * */

export const deleteTodoHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The email you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const todoId = request.params.todoId;
        user.todos = user.todos.filter((item) => item._id !== todoId);
        this.db.users.update({ _id: user._id }, user);
        return new Response(200, {}, { todos: user.todos });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles updating a todo
 * send POST Request at /api/todos/:todoId
 * body contains {todo}
 * */

export const updateTodoHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: [
                        "The email you entered is not Registered. Not Found error",
                    ],
                }
            );
        }
        const { todo } = JSON.parse(request.requestBody);
        const { todoId } = request.params;
        const todoIndex = user.todos.findIndex((todo) => todo._id === todoId);
        user.todos[todoIndex] = { ...user.todos[todoIndex], ...todo };
        this.db.users.update({ _id: user._id }, user);
        return new Response(201, {}, { todos: user.todos });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};
