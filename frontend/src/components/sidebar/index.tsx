import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { GoPlus, GoSidebarExpand } from "react-icons/go";

type Props = {
  active?: boolean;
  close: () => any;
};

export const Sidebar: React.FC<Props> = (props) => {
  const { active, close } = props;

  const Controls = useMemo(() => {
    return (
      <div id={styles.controls}>
        <GoSidebarExpand onClick={close} className={styles.sidebar_icon} />
        <GoPlus className={styles.sidebar_icon} />
      </div>
    );
  }, [close]);
  return (
    <div data-open={active} id={styles.container}>
      {Controls}
    </div>
  );
};
