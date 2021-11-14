import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { useFormContext } from 'react-hook-form'

import isEmail from 'validator/lib/isEmail'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

import classes from './styles.module.css'

export const LoginForm = (props) => {
  const {
    className,
    onSubmit,
    onClickCreateAccount,
    onClickForgotPassword,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  const registeredPasswordProps = register('password', {
    minLength: {
      value: 6,
      message: PASSWORD_VALIDATION_ERROR
    }
  })

  return (
    <form
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      onSubmit={onSubmit}
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
        errorMessage={errors.email && errors.email.message}
        {...registeredEmailProps}
      />
      <TextField
        className={classes.textField}
        placeholder={'Password'}
        type={'password'}
        errorMessage={errors.password && errors.password.message}
        {...registeredPasswordProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        type={'submit'}
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
    </form>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired
}

export default LoginForm
