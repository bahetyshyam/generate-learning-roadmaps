import React from "react";
import { TreeNode } from "../../types/TreeNode";
import Tree from "react-d3-tree";
import { mapRoadmapToD3 } from "./mapper";

type Props = {
  roadmap: TreeNode;
};

export const RoadmapTree = (props: Props) => {
  const { roadmap } = props;
  //   const [translate, containerRef] = useCenteredTree();
  //   const nodeSize = { x: 200, y: 200 };
  const treeData = mapRoadmapToD3(roadmap);
  return (
    <>
      <Tree
        orientation="vertical"
        zoomable
        draggable
        data={treeData}
        collapsible={false}
        renderCustomNodeElement={({ nodeDatum }) => {
          const { name } = nodeDatum;
          return (
            <g>
              <circle r={15} />
              <foreignObject>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "blue",
                  }}
                >
                  {name}
                </div>
              </foreignObject>
            </g>
            // <g>
            //   {/* Render the rect with rounded corners */}
            //   <rect
            //     width={100}
            //     height={15}
            //     // x={-rectWidth / 2} // Center the rect on the node's x-axis
            //     // y={-rectHeight / 2} // Center the rect on the node's y-axis
            //     rx="1rem" // Border radius equivalent to 1rem
            //     ry="1rem"
            //     fill="#89CFF0" // Background color of the rect
            //     stroke="#333" // Border color
            //     strokeWidth="2"
            //     // onClick={toggleNode} // Allows collapsing/expanding the node on click
            //   />

            //   {/* Render the name of the node centered on the rect */}
            //   <text
            //     x="0" // Center text horizontally
            //     y="5" // Center text vertically (adjust to position text properly within the rect)
            //     textAnchor="middle" // Text horizontal centering
            //     alignmentBaseline="middle" // Text vertical centering
            //     style={{ fontSize: "14px", fill: "#000" }} // Text styling
            //   >
            //     {name}
            //   </text>
            // </g>
          );
        }}
      />
    </>
  );
};
