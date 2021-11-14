import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import classes from './styles.module.css'

export const PageLogin = (props) => {
  const {
    className,
    onClickLogin,
    ...otherProps
  } = props

  const methods = useForm()
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const onClickCreateAccount = React.useCallback(() => navigate('/create-account'), [navigate])
  const onClickForgotPassword = React.useCallback(() => navigate('/recover-password'), [navigate])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <FormProvider
          {...methods}
        >
          <LoginForm
            onSubmit={handleSubmit((data) => onClickLogin(data.email, data.password))}
            onClickCreateAccount={onClickCreateAccount}
            onClickForgotPassword={onClickForgotPassword}
          />
        </FormProvider>
      </FullPageLayout>
    </div>
  )
}

PageLogin.propTypes = {
  className: PropTypes.string,
  onClickLogin: PropTypes.func.isRequired
}

export default PageLogin
