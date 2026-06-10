import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

/**
 * Lấy danh sách categories từ API.
 * Endpoint: GET /categories
 *
 * @returns {Promise<Array>} mảng category objects [{ id, name }]
 */
export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/categories`)
  return response.data
}
