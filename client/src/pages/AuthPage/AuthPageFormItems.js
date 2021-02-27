import React from 'react'

import TextField from '@material-ui/core/TextField';


export const EmailInput = ( { onChange, disabled, error, value } ) => <TextField
  value={ value }
  onChange={ onChange }
  disabled={ disabled }
  error={ !!error }
  helperText={ error }
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email"
  name="email"
  autoComplete="email"
  autoFocus
/>

export const PwdInput = ( { onChange, disabled, error, isRepeat, value } ) => <TextField
  value={ value }
  onChange={ onChange }
  disabled={ disabled }
  error={ !!error }
  helperText={ error }
  type="password"
  variant="outlined"
  margin="normal"
  required
  fullWidth
  { ...(
    isRepeat ? {
      name: "repeatPwd",
      label: "Повторите пароль",
      id: "repeatPwd"
    } : {
      name: "password",
      label: "Пароль",
      id: "password",
      autoComplete: "current-password"
    })
  }
/>
