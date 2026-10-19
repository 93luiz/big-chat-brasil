import { useAuth } from "../auth/AuthProvider";
import styles from "./message_bubble.module.css";

export default function MessageBubble({ message }) {
    const user = useAuth().user;
    const isMine = message.user_id == user.id;
    const isSystem = message.type == 'system';

    return (
        <div className="d-flex">
            <div className={`${isSystem ? styles.system : styles.bubble} ${isMine ? styles.mine : styles.theirs}`}>
                {message.text}
                <span className={`badge text-bg-light ${styles.time}`}>{(new Date(message.created_at)).toLocaleTimeString("pt-BR", { timeStyle: "short" })}</span>
            </div>
        </div>
    );
}