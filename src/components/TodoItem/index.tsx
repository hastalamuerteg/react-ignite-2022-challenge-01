import { HiOutlineTrash as TrashIcon } from 'react-icons/hi';
import { ITodo } from '../../pages/Home';

interface ITodoItemProps {
  todo: ITodo;
  onComplete: (todoId: string) => void;
  onDelete: (todoId: string) => void;
}

export const TodoItem = ({ todo, onComplete, onDelete }: ITodoItemProps) => {
  return (
    <li className="bg-zinc-800 w-full my-2 py-4 px-4 h-20 overflow-hidden rounded-lg flex justify-start items-start relative">
      <div className="block pl-2 rounded-full w-4 h-4 border-2 border-sky-700 relative">
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          name={`todo-checkbox-${todo.id}`}
          checked={todo.done}
          onChange={() => onComplete(todo.id)}
          className="appearance-none absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      checked:rounded-full
                      checked:bg-purple-600
                      checked:h-4
                      checked:w-4
                      checked:after:absolute
                      checked:after:left-1/2
                      checked:after:top-1/2
                      checked:after:-translate-x-1/2
                      checked:after:-translate-y-1/2
                      checked:after:text-xs
                      checked:after:font-bold
                      checked:after:text-white
                      checked:after:content-['✓']"
        />
      </div>
      <label
        htmlFor={`todo-checkbox-${todo.id}`}
        className={`inline pl-2 -mt-1 w-4/5 overflow-hidden
                    ${todo.done ? 'line-through' : ''}`}
      >
        {todo.content}
      </label>
      <button
        className="p-1 rounded-xl cursor-pointer ml-2 -mt-1 absolute top-3 right-3"
        onClick={() => onDelete(todo.id)}
      >
        <TrashIcon />
      </button>
    </li>
  );
};
