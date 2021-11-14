import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import isEmail from 'validator/lib/isEmail'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

import classes from './styles.module.css'

export const CreateAccountForm = (props) => {
  const {
    className,
    onSubmit,
    onClickBackToLogin,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors }, watch } = methods

  const password = watch('password')

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  const registeredPasswordProps = register('password', {
    required: {
      value: true,
      message: PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: PASSWORD_VALIDATION_ERROR
    }
  })

  const registeredRepeatPasswordProps = register('repeatPassword', {
    required: {
      value: true,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    validate: (repeatPassword) => repeatPassword === password || REPEAT_PASSWORD_VALIDATION_ERROR
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
        Create new account
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
      <TextField
        className={classes.textField}
        placeholder={'Repeat password'}
        type={'password'}
        errorMessage={errors.repeatPassword && errors.repeatPassword.message}
        {...registeredRepeatPasswordProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        type={'submit'}
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
    </form>
  )
}

CreateAccountForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default CreateAccountForm
