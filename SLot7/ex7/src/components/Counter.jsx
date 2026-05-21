import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <Container className="text-center mt-5">
      <h1>Counter App</h1>

      <h2>{count}</h2>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="success" onClick={increase}>
          Tăng
        </Button>

        <Button variant="danger" onClick={decrease}>
          Giảm
        </Button>

        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
      </div>
    </Container>
  );
}

export default Counter;