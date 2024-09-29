import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
type Props = {};

export const Main: React.FC<Props> = (props) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const closeSidebar = useCallback(() => {
    setSidebarActive(false);
  }, []);

  return (
    <>
      <div id={styles.container} data-sidebar-active={sidebarActive}>
        <Header
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
        />
      </div>
      <div
        id={styles.inactive_overlay}
        data-sidebar-active={sidebarActive}
        onClick={closeSidebar}
      ></div>
      <Sidebar active={sidebarActive} close={closeSidebar} />
    </>
  );
};
