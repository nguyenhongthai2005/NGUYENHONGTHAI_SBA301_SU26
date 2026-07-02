import { useCounter } from '../../context/CounterContext'

/**
 * CounterControls.jsx – Các nút điều khiển bộ đếm (Bài 1)
 *
 * Dùng useCounter() để lấy increment, decrement, reset.
 * Render 3 nút: Tăng (+), Giảm (−), Reset.
 */
export default function CounterControls() {
  const { increment, decrement, reset } = useCounter()
  return (
    <div className="counter-controls">
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
