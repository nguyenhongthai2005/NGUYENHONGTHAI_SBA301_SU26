/**
 * Ex03ValidationPage.jsx – Trang bài 3: Validation Form
 */
import { FormProvider } from '../context/FormContext'
import RegistrationForm from '../components/form/RegistrationForm'

export default function Ex03ValidationPage() {
  return (
    <FormProvider>
      <RegistrationForm />
    </FormProvider>
  )
}
