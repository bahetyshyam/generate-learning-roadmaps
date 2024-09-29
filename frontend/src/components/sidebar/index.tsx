import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { GoPlus, GoSidebarExpand } from "react-icons/go";
import { AppContext } from "../../contexts/AppContext";
import { RoadMapSummary } from "../../types";
import { getUserRoadmaps } from "../../api";
import { BsArrowRight } from "react-icons/bs";

type Props = {
  active?: boolean;
  activeRoadmap?: string;
  // setActiveRoadmap: (roadmap: string) => any; TODO
  close: () => any;
};

export const Sidebar: React.FC<Props> = (props) => {
  const { active, activeRoadmap, close } = props;
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
        <GoPlus className={styles.sidebar_icon} />
      </div>
    );
  }, [close]);

  const List = useMemo(() => {
    return (
      <ul>
        {recentRoadMaps?.map((summary) => {
          const { expertise, topic, roadmap } = summary || {};
          return (
            <li
              key={`${topic}_${expertise}`}
              data-selected={roadmap === activeRoadmap}
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
  }, [recentRoadMaps]);
  return (
    <div data-open={active} id={styles.container}>
      {Controls}
      {List}
    </div>
  );
};
