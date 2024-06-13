import { Form } from "react-bootstrap";
import propTypes from "prop-types";

export const Select = ({ children, ...props }) => {
  return <Form.Select {...props}>{children}</Form.Select>;
};

Select.propTypes = {
  children: propTypes.node.isRequired,
};
