import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { AppContext } from "../../contexts/AppContext";
import { useTranslation } from "react-i18next";

export const ProfileBadge: React.FC = () => {
  const appContext = useContext(AppContext);
  const { t } = useTranslation();
  const { logout } = appContext || {};
  const [menuShown, setMenuShown] = useState(false);

  return (
    <>
      <p id={styles.container} onClick={() => setMenuShown((prev) => !prev)}>
        {t("logged_in")}
        {menuShown && (
          <span onClick={logout} id={styles.menu}>
            {t("logout")}
          </span>
        )}
      </p>
    </>
  );
};
