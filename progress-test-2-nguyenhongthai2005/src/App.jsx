import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import RestaurantListPage from './pages/RestaurantListPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import AddNewRestaurantPage from './pages/AddNewRestaurantPage'

/**
 * ProtectedRoute — chỉ cho phép truy cập khi đã đăng nhập.
 * Nếu chưa đăng nhập → redirect về /login.
 */
function ProtectedRoute({ children }) {
  const { state } = useAuth()
  return state.isAuthenticated ? children : <Navigate to="/login" replace />
}

/**
 * App — cấu hình routing toàn ứng dụng.
 *
 * Routes:
 *   /login              → LoginPage (public)
 *   /                   → RestaurantListPage (protected)
 *   /restaurants/add    → AddNewRestaurantPage (protected)
 *   /restaurants/:id    → RestaurantDetailPage (protected)
 *   *                   → redirect về /
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RestaurantListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/add"
          element={
            <ProtectedRoute>
              <AddNewRestaurantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <ProtectedRoute>
              <RestaurantDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
