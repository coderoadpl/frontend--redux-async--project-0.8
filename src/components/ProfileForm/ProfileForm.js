import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'
import FileInput from '../FileInput'
import Avatar from '../Avatar'

import { FIELD_IS_REQUIRED_VALIDATION_ERROR } from '../../consts'

import classes from './styles.module.css'

export const ProfileForm = (props) => {
  const {
    className,
    avatarSrc,
    onAvatarChange,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email')
  const registeredDisplayNameProps = register('displayName', {
    required: {
      value: true,
      message: FIELD_IS_REQUIRED_VALIDATION_ERROR
    }
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
      <Avatar
        className={classes.avatar}
        src={avatarSrc}
      />
      <FileInput
        className={classes.button}
        variant={'text'}
        color={'primary'}
        onChange={(e) => onAvatarChange(e.target.files[0])}
      >
        Change avatar
      </FileInput>
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
  className: PropTypes.string,
  avatarSrc: PropTypes.string,
  onAvatarChange: PropTypes.func.isRequired
}

export default ProfileForm
