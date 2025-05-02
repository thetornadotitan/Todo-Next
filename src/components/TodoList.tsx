"use client";

import Todo from "@/lib/types";
import { useState } from "react";

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [editorVisible, setEditorVisible] = useState(false);
  const [lastMessage, setLastMessage] = useState("DEFAULT MESSAGE");
  const [editTodo, setEditTodo] = useState<Todo>();

  function removeTodo(todo: Todo) {
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

  function saveEdits() {
    if (editTodo === null || editTodo === undefined) return;

    const updated = todos.map((t) => {
      if (t.id === editTodo.id) editTodo.title = lastMessage;
      return t;
    });
    setTodos(updated);

    setEditorVisible(false);
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          addTodo("New");
        }}
        className="m-4 bg-blue-500 p-1 rounded cursor-pointer hover:bg-blue-900 self-center text-center select-none"
      >
        Create new Todo
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        {todos.map((todo) => (
          <div className="w-64 flex flex-col rounded border p-1" key={todo.id}>
            <div>{todo.id}</div>
            <div className="grow">{todo.title}</div>
            <div>{todo.completed ? "Completed" : "In-Progress"}</div>
            <div className="flex gap-4 select-none">
              <div
                onClick={() => {
                  toggleCompleteness(todo);
                }}
                className="bg-blue-500 p-1 rounded cursor-pointer hover:bg-blue-900"
              >
                Toggle
              </div>
              <div
                onClick={() => {
                  removeTodo(todo);
                }}
                className="bg-red-500 p-1 rounded cursor-pointer hover:bg-red-900"
              >
                Delete
              </div>
              <div
                onClick={() => {
                  setEditTodo(todo);
                  showEditor(todo.title);
                }}
                className="bg-yellow-500 p-1 rounded cursor-pointer hover:bg-yellow-900"
              >
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`absolute bg-[#000000AA] w-screen h-screen ${
          editorVisible ? "flex" : "hidden"
        } flex-col justify-center gap-4`}
      >
        <textarea
          className="bg-[#333333] h-75/100 w-75/100 self-center p-2"
          value={lastMessage}
          onChange={(e) => setLastMessage(e.target.value)}
        />
        <div className="flex self-center gap-4 select-none">
          <div
            onClick={() => {
              saveEdits();
            }}
            className="bg-blue-500 p-1 rounded cursor-pointer hover:bg-blue-900"
          >
            Save
          </div>
          <div
            onClick={() => {
              hideEditor();
            }}
            className="bg-red-500 p-1 rounded cursor-pointer hover:bg-red-900"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
