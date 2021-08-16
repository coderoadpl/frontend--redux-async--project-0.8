import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const RecoverPasswordForm = (props) => {
  const {
    className,
    email,
    onChangeEmail,
    onClickRecover,
    onClickBackToLogin,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <Logo
        className={classes.logo}
      />
      <Typography
        className={classes.header}
        variant={'h1'}
      >
        Recover password
      </Typography>
      <TextField
        className={classes.textField}
        placeholder={'E-mail'}
        value={email}
        onChange={onChangeEmail}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        onClick={onClickRecover}
      >
        RECOVER
      </Button>
      <Button
        className={classes.button}
        variant={'text'}
        onClick={onClickBackToLogin}
      >
        ️BACK TO LOGIN
      </Button>
    </div>
  )
}

RecoverPasswordForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onClickRecover: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default RecoverPasswordForm
