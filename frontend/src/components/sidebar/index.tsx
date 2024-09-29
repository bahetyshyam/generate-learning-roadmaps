import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./styles.module.css";
import { GoPlus, GoSidebarExpand } from "react-icons/go";
import { AppContext } from "../../contexts/AppContext";
import { RoadMapSummary } from "../../types";
import { getRoadmapById, getUserRoadmaps } from "../../api";
import { BsArrowRight } from "react-icons/bs";
import { TreeNode } from "../../types/TreeNode";

type Props = {
  active?: boolean;
  activeRoadmap?: string;
  setActiveRoadmap: (roadmap: { id: string; data: TreeNode } | null) => any;
  close: () => any;
};

export const Sidebar: React.FC<Props> = (props) => {
  const { active, activeRoadmap, close, setActiveRoadmap } = props;
  const { userInfo } = useContext(AppContext) || {};
  const { userId } = userInfo || {};
  let locallyStoredRoadMaps: RoadMapSummary[] = [];
  if (userId) {
    locallyStoredRoadMaps =
      (JSON.parse(
        localStorage.getItem(userId.toString()) || "[]"
      ) as RoadMapSummary[]) || [];
  }
  const [recentRoadMaps, setRecentRoadMaps] = useState(locallyStoredRoadMaps);

  const createNew = useCallback(() => {
    setActiveRoadmap(null);
    close();
  }, [setActiveRoadmap, close]);

  useEffect(() => {
    userId &&
      getUserRoadmaps(userId).then((summaries) => {
        summaries && setRecentRoadMaps(summaries);
      });
  }, [userId]);
  const Controls = useMemo(() => {
    return (
      <div id={styles.controls}>
        <GoSidebarExpand onClick={close} className={styles.sidebar_icon} />
        <GoPlus className={styles.sidebar_icon} onClick={createNew} />
      </div>
    );
  }, [close]);

  const List = useMemo(() => {
    return (
      <ul>
        {recentRoadMaps?.map((summary) => {
          const { expertise, topic, roadmap } = summary || {};
          const onClick = async () => {
            const res = await getRoadmapById(roadmap);
            res &&
              setActiveRoadmap({
                id: res.id,
                data: res.roadmap_json,
              });
            res && close();
          };
          return (
            <li
              key={`${topic}_${expertise}`}
              data-selected={roadmap === activeRoadmap}
              onClick={onClick}
            >
              <p>{topic}</p>
              <div className={styles.path}>
                <p>{expertise}</p>
                <BsArrowRight className={styles.path_icon} />
                EXPERT
              </div>
            </li>
          );
        })}
      </ul>
    );
  }, [recentRoadMaps, activeRoadmap, setActiveRoadmap, close]);
  return (
    <div data-open={active} id={styles.container}>
      {Controls}
      {List}
    </div>
  );
};
