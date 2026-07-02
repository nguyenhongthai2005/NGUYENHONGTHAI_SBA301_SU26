/**
 * formReducer.js – Reducer quản lý form đăng ký (Bài 3)
 */
import { validateField } from '../utils/validators'

const FIELDS = ['fullName', 'email', 'password', 'confirmPassword']

export const initialState = {
  values: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  touched: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { field, value } = action
      const newValues = { ...state.values, [field]: value }
      const newErrors = { ...state.errors }

      // Nếu field đã touched thì validate lại
      if (state.touched[field]) {
        newErrors[field] = validateField(field, value, newValues)
      }

      // Nếu thay đổi password và confirmPassword đã touched → validate lại confirmPassword
      if (field === 'password' && state.touched.confirmPassword) {
        newErrors.confirmPassword = validateField('confirmPassword', newValues.confirmPassword, newValues)
      }

      return {
        ...state,
        values: newValues,
        errors: newErrors,
      }
    }

    case 'BLUR': {
      const { field } = action
      const newTouched = { ...state.touched, [field]: true }
      const newErrors = {
        ...state.errors,
        [field]: validateField(field, state.values[field], state.values),
      }
      return {
        ...state,
        touched: newTouched,
        errors: newErrors,
      }
    }

    case 'VALIDATE_ALL': {
      const newTouched = {}
      const newErrors = {}
      FIELDS.forEach((field) => {
        newTouched[field] = true
        newErrors[field] = validateField(field, state.values[field], state.values)
      })
      return {
        ...state,
        touched: newTouched,
        errors: newErrors,
      }
    }

    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      }
    }

    case 'RESET': {
      return initialState
    }

    default:
      return state
  }
}

export default formReducer
