import React, { useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { ProfileBadge } from "../profile_badge";
import Dropdown from "../language_dropdown";

type Props = {
  sidebarActive?: boolean;
  setSidebarActive: (active: boolean) => any;
};

export const Header: React.FC<Props> = (props) => {
  const { sidebarActive, setSidebarActive } = props;

  const toggleSidebar = useCallback(() => {
    setSidebarActive(!sidebarActive);
  }, [sidebarActive]);

  const SidebarIcon = useMemo(() => {
    const props = {
      className: styles.sidebar_icon,
      onClick: toggleSidebar,
    };
    return sidebarActive ? (
      <GoSidebarExpand {...props} />
    ) : (
      <GoSidebarCollapse {...props} />
    );
  }, [sidebarActive, toggleSidebar]);
  return (
    <div id={styles.container}>
      {SidebarIcon}
      <h1 id={styles.title}>MentorMind.ai</h1>
      <div id={styles.lang_profile}>
        <Dropdown />
        <ProfileBadge />
      </div>
    </div>
  );
};
