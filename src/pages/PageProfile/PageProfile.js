import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import Logo from '../../components/Logo'
import Button from '../../components/Button'
import ProfileForm from '../../components/ProfileForm'
import MainLayout from '../../templates/MainLayout'

import { useAuthUser } from '../../contexts/UserContext'

import classes from './styles.module.css'

export const PageProfile = (props) => {
  const {
    className,
    onSaveChanges,
    onAvatarChange,
    ...otherProps
  } = props

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  const methods = useForm({
    defaultValues: {
      email: userEmail,
      displayName: userDisplayName
    }
  })
  const { reset, handleSubmit } = methods

  React.useEffect(() => {
    reset({
      email: userEmail,
      displayName: userDisplayName
    })
  }, [userDisplayName, userEmail, reset])

  const navigate = useNavigate()
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <MainLayout
        contentAppBar={
          <>
            <Logo
              className={classes.logo}
            />
            <Button
              onClick={onClickGoBack}
            >
              GO BACK
            </Button>
          </>
        }
        contentMain={
          <FormProvider
            {...methods}
          >
            <ProfileForm
              avatarSrc={userAvatar}
              onAvatarChange={(file) => onAvatarChange(file)}
              onSubmit={handleSubmit(async (data) => {
                await onSaveChanges(data.displayName)
                onClickGoBack()
              })}
            />
          </FormProvider>
        }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string,
  onSaveChanges: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired
}

export default PageProfile
