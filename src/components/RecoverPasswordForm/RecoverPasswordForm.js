import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { useFormContext } from 'react-hook-form'

import isEmail from 'validator/lib/isEmail'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

import classes from './styles.module.css'

export const RecoverPasswordForm = (props) => {
  const {
    className,
    onClickBackToLogin,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  return (
    <form
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
        errorMessage={errors.email && errors.email.message}
        {...registeredEmailProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        type={'submit'}
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
    </form>
  )
}

RecoverPasswordForm.propTypes = {
  className: PropTypes.string,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default RecoverPasswordForm
