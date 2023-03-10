import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

import styles from "./listcomponent.module.css";
import { IList } from "../../pages/Home";
import { useNavigate } from "react-router-dom";

interface Props {
  listComponent: IList;
  onComplete: (listId: string) => void;
  onDelete: (listId: string) => void;
}

export function ListComponent({ listComponent, onComplete, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.listcomponent}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(listComponent.id)}
      >
        {listComponent.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={listComponent.isCompleted ? styles.textCompleted : ""} onClick={() => onComplete(listComponent.id)}>
        {listComponent.name}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(listComponent.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}