import Alert from "react-bootstrap/Alert";

function CustomAlert({ message, variant }) {
  return (
    <Alert
      variant={variant}
      className="text-center fw-bold"
    >
      {message}
    </Alert>
  );
}

export default CustomAlert;