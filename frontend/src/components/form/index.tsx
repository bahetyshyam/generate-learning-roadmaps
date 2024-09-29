import React, {
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Form as FormData } from "../../types";
import styles from "./styles.module.css";
import { Input } from "../input";
import { useTranslation } from "react-i18next";
import { Description } from "../description";

type Props = {
  activeForm: ({ idx: number } & FormData) | null;
  allForms: Record<number, FormData>;
  setActiveFormIdx: (activeForm: number | undefined) => any;
  setActiveForm: React.Dispatch<React.SetStateAction<Record<number, FormData>>>;
};

const transitionReducer: Reducer<
  "in" | "out" | undefined,
  "in" | "out" | undefined
> = (_, action) => {
  return action;
};
export const Form: React.FC<Props> = (props) => {
  const { activeForm, allForms, setActiveForm, setActiveFormIdx } = props;
  const [prevForm, setPrevForm] = useState(activeForm);
  const { t } = useTranslation();
  const [transition, setTransition] = useReducer(transitionReducer, undefined);
  const { quest, desc, type } = prevForm || {};

  useEffect(() => {
    let timer: number | undefined = undefined;
    let innerTimer: number | undefined = undefined;
    if (JSON.stringify(activeForm) !== JSON.stringify(prevForm)) {
      setTransition("out");
      timer = setTimeout(() => {
        setPrevForm(activeForm);
        setTransition("in");
        setTimeout(() => setTransition(undefined), 500);
      }, 500);
    }
    return () => {
      timer && clearTimeout(timer);
      innerTimer && clearTimeout(innerTimer);
    };
  }, [prevForm, activeForm]);

  const onSubjectSubmit = (value: string) => {
    if (!activeForm) {
      return;
    }
    const { type } = activeForm;
    if (type !== "string") {
      return;
    }
    const form = {
      ...activeForm,
      value,
    };
    setActiveForm((prevData) => ({
      ...prevData,
      0: form,
      1: {
        ...prevData[1],
        desc: t("questions.expertise_desc", { field: value }),
      },
    }));
    setActiveFormIdx(1);
  };

  const Ratings = useMemo(() => {
    const onClick = (rating: number) => {
      setActiveFormIdx(undefined);
      setActiveForm((prevData) => ({
        ...prevData,
        1: {
          ...prevData[1],
          type: "number",
          value: rating,
        },
      }));
    };
    return (
      <div id={styles.rating_container}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <div className={styles.rating} onClick={onClick.bind(null, rating)}>
            {rating}
          </div>
        ))}
      </div>
    );
  }, []);
  const transitionClasses =
    transition === "out" ? styles.out : transition === "in" ? styles.in : "";
  return (
    <div id={styles.container}>
      <div id={styles.content} className={transitionClasses}>
        {!!prevForm && !transition && (
          <Description formData={allForms} classes={styles.desc} />
        )}
        {quest && <h3 dangerouslySetInnerHTML={{ __html: quest }}></h3>}
        {desc && <p dangerouslySetInnerHTML={{ __html: desc }}></p>}
        {!!prevForm && type === "number" && Ratings}
        {!!prevForm && type === "string" && (
          <Input onSubmit={onSubjectSubmit} />
        )}
        {!prevForm && <Description formData={allForms} showSubmit />}
      </div>
    </div>
  );
};

export default Form;
