import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { List } from "../../components/List";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';


export interface IList {
  id: string;
  name: string;
  completed: boolean;
}

export function Home() {
  const [lists, setLists] = useState<IList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLists();
  });

  function loadLists() {
    api.get('lists').then(response => {
      setLists(response.data);
    })
  }

  async function handleList(listTitle: string) {

    const data = {
      name: listTitle,
      completed: false
    };
    try {
      await api.post('lists', data);

      loadLists();

    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  async function handleDeleteList(id: string) {
    try {
      await api.delete(`lists/${id}`);

      setLists(lists.filter(list => list.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }


  function selectTask(listId: string) {

    localStorage.setItem('listId', listId);
    navigate("/detalhes")
  }


  async function checkList(listId: string) {

    lists.map((listComponent) => {
      if (listComponent.id === listId) {
        const data = {
          completed: !listComponent.completed,
        };

        api.patch(`lists/${listId}`, data);     
      }
    });
  }

  return (
    <>
      <Header onAddTask={handleList} />
      <List
        list={lists}
        onDelete={handleDeleteList}
        onComplete={checkList}
        onSelect={selectTask}
      />
    </>
  );
}