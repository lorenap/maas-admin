import React from 'react'

export const success = {
  title: '',
  message: '',
  buttons: []
}

export const SuccessContext = React.createContext({
  success,
  handleSuccessProps: () => { }
})
