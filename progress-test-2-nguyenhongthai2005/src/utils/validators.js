import { MESSAGES } from '../constants/messages'

/**
 * Validate tên restaurant.
 * - Bắt buộc (MS01)
 * - Độ dài tối đa 100 ký tự
 *
 * @param {string} value
 * @returns {string|null} message lỗi hoặc null nếu hợp lệ
 */
export function validateName(value) {
  if (!value || String(value).trim() === '') return MESSAGES.MS01('Restaurant Name')
  if (String(value).trim().length > 100) return 'Restaurant Name must not exceed 100 characters'
  return null
}

/**
 * Validate giá (priceFrom hoặc priceTo).
 * - Bắt buộc (MS01)
 * - Phải là số nguyên
 * - 1000 <= value <= 999999 (MS02)
 *
 * @param {string|number} value
 * @param {string} fieldName  tên field để hiển thị trong message
 * @returns {string|null}
 */
export function validatePrice(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === '') return MESSAGES.MS01(fieldName)
  const num = Number(value)
  if (!Number.isInteger(num) || num < 1000 || num > 999999) return MESSAGES.MS02(fieldName, 1000, 999999)
  return null
}

/**
 * Validate priceTo phải lớn hơn priceFrom.
 *
 * @param {number} priceFrom
 * @param {number} priceTo
 * @returns {string|null}
 */
export function validatePriceRange(priceFrom, priceTo) {
  if (priceTo <= priceFrom) return "Price to must be greater than Price from"
  return null
}

/**
 * Validate Open Date.
 * - Bắt buộc (MS01)
 * - Định dạng yyyy-MM-dd (MS03)
 * - Không được là ngày tương lai (MS06)
 *
 * @param {string} value  chuỗi ngày dạng "yyyy-MM-dd"
 * @returns {string|null}
 */
export function validateOpenDate(value) {
  if (!value || String(value).trim() === '') return MESSAGES.MS01('Open Date')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return MESSAGES.MS03
  const d = new Date(value)
  if (isNaN(d.getTime())) return MESSAGES.MS03
  
  const todayStr = new Date().toISOString().split('T')[0]
  if (value > todayStr) return MESSAGES.MS06
  return null
}

/**
 * Validate Owner name.
 * - Bắt buộc (MS01)
 * - Độ dài tối đa 100 ký tự
 *
 * @param {string} value
 * @returns {string|null}
 */
export function validateOwner(value) {
  if (!value || String(value).trim() === '') return MESSAGES.MS01('Owner name')
  if (String(value).trim().length > 100) return 'Owner name must not exceed 100 characters'
  return null
}

/**
 * Validate Address.
 * - Bắt buộc (MS01)
 * - Độ dài tối đa 100 ký tự
 *
 * @param {string} value
 * @returns {string|null}
 */
export function validateAddress(value) {
  if (!value || String(value).trim() === '') return MESSAGES.MS01('Address')
  if (String(value).trim().length > 100) return 'Address must not exceed 100 characters'
  return null
}

/**
 * Validate Category.
 * - Bắt buộc (MS01)
 *
 * @param {string} value
 * @returns {string|null}
 */
export function validateCategory(value) {
  if (!value || String(value).trim() === '') return MESSAGES.MS01('Category')
  return null
}

/**
 * Validate toàn bộ form AddNew.
 * Trả về object errors { name, priceFrom, priceTo, priceRange, owner, openDate, address, category }
 * Mỗi trường là null (hợp lệ) hoặc string message lỗi.
 *
 * @param {object} formData
 * @returns {object} errors
 */
export function validateRestaurantForm(formData) {
  const errors = {}
  errors.name = validateName(formData.name)
  errors.priceFrom = validatePrice(formData.priceFrom, 'Price from')
  errors.priceTo = validatePrice(formData.priceTo, 'Price to')
  errors.priceRange = validatePriceRange(Number(formData.priceFrom), Number(formData.priceTo))
  errors.owner = validateOwner(formData.owner)
  errors.openDate = validateOpenDate(formData.openDate)
  errors.address = validateAddress(formData.address)
  errors.category = validateCategory(formData.category)
  return errors
}
