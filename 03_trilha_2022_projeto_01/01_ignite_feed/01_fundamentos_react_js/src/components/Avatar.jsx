import styles from "./Avatar.module.css";

export function Avatar({ border, src }) {
  return (
    <img
      className={border === false ? styles.avatar : styles.avatarBorder}
      src={src}
      alt="foto_avatar"
    />
  );
}
