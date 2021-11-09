import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import classes from './styles.module.css'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

export const PageRecoverPassword = (props) => {
  const {
    className,
    onClickRecover: onClickRecoverFromProps,
    ...otherProps
  } = props

  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const navigate = useNavigate()
  const onClickBackToLogin = React.useCallback(() => navigate('/'), [navigate])

  const onClickRecover = React.useCallback(async () => {
    setIsSubmitted(() => true)

    if (emailError) return

    onClickRecoverFromProps(email)
  }, [email, emailError, onClickRecoverFromProps])

  React.useEffect(() => {
    setEmailError(() => isEmail(email) ? '' : EMAIL_VALIDATION_ERROR)
  }, [email])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <RecoverPasswordForm
          email={email}
          emailError={isSubmitted ? emailError : undefined}
          onChangeEmail={(e) => setEmail(() => e.target.value)}
          onClickRecover={onClickRecover}
          onClickBackToLogin={onClickBackToLogin}
        />
      </FullPageLayout>
    </div>
  )
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string,
  onClickRecover: PropTypes.func
}

export default PageRecoverPassword
