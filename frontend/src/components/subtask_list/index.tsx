import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { RxCross2 } from "react-icons/rx";
import { ResourceTask } from "../../types/TreeNode";
import { BsArrowRight } from "react-icons/bs";

type Props = {
  active?: boolean;
  resourceTaskList: ResourceTask[];
  close: () => any;
};

export const SubTaskList: React.FC<Props> = ({
  active,
  close,
  resourceTaskList,
}) => {
  const Controls = useMemo(() => {
    return (
      <div id={styles.controls}>
        {/* <GoSidebarExpand onClick={close} className={styles.sidebar_icon} /> */}
        <RxCross2 onClick={close} className={styles.sidebar_icon} />
      </div>
    );
  }, [close]);

  const List = useMemo(() => {
    return (
      <ul>
        {resourceTaskList?.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => window.open(item.resourceLink, "_blank")}
            >
              <p>{item.name}</p>
              <BsArrowRight className={styles.path_icon} />
            </li>
          );
        })}
      </ul>
    );
  }, []);
  return (
    <div data-open={active} id={styles.container}>
      {Controls}
      {List}
    </div>
  );
};
