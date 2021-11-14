import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const ProfileForm = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email')
  const registeredDisplayNameProps = register('displayName', {
    required: true
  })

  return (
    <form
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <Typography
        className={classes.header}
        variant={'h1'}
      >
        User profile
      </Typography>
      <TextField
        className={classes.textField}
        disabled={true}
        placeholder={'E-mail (read-only)'}
        errorMessage={errors.email && errors.email.message}
        {...registeredEmailProps}
      />
      <TextField
        className={classes.textField}
        placeholder={'First name and last name'}
        errorMessage={errors.displayName && errors.displayName.message}
        {...registeredDisplayNameProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        type={'submit'}
      >
        SAVE CHANGES
      </Button>
    </form>
  )
}

ProfileForm.propTypes = {
  className: PropTypes.string
}

export default ProfileForm
