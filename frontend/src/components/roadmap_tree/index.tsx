import React from "react";
import { ResourceTask, TreeNode } from "../../types/TreeNode";
import Tree from "react-d3-tree";
import { mapRoadmapToD3 } from "./mapper";
import { useCenteredTree } from "./useCenteredTree";
import styles from "./styles.module.css";
import { Sidebar } from "../sidebar";
import { SubTaskList } from "../subtask_list";

type Props = {
  roadmap: TreeNode;
};

export const RoadmapTree = (props: Props) => {
  const { roadmap } = props;
  const [translate, containerRef] = useCenteredTree();
  const [resourceTask, setResourceTaskList] = React.useState<ResourceTask[]>(
    []
  );
  const [showSubTaskList, setShowSubTaskList] = React.useState(false);
  const nodeSize = { x: 200, y: 200 };
  const treeData = mapRoadmapToD3(roadmap);
  return (
    // @ts-ignore
    <div style={{ flex: 1 }} ref={containerRef}>
      <Tree
        orientation="vertical"
        zoomable
        draggable
        // @ts-ignore
        translate={translate}
        nodeSize={nodeSize}
        data={treeData}
        collapsible={false}
        onNodeClick={(nodeData) => {
          console.log(nodeData);
        }}
        separation={{
          siblings: 3,
          nonSiblings: 3,
        }}
        pathClassFunc={() => styles.link}
        renderCustomNodeElement={({ nodeDatum }) => {
          const { name, attributes } = nodeDatum;
          return (
            <g
              onClick={() => {
                setResourceTaskList(attributes.resourceTasks as ResourceTask[]);
                setShowSubTaskList(true);
              }}
            >
              <rect
                width={"20vmax"}
                height={"10vmax"}
                x={"-10vmax"}
                y={"-5vmax"}
                stroke="white"
                rx={"1rem"}
                ry={"1rem"}
                fill="#242424"
              />
              <text
                fill="white"
                stroke="white"
                x={"0vmax"}
                y={"0vmax"}
                textAnchor="middle" // Text horizontal centering
                alignmentBaseline="middle"
              >
                {name}
              </text>
            </g>
          );
        }}
      />
      {showSubTaskList && (
        <SubTaskList
          active={showSubTaskList}
          close={() => setShowSubTaskList(false)}
          resourceTaskList={resourceTask}
        />
      )}
    </div>
  );
};
