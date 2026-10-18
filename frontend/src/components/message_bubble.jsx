import { useAuth } from "../auth/AuthProvider";
import styles from "./message_bubble.module.css";

export default function MessageBubble({ message }) {
    const user = useAuth().user;
    const isMine = message.user_id == user.id;

    return (
        <div className="d-flex">
            <div className={`${styles.bubble} ${isMine ? styles.mine : styles.theirs}`}>{message.text}</div>
        </div>
    );
}