import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { TaskList } from "../../components/TaskList";
import api from "../../services/api";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function SingleList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();

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
      alert('Erro ao deletar caso, tente novamente.');
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
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }


  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }


  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={handleNewTask} />
      <TaskList
        tasklist={tasks}
        onDelete={handleDeleteTask}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}
