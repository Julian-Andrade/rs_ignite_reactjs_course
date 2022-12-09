import { useState } from "react";

import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar
        border={false}
        src="https://avatars.githubusercontent.com/u/72326084?v=4"
        alt="avatar_comment"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Julian Andrade</strong>
              <time
                title="17 de Novembro as 13:54"
                dateTime="2022-11-17 13:54:00"
              >
                Publicado há 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deleter Comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
