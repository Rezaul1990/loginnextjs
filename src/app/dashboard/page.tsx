'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addTodo, deleteTodo, getTodos, logOut, updateTodo } from '@/lib/firebase/services';
import { useRouter } from 'next/navigation';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        loadTodos(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadTodos = async (userId: string) => {
    const todosList = await getTodos(userId);
    setTodos(todosList as Todo[]);
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || !auth.currentUser) return;

    await addTodo(auth.currentUser.uid, newTodo);
    setNewTodo('');
    loadTodos(auth.currentUser.uid);
  };

  const handleToggleTodo = async (todoId: string, completed: boolean) => {
    await updateTodo(todoId, !completed);
    if (auth.currentUser) {
      loadTodos(auth.currentUser.uid);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo(todoId);
    if (auth.currentUser) {
      loadTodos(auth.currentUser.uid);
    }
  };

  const handleLogout = async () => {
    await logOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todo List</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
              placeholder="Add new todo"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todo.completed)}
                  className="h-5 w-5"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 