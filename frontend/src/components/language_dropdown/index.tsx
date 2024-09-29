import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { languageCodeMap } from "../../constants";
import { LanguageContext } from "../../contexts/LanguageContext";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const languageContext = useContext(LanguageContext);
  const { language, setLanguage } = languageContext;

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const renderLanguage = (code: string) => {
    return Object.keys(languageCodeMap).find(
      (language) => languageCodeMap[language] === code
    );
  };

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {language ? renderLanguage(language) : "Select Language"}
      </button>
      {open && (
        <div className={styles.dropdownContent}>
          {Object.entries(languageCodeMap).map(([language, code]) => (
            <a
              key={code}
              href={`#${code}`}
              onClick={() => {
                setLanguage(code);
                setOpen(false); // Close the dropdown after selecting a language
              }}
            >
              {language}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
