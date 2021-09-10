import React from 'react'
import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import classes from './styles.module.css'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

export class PageRecoverPassword extends React.Component {
  state = {
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false
  }

  onClickRecover = async () => {
    this.setState(() => ({ recoverPasswordSubmitted: true }))

    if (this.state.recoverPasswordEmailError) return

    this.props.onClickRecover(this.state.recoverPasswordEmail)
  }

  render () {
    const {
      className,
      onClickBackToLogin,
      ...otherProps
    } = this.props

    const {
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted
    } = this.state

    return (
      <div
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <FullPageLayout>
          <RecoverPasswordForm
            email={recoverPasswordEmail}
            emailError={recoverPasswordSubmitted ? recoverPasswordEmailError : undefined}
            onChangeEmail={(e) => this.setState(() => ({
              recoverPasswordEmail: e.target.value,
              recoverPasswordEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
            }))}
            onClickRecover={this.onClickRecover}
            onClickBackToLogin={onClickBackToLogin}
          />
        </FullPageLayout>
      </div>
    )
  }
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string,
  onClickBackToLogin: PropTypes.func,
  onClickRecover: PropTypes.func
}

export default PageRecoverPassword
