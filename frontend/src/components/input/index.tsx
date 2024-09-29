import React, { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import styles from "./styles.module.css";
import { IoArrowUpSharp } from "react-icons/io5";
type Props = {
  onSubmit: (value: string) => any;
};

export const Input: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(true);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    setValue(target.value);
  };

  const onFocused = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const submit: React.MouseEventHandler = () => {
    !!value && onSubmit(value);
  };

  const keyDownHandler: React.KeyboardEventHandler = (e) => {
    const { key } = e;
    !!value && key === "Enter" && onSubmit(value);
  };

  return (
    <>
      <div data-focused={focused} id={styles.container}>
        <input
          type="text"
          value={value}
          autoFocus
          onChange={onChange}
          onFocus={onFocused}
          onBlur={onBlur}
          onKeyDown={keyDownHandler}
        />
        <div
          onClick={submit}
          className={styles.icon_container}
          data-disabled={!value}
        >
          <IoArrowUpSharp className={styles.icon} />
        </div>
      </div>
    </>
  );
};
