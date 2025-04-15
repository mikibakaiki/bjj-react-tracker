import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./DarkModeToggle.css";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  onToggle,
}) => {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
  );
};

export default DarkModeToggle;
