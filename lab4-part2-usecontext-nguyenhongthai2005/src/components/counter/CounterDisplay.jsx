import { useCounter } from '../../context/CounterContext'

/**
 * CounterDisplay.jsx – Hiển thị giá trị đếm hiện tại (Bài 1)
 *
 * Dùng useCounter() để lấy count và hiển thị.
 */
export default function CounterDisplay() {
  const { count } = useCounter()
  return <div className="counter-display">Giá trị: <span>{count}</span></div>
}
