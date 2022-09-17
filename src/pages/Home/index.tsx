import { AiOutlinePlusCircle as AddIcon } from 'react-icons/ai';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import clipboard from '../../assets/Clipboard.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TodoItem } from '../../components/TodoItem';

export interface ITodo {
  id: string;
  content: string;
  done: boolean;
}

export const Home = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoContent, setTodoContent] = useState<string>('');

  const doneTodos = todos?.filter((td) => td.done === true).length;

  const handleCreateNewTodo = () => {
    if (todoContent && todoContent.length <= 80) {
      const newTodo = {
        id: uuid(),
        content: todoContent.trim(),
        done: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoContent('');

      return toast.success('Todo criado com sucesso', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        className: 'bg-zinc-700 text-white',
      });
    }

    if (todoContent.length > 80) {
      return toast.error('Excedeu o número máximo de caracteres, 80', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        className: 'bg-zinc-700 text-white',
      });
    }

    return toast.error('Ops, É necessário preencher o conteúdo antes de salvar', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      className: 'bg-zinc-700 text-white',
    });
  };

  const handleCompleteTodo = (todoId: string) => {
    const newTodoList = [...todos];
    const todoIndex = newTodoList.findIndex((td) => td.id === todoId);
    newTodoList[todoIndex].done = !newTodoList[todoIndex].done;
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (todoId: string) => {
    const newTodoList = todos.filter((td) => td.id !== todoId);
    setTodos(newTodoList);
    return toast.success('Todo removido com sucesso', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      className: 'bg-zinc-700 text-white',
    });
  };

  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <Header />
        <main className="max-w-[736px] mx-auto p-4">
          <section>
            <div className="w-full mx-auto -mt-8 flex justify-center items-center space-x-4 h-14">
              <input
                type="text"
                value={todoContent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTodoContent(e.target.value)
                }
                placeholder="Adicione uma nova tarefa"
                className="bg-zinc-800 p-2 flex-grow outline-none text-white caret-white placeholder-gray-500 w-2/4 h-full rounded-lg relative"
                required
              />
              <Button
                className="bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg flex justify-center items-center h-full"
                onClick={handleCreateNewTodo}
              >
                Criar
                <AddIcon size={16} className="ml-2" />
              </Button>
            </div>
          </section>
          <section className="w-full flex justify-between items-center mt-14">
            <div className="flex justify-start items-center">
              <p className="text-sky-600 font-bold text-sm">Tarefas criadas</p>
              <span className="py-1 px-3 ml-3 bg-gray-800 rounded-full text-white font-semibold flex justify-center items-center text-sm">
                {todos?.length ?? 0}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-purple-700 font-bold text-sm">Concluídas</p>
              <span className="py-1 px-4 ml-3 bg-gray-800 rounded-full text-white font-semibold flex justify-center items-center text-sm">
                {`${doneTodos} de ${todos.length}`}
              </span>
            </div>
          </section>
          {!todos.length && (
            <section className="mx-auto w-full flex flex-col justify-center items-center p-10 my-10 text-gray-400 rounded-lg border-t border-gray-600">
              <picture>
                <img src={clipboard} alt="small clipboard" />
              </picture>
              <p className="font-bold mt-6 text-center">
                Você ainda não tem tarefas cadastradas
              </p>
              <p className="text-center">Crie tarefas e organize seus itens a fazer</p>
            </section>
          )}
          {todos.length > 0 && (
            <ul className="mx-auto w-full flex flex-col justify-center items-center my-10 text-gray-400 rounded-lg">
              {todos.map((td) => (
                <TodoItem
                  todo={td}
                  key={td.id}
                  onComplete={handleCompleteTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
      <ToastContainer />
    </>
  );
};
