import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const CreateAccountForm = (props) => {
  const {
    className,
    email,
    password,
    repeatPassword,
    onChangeEmail,
    onChangePassword,
    onChangeRepeatPassword,
    onClickCreateAccount,
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
        Create new account
      </Typography>
      <TextField
        className={classes.textField}
        placeholder={'E-mail'}
        value={email}
        onChange={onChangeEmail}
      />
      <TextField
        className={classes.textField}
        placeholder={'Password'}
        type={'password'}
        value={password}
        onChange={onChangePassword}
      />
      <TextField
        className={classes.textField}
        placeholder={'Repeat password'}
        type={'password'}
        value={repeatPassword}
        onChange={onChangeRepeatPassword}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        onClick={onClickCreateAccount}
      >
        CREATE ACCOUNT
      </Button>
      <Button
        className={classes.button}
        variant={'text'}
        onClick={onClickBackToLogin}
      >
        BACK TO LOGIN
      </Button>
    </div>
  )
}

CreateAccountForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeRepeatPassword: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default CreateAccountForm
