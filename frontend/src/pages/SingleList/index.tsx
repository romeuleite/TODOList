import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { TaskList } from "../../components/TaskList";
import api from "../../services/api";


export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export function SingleList() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const listId = localStorage.getItem('listId');

  useEffect(() => {
    loadTasks();
  }, [listId]);

  function loadTasks(){
    api.get('listtasks', {
      headers: {
        Authorization: listId,
      }
    }).then(response => {
      setTasks(response.data);
    })
  }

  async function handleDeleteTask(id: string) {
    try {
      await api.delete(`tasks/${id}`, {
        headers: {
          Authorization: listId,
        }
      });

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert('Erro ao deletar tarefa, tente novamente.');
    }
  }

  async function handleNewTask(taskTitle: string) {

    const data = {
      title: taskTitle,
      completed: false
    };

    try {
      await api.post('tasks', data, {
        headers: {
          Authorization: listId,
        }
      })

      loadTasks();

    } catch (err) {
      alert('Erro ao cadastrar tarefa, tente novamente.');
    }
  }

  async function checkTask(taskId: string) {

    tasks.map(async (task) => {
      if (task.id === taskId) {
        const data = {
          completed: !task.completed,
        };

        await api.patch(`tasks/${taskId}`, data); 

        loadTasks();
      }
    });
  }

  return (
    <>
      <Header onAddTask={handleNewTask} />
      <TaskList
        tasklist={tasks}
        onDelete={handleDeleteTask}
        onComplete={checkTask}
      />
    </>
  );
}
