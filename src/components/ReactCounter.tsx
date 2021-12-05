import { useState } from 'react';

export default function ReactCounter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  const subtract = () => setCount(count - 1);

  return (
    <div id="react" className="counter">
      <button type="button" onClick={subtract}>-</button>
      <pre>{count}</pre>
      <button type="button" onClick={add}>+</button>
    </div>
  );
}