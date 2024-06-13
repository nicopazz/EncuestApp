import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import styles from "./FormCard.module.css";

export const FormCard = ({ children }) => {
  return <Card className={`${styles.formCard}`}>{children}</Card>;
};

FormCard.propTypes = {
  children: propTypes.node.isRequired,
};
