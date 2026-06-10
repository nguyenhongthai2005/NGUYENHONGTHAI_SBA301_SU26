import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const originalSetup = userEvent.setup
userEvent.setup = (options) => originalSetup({ ...options, delay: null })
