import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { TaskList } from "../../components/TaskList";
import { List } from "../../components/List";
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEY = "todo:savedLists";

export interface IList {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function Home() {
  const [lists, setLists] = useState<IList[]>([]);
  const navigate = useNavigate();

  function loadSavedLists() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
        setLists(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedLists();
  }, []);

  function setListsAndSave(newLists: IList[]) {
    setLists(newLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLists));
  }

  function addList(listTitle: string) {
    setListsAndSave([
      ...lists,
      {
        id: crypto.randomUUID(),
        title: listTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteListById(lisId: string) {
    const newLists = lists.filter((list) => list.id !== lisId);
    setListsAndSave(newLists);
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
      <Header onAddTask={addList} />
      <List
        list={lists}
        onDelete={deleteListById}
        onComplete={toggleListCompletedById}
      />
    </>
  );
}