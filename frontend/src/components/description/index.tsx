import { Form } from "../../types";
import styles from "./styles.module.css";

type Props = {
  formData: Record<number, Form>;
  showSubmit?: boolean;
  classes?: string;
};

export const Description = (props: Props) => {
  const { formData, showSubmit, classes } = props;
  const inputs = Object.values(formData);
  const shouldRender = inputs?.some((data) => data.value);
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
        {showSubmit && <button id={styles.submit}>Create Roadmap</button>}
      </div>
    )) || <></>
  );
};
