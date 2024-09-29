import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
import { useTranslation } from "react-i18next";
import { Form as FormData } from "../../types";
import Form from "../../components/form";
import { TreeNode } from "../../types/TreeNode";
import Tree from "react-d3-tree";
import { RoadmapTree } from "../../components/roadmap_tree";

export const Main: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { t } = useTranslation();
  const [form, setForm] = useState<Record<number, FormData>>({
    0: {
      quest: t("questions.subject"),
      desc: t("questions.subject_desc"),
      type: "string",
    },
    1: {
      quest: t("questions.expertise"),
      desc: t("questions.expertise_desc"),
      type: "number",
    },
  });
  const [activeForm, setActiveForm] = useState<number | undefined>(0);
  const [activeRoadMap, setActiveRoadMap] = useState<{
    id: string;
    data: TreeNode;
  } | null>(null);

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
        {!activeRoadMap && (
          <Form
            activeForm={
              typeof activeForm !== "undefined"
                ? { ...form[activeForm], idx: activeForm }
                : null
            }
            setActiveFormIdx={setActiveForm}
            setActiveForm={setForm}
            allForms={form}
            setActiveRoadmap={setActiveRoadMap}
          />
        )}
        {activeRoadMap && activeRoadMap.data && (
          <RoadmapTree roadmap={activeRoadMap.data} />
        )}
      </div>
      <div
        id={styles.inactive_overlay}
        data-sidebar-active={sidebarActive}
        onClick={closeSidebar}
      ></div>
      <Sidebar
        active={sidebarActive}
        close={closeSidebar}
        activeRoadmap={(activeRoadMap && activeRoadMap.id) || ""}
        setActiveRoadmap={setActiveRoadMap}
      />
    </>
  );
};
