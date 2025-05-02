/*
Id like to change this to only have 1 return and have the error handling edit the result of that one return
while using the error boundry for unaccounted for errors.

For now it returns a few different results based on the success or failure of the fetch request.
*/

import Todo from "@/lib/types";
import TodoList from "@/components/TodoList";

export default async function Page() {
  try {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch - for possible exceptions
    //Fetch data
    const url = "https://jsonplaceholder.typicode.com/todos";
    const data = await fetch(url);
    if (data.ok !== true)
      throw new Error(
        "Failed to fetch data from " +
          url +
          " --- Failed to load initial todos."
      );

    //Make sure data matches what an expected Todo result would be.
    const todos = await data.json();
    if (!isTodo(todos))
      throw new Error(
        "Invalid JSON data passed to application. --- Failed to load initial todos."
      );

    //Grab three random things
    const inititalTodos: Array<Todo> = [];
    inititalTodos.push(grabRandomTodo(todos));
    inititalTodos.push(grabRandomTodo(todos));
    inititalTodos.push(grabRandomTodo(todos));

    return <TodoList initialTodos={inititalTodos} />;
  } catch (e) {
    if (typeof e === "string") return <div>{e}</div>;
    else if (e instanceof Error)
      return (
        <div className="w-screen h-screen flex justify-center items-center text-red-500">
          {e.name}
          <br />
          {e.message}
          <br />
          <br />
          {e.stack}
        </div>
      );
    else
      return (
        <div className="w-screen h-screen flex justify-center items-center text-red-500">
          Unknown error occured
        </div>
      );
  }
}

//It seems there are a few libraries for checking JSON to a ts interface/JSON schema.
//For now I'll implement a basic function to check and ensure the data received matches our Todo type.
function isTodo(obj: unknown): obj is Array<Todo> {
  if (obj === null || !Array.isArray(obj)) return false;
  const todo = obj as Array<Record<string, unknown>>;
  let result: boolean = true;
  //Might consider changing to a regular loop to support early returning.
  todo.forEach((t) => {
    if (
      (typeof t.userId === "number" &&
        typeof t.id === "number" &&
        typeof t.title === "string" &&
        typeof t.completed === "boolean") === false
    )
      result = false;
  });
  return result;
}

//Super simple function to grab a Todo, it does technically discard the todo from the list of all todos, this may be unwanted.
//To fix this we could check a list/array of grabbed IDs and re-roll our random number if we happen to choose the same one.
//This would allow us to pull a random entry with no repeats without modifing the original returned data.
function grabRandomTodo(arr: Array<Todo>): Todo {
  const random_index: number = Math.floor(Math.random() * arr.length);
  return arr.splice(random_index, 1)[0];
}
