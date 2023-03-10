import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { TaskList } from "../../components/TaskList";
import { List } from "../../components/List";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

const LOCAL_STORAGE_KEY = "todo:savedLists";

export interface IList {
  id: string;
  name: string;
  isCompleted: boolean;
}

export function Home() {
  const [id, setId] = useState('');
  const [lists, setLists] = useState<IList[]>([]);
  const navigate = useNavigate();

  async function handleList(listTitle: string) {

    const data = {
      name: listTitle,
      completed: false
    };
    try {
      await api.post('lists', data);

    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  useEffect(() => {
    api.get('lists').then(response => {
      setLists(response.data);
    })
  });

  async function handleDeleteList(id: string) {
    try {
      await api.delete(`lists/${id}`);

      setLists(lists.filter(list => list.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }


  function setListsAndSave(newLists: IList[]) {
    setLists(newLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLists));
  }


  function selectTask(listId: string){

    localStorage.setItem('listId', listId);

    navigate("/detalhes")

  }

  function toggleListCompletedById(listId: string) {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          isCompleted: !list.isCompleted,
        };
      }
      return list;
    });
    setListsAndSave(newLists);
  }

  return (
    <>
      <Header onAddTask={handleList} />
      <List
        list={lists}
        onDelete={handleDeleteList}
        onComplete={selectTask}
      />
    </>
  );
}