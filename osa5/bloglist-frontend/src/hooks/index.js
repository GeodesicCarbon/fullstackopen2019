import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // Jätetään reset pois lomakkeita varten
  const input = { type, value, onChange }

  return {
    type,
    value,
    reset,
    onChange,
    input
  }
}
