import { TbClipboardText } from "react-icons/tb";
import { ITask } from "../../pages/SingleList";
import { Task } from "../Task";
import styles from "./tasklist.module.css";

interface Props {
    tasklist: ITask[];
    onComplete: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

export function TaskList({ tasklist, onComplete, onDelete}: Props) {
    const tasksQuantity = tasklist.length;
    const completedTasks = tasklist.filter((task) => task.isCompleted).length;

    return (
        <section className={styles.tasklist}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas criadas</p>
                    <span>{tasksQuantity}</span>
                </div>

                <div>
                    <p className={styles.textGray}>Concluídas</p>
                    <span>
                        {completedTasks} de {tasksQuantity}
                    </span>
                </div>
            </header>

            <div className={styles.list}>
                {tasklist.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                ))}

                {tasklist.length <= 0 && (
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