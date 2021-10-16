import React from 'react'
import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import classes from './styles.module.css'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

export const PageLogin = (props) => {
  const {
    className,
    onClickCreateAccount,
    onClickForgotPassword,
    onClickLogin: onClickLoginFromProps,
    ...otherProps
  } = props

  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginEmailError, setLoginEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginPasswordError, setLoginPasswordError] = React.useState(PASSWORD_VALIDATION_ERROR)
  const [loginSubmitted, setLoginSubmitted] = React.useState(false)

  const onClickLogin = React.useCallback(async () => {
    setLoginSubmitted(() => true)

    if (loginEmailError) return
    if (loginPasswordError) return

    onClickLoginFromProps(loginEmail, loginPassword)
  }, [loginEmail, loginEmailError, loginPassword, loginPasswordError, onClickLoginFromProps])

  React.useEffect(() => {
    setLoginEmailError(isEmail(loginEmail) ? '' : EMAIL_VALIDATION_ERROR)
  }, [loginEmail])

  React.useEffect(() => {
    setLoginPasswordError(loginPassword.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR)
  }, [loginPassword])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <LoginForm
          email={loginEmail}
          emailError={loginSubmitted ? loginEmailError : undefined}
          password={loginPassword}
          passwordError={loginSubmitted ? loginPasswordError : undefined}
          onChangeEmail={(e) => setLoginEmail(() => e.target.value)}
          onChangePassword={(e) => setLoginPassword(() => e.target.value)}
          onClickLogin={onClickLogin}
          onClickCreateAccount={onClickCreateAccount}
          onClickForgotPassword={onClickForgotPassword}
        />
      </FullPageLayout>
    </div>
  )
}

PageLogin.propTypes = {
  className: PropTypes.string,
  onClickLogin: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func,
  onClickForgotPassword: PropTypes.func
}

export default PageLogin
