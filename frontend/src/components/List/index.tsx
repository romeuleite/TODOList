import { TbClipboardText } from "react-icons/tb";
import { IList } from "../../pages/Home";
import { ListComponent } from "../ListComponent";
import styles from "./list.module.css";

interface Props {
    list: IList[];
    onComplete: (listComponentId: string) => void;
    onDelete: (listComponentId: string) => void;
    onSelect: (listComponentId: string) => void;
}

export function List({ list, onComplete, onDelete, onSelect }: Props) {
    const listQuantity = list.length;
    const completedList = list.filter((listComponent) => listComponent.completed).length;

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
                {list.map((listComponent) => (
                    <ListComponent
                        key={listComponent.id}
                        listComponent={listComponent}
                        onComplete={onComplete}
                        onDelete={onDelete}
                        onSelect={onSelect}
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