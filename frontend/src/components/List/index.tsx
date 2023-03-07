import { TbClipboardText } from "react-icons/tb";
import { IList } from "../../pages/Home";
import { ITask } from "../../pages/SingleList";
import { TaskList } from "../TaskList";
import styles from "./list.module.css";

interface Props {
    list: IList[];
    onComplete: (taskListId: string) => void;
    onDelete: (taskListId: string) => void;
}

export function List({ list, onComplete, onDelete }: Props) {
    const listQuantity = list.length;
    const completedList = list.filter((taskList) => taskList.isCompleted).length;

    return (
        <section className={styles.list}>
            <header className={styles.header}>
                <div>
                    <p>Listas criadas</p>
                    <span>{listQuantity}</span>
                </div>

                <div>
                    <p className={styles.textGray}>Concluídas</p>
                    <span>
                        {completedList} de {listQuantity}
                    </span>
                </div>
            </header>

            <div className={styles.listview}>
                {list.map((taskList) => (
                    <TaskList
                        key={taskList.id}
                        tasklist={list}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                ))}

                {list.length <= 0 && (
                    <section className={styles.empty}>
                        <TbClipboardText size={50} />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}