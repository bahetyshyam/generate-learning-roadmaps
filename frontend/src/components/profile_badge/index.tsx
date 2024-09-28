import React from "react";
import styles from "./styles.module.css";

type Props = {
  src: string;
};

export const ProfileBadge: React.FC<Props> = (props) => {
  const { src } = props;
  return <img id={styles.container} src={src} />;
};
