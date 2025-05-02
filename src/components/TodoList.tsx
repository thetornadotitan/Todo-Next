"use client";

import Todo from "@/lib/types";
import { useState } from "react";

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [editorVisible, setEditorVisible] = useState(false);
  const [creatorVisible, setCreatorVisible] = useState(false);
  const [lastMessage, setLastMessage] = useState("DEFAULT MESSAGE");
  const [todoToEdit, setEditTodo] = useState<Todo>();
  const [filterStatus, setFilterStatus] = useState(0);

  function deleteTodo(todo: Todo) {
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  function addTodo(title: string) {
    const newTodo: Todo = {
      userId: 1,
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    hideCreator();
  }

  function editTodo() {
    if (todoToEdit === null || todoToEdit === undefined) return;

    const updated = todos.map((t) => {
      if (t.id === todoToEdit.id) todoToEdit.title = lastMessage;
      return t;
    });
    setTodos(updated);

    setEditorVisible(false);
  }

  function toggleCompleteness(todo: Todo) {
    const updated = todos.map((t) => {
      if (t.id === todo.id) t.completed = !t.completed;
      return t;
    });
    setTodos(updated);
  }

  function showEditor(message: string) {
    setLastMessage(message);
    setEditorVisible(true);
  }

  function hideEditor() {
    setEditorVisible(false);
  }

  function showCreator() {
    setLastMessage("");
    setCreatorVisible(true);
  }

  function hideCreator() {
    setCreatorVisible(false);
  }

  function chageFiltering(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterStatus(Number(e.target.value));
  }

  return (
    <div className="flex flex-col">
      {/* Add todo button and filtering selection*/}
      <div className="flex justify-center flex-wrap">
        <div
          onClick={() => {
            showCreator();
          }}
          className="m-4 bg-blue-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-blue-700 hover:animate-hover-enlarge text-center select-none active:hover:bg-blue-900 active:inset-shadow-sm/66">
          Create new Todo
        </div>
        <div className="self-center">
          <label htmlFor="filtering">Filter By:</label>
          &nbsp;
          <select
            onChange={chageFiltering}
            className="h-fit"
            name="filtering"
            id="filtering">
            <option className="bg-[#333333]" value="0">
              None
            </option>
            <option className="bg-[#333333]" value="1">
              Complete
            </option>
            <option className="bg-[#333333]" value="-1">
              In-Progress
            </option>
          </select>
        </div>
      </div>

      {/*Map to conditionally render todo elements*/}
      <div className="flex gap-4 justify-center flex-wrap">
        {todos.map((todo) => (
          <div
            className={`w-64 flex flex-col rounded border p-1 animate-fade-in ${
              filterStatus === 0
                ? ""
                : filterStatus === 1 && todo.completed === true
                ? ""
                : filterStatus === -1 && todo.completed === false
                ? ""
                : "hidden"
            }`}
            key={todo.id}>
            <div>{todo.id}</div>
            <div className="grow">{todo.title}</div>
            <div>{todo.completed ? "Completed" : "In-Progress"}</div>
            <div className="flex gap-4 select-none">
              <div
                onClick={() => {
                  toggleCompleteness(todo);
                }}
                className="bg-blue-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-blue-700 hover:animate-hover-enlarge active:hover:bg-blue-900 active:inset-shadow-sm/66">
                Toggle
              </div>
              <div
                onClick={() => {
                  deleteTodo(todo);
                }}
                className="bg-red-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-red-700 hover:animate-hover-enlarge active:hover:bg-red-900 active:inset-shadow-sm/66">
                Delete
              </div>
              <div
                onClick={() => {
                  setEditTodo(todo);
                  showEditor(todo.title);
                }}
                className="bg-yellow-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-yellow-700 hover:animate-hover-enlarge active:hover:bg-yellow-900 active:inset-shadow-sm/66">
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*Editor element for editing a todos title*/}
      <form
        action={() => {
          editTodo();
        }}
        className={`absolute bg-[#000000AA] w-screen h-screen ${
          editorVisible ? "flex" : "hidden"
        } flex-col justify-center gap-4`}>
        <textarea
          className="bg-[#333333] h-75/100 w-75/100 self-center p-2"
          value={lastMessage}
          required
          onChange={(e) => setLastMessage(e.target.value)}
        />
        <div className="flex self-center gap-4 select-none">
          <button className="bg-blue-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-blue-700 hover:animate-hover-enlarge active:hover:bg-blue-900 active:inset-shadow-sm/66">
            Save
          </button>
          <button
            onClick={() => {
              hideEditor();
            }}
            className="bg-red-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-red-700 hover:animate-hover-enlarge active:hover:bg-red-900 active:inset-shadow-sm/66">
            Cancel
          </button>
        </div>
      </form>

      {/*Todo creation element*/}
      <form
        action={() => {
          addTodo(lastMessage);
        }}
        className={`absolute bg-[#000000AA] w-screen h-screen ${
          creatorVisible ? "flex" : "hidden"
        } flex-col justify-center gap-4`}>
        <textarea
          className="bg-[#333333] h-75/100 w-75/100 self-center p-2"
          value={lastMessage}
          required
          onChange={(e) => setLastMessage(e.target.value)}
        />
        <div className="flex self-center gap-4 select-none">
          <button className="bg-blue-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-blue-700 hover:animate-hover-enlarge active:hover:bg-blue-900 active:inset-shadow-sm/66">
            Save
          </button>
          <button
            onClick={() => {
              hideCreator();
            }}
            className="bg-red-500 p-1 rounded cursor-pointer text-shadow-xs/100 hover:bg-red-700 hover:animate-hover-enlarge active:hover:bg-red-900 active:inset-shadow-sm/66">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
