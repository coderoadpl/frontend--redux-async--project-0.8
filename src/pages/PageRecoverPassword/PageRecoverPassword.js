import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import { sendPasswordResetEmail } from '../../auth'

import { createActionSetInfo } from '../../state/loaders'

import classes from './styles.module.css'
import { handleAsyncAction } from '../../handleAsyncAction'

export const PageRecoverPassword = (props) => {
  const {
    className,
    ...otherProps
  } = props
  const dispatch = useDispatch()

  const methods = useForm()
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const onClickBackToLogin = React.useCallback(() => navigate('/'), [navigate])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      dispatch(createActionSetInfo('Check your inbox!'))
    }, 'Recovering password...')
  }, [dispatch])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <FormProvider
          {...methods}
        >
          <RecoverPasswordForm
            onSubmit={handleSubmit((data) => onClickRecover(data.email))}
            onClickBackToLogin={onClickBackToLogin}
          />
        </FormProvider>
      </FullPageLayout>
    </div>
  )
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string
}

export default PageRecoverPassword
