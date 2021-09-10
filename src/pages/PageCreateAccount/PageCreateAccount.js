import React from 'react'
import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import CreateAccountForm from '../../components/CreateAccountForm'

import classes from './styles.module.css'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

export class PageCreateAccount extends React.Component {
  state = {
    createAccountEmail: '',
    createAccountEmailError: EMAIL_VALIDATION_ERROR,
    createAccountPassword: '',
    createAccountPasswordError: PASSWORD_VALIDATION_ERROR,
    createAccountRepeatPassword: '',
    createAccountRepeatPasswordError: REPEAT_PASSWORD_VALIDATION_ERROR,
    createAccountSubmitted: false
  }

  onClickCreateAccount = async () => {
    this.setState(() => ({ createAccountSubmitted: true }))

    if (this.state.createAccountEmailError) return
    if (this.state.createAccountPasswordError) return
    if (this.state.createAccountRepeatPasswordError) return

    this.props.onClickCreateAccount(this.state.createAccountEmail, this.state.createAccountPassword)
  }

  render () {
    const {
      className,
      onClickBackToLogin,
      ...otherProps
    } = this.props

    const {
      createAccountEmail,
      createAccountEmailError,
      createAccountPassword,
      createAccountPasswordError,
      createAccountRepeatPassword,
      createAccountRepeatPasswordError,
      createAccountSubmitted
    } = this.state

    return (
      <div
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <FullPageLayout>
          <CreateAccountForm
            email={createAccountEmail}
            emailError={createAccountSubmitted ? createAccountEmailError : undefined}
            password={createAccountPassword}
            passwordError={createAccountSubmitted ? createAccountPasswordError : undefined}
            repeatPassword={createAccountRepeatPassword}
            repeatPasswordError={createAccountSubmitted ? createAccountRepeatPasswordError : undefined}
            onChangeEmail={(e) => this.setState(() => ({
              createAccountEmail: e.target.value,
              createAccountEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
            }))}
            onChangePassword={(e) => this.setState(() => ({
              createAccountPassword: e.target.value,
              createAccountPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR,
              createAccountRepeatPasswordError: createAccountRepeatPassword === e.target.value ? '' : REPEAT_PASSWORD_VALIDATION_ERROR
            }))}
            onChangeRepeatPassword={(e) => this.setState(() => ({
              createAccountRepeatPassword: e.target.value,
              createAccountRepeatPasswordError: createAccountPassword === e.target.value ? '' : REPEAT_PASSWORD_VALIDATION_ERROR
            }))}
            onClickCreateAccount={this.onClickCreateAccount}
            onClickBackToLogin={onClickBackToLogin}
          />
        </FullPageLayout>
      </div>
    )
  }
}

PageCreateAccount.propTypes = {
  className: PropTypes.string,
  onClickCreateAccount: PropTypes.func,
  onClickBackToLogin: PropTypes.func
}

export default PageCreateAccount
