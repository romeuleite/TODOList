import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

import styles from "./listcomponent.module.css";
import { IList } from "../../pages/Home";

interface Props {
  listComponent: IList;
  onComplete: (listComponentId: string) => void;
  onDelete: (listComponentId: string) => void;
  onSelect: (listComponentId: string) => void;
}

export function ListComponent({ listComponent, onComplete, onDelete, onSelect }: Props) {

  return (
    <div className={styles.listComponent}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(listComponent.id)}
      >
        {listComponent.completed ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p style={{cursor: "pointer"}} className={listComponent.completed ? styles.textCompleted : ""} onClick={() => onSelect(listComponent.id)}>
        {listComponent.name}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(listComponent.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}