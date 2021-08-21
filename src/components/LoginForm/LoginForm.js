import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const LoginForm = (props) => {
  const {
    className,
    email,
    emailError,
    password,
    passwordError,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    onClickCreateAccount,
    onClickForgotPassword,
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
        Log in 👋
      </Typography>
      <TextField
        className={classes.textField}
        placeholder={'E-mail'}
        value={email}
        errorMessage={emailError}
        onChange={onChangeEmail}
      />
      <TextField
        className={classes.textField}
        placeholder={'Password'}
        type={'password'}
        value={password}
        errorMessage={passwordError}
        onChange={onChangePassword}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        onClick={onClickLogin}
      >
        LOGIN
      </Button>
      <Button
        className={classes.button}
        variant={'contained'}
        color={'secondary'}
        onClick={onClickCreateAccount}
      >
        CREATE ACCOUNT
      </Button>
      <Button
        className={classes.button}
        variant={'text'}
        onClick={onClickForgotPassword}
      >
        FORGOT PASSWORD
      </Button>
    </div>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired
}

export default LoginForm
