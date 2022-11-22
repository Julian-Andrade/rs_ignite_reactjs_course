import { ImgHTMLAttributes } from "react";

import styles from "./Avatar.module.css";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  border?: boolean;
}

export function Avatar({ border, ...props }: AvatarProps) {
  return (
    <img
      className={border === false ? styles.avatar : styles.avatarBorder}
      {...props}
    />
  );
}
