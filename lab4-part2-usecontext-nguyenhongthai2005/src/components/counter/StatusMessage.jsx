import { useCounter } from '../../context/CounterContext'

/**
 * StatusMessage.jsx – Hiển thị trạng thái dương / âm / bằng 0 (Bài 1)
 *
 * Dùng useCounter() để lấy count.
 * Hiển thị:
 *   - "Dương" khi count > 0
 *   - "Âm"    khi count < 0
 *   - "Bằng 0" khi count = 0
 */
export default function StatusMessage() {
  const { count } = useCounter()

  let status
  if (count > 0) {
    status = 'Dương'
  } else if (count < 0) {
    status = 'Âm'
  } else {
    status = 'Bằng 0'
  }

  return <div className="status-message">Trạng thái: {status}</div>
}
