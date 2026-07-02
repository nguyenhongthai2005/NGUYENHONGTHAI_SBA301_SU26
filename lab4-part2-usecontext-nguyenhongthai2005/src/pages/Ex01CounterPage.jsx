import { CounterProvider } from '../context/CounterContext'
import CounterDisplay from '../components/counter/CounterDisplay'
import CounterControls from '../components/counter/CounterControls'
import StatusMessage from '../components/counter/StatusMessage'

/**
 * Ex01CounterPage.jsx – Trang bài 1: Counter
 *
 * Bọc toàn bộ nội dung trong <CounterProvider>.
 * Render các component: CounterDisplay, CounterControls, StatusMessage
 */
export default function Ex01CounterPage() {
  return (
    <CounterProvider>
      <div className="ex01-counter-page">
        <h1>Bài 1 – Counter</h1>
        <CounterDisplay />
        <CounterControls />
        <StatusMessage />
      </div>
    </CounterProvider>
  )
}
