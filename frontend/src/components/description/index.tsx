import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { createRoadmap } from "../../api";
import { Form } from "../../types";
import styles from "./styles.module.css";
import { AppContext } from "../../contexts/AppContext";
import { TreeNode } from "../../types/TreeNode";

type Props = {
  formData: Record<number, Form>;
  showSubmit?: boolean;
  classes?: string;
  setActiveRoadmap?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      data: TreeNode;
    } | null>
  >;
};

export const Description = (props: Props) => {
  const { t } = useTranslation();
  const { formData, showSubmit, classes, setActiveRoadmap } = props;
  const inputs = Object.values(formData);
  const { userInfo, setLoading } = useContext(AppContext) || {};
  const { userId } = userInfo || {};
  const shouldRender = inputs?.some((data) => data.value);
  const generateRoadmap = async () => {
    if (!userId) {
      return;
    }
    setLoading && setLoading(true);
    const res = await createRoadmap(userId, formData);
    setLoading && setLoading(false);
    setActiveRoadmap &&
      setActiveRoadmap({ id: res.roadmap.id, data: res.roadmap.roadmap_json });
  };
  return (
    (shouldRender && (
      <div id={styles.container} className={classes}>
        <table id={styles.qa_container}>
          <tbody>
            {inputs.map((data) => {
              const { quest, value } = data;
              return (
                typeof value !== "undefined" && (
                  <tr>
                    <td>{quest.split(".")[0]}</td>
                    <th>{value}</th>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        {showSubmit && (
          <button id={styles.submit} onClick={generateRoadmap}>
            {t("generate_roadmap")}
          </button>
        )}
      </div>
    )) || <></>
  );
};
