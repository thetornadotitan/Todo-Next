/*
Id like to change this to only have 1 return and have the error handling edit the result of that one returned "component."
For now it returns a few different results based on the success or failure of the fetch request.
*/

export default async function Page() {
  try {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch - for possible exceptions
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await data.json();
    return (
      <ul>
        {todos.map((todos: { id: number; title: string }) => (
          <li key={todos.id}>
            {todos.id} : {todos.title}
            <br />
          </li>
        ))}
      </ul>
    );
  } catch (e) {
    if (typeof e === "string") return <div>{e}</div>;
    else if (e instanceof Error)
      return (
        <div>
          {e.name}
          <br />
          {e.message}
          <br />
          {e.stack}
        </div>
      );
    else return <div>Unknown error occured</div>;
  }
}
