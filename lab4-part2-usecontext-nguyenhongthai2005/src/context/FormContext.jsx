/**
 * FormContext.jsx – Context quản lý form đăng ký (Bài 3)
 */
import { createContext, useContext, useReducer } from 'react'
import { formReducer, initialState } from '../reducers/formReducer'

const FormContext = createContext(null)

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === null) {
    throw new Error('useFormContext phải được dùng bên trong FormProvider')
  }
  return context
}

export default FormContext
