import React from 'react'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import { signIn } from './auth'

export class App extends React.Component {
  state = {
    // global state
    isLoading: false,
    hasError: false,
    errorMessage: '',
    isInfoDisplayed: false,
    infoMessage: '',

    // user/auth state
    isUserLoggedIn: false,
    userDisplayName: '',
    userEmail: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'CREATE-ACCOUNT' or 'RECOVER-PASSWORD'

    // login page state
    loginEmail: '',
    loginEmailError: '',
    loginPassword: '',

    // create account page
    createAccountEmail: '',
    createAccountPassword: '',
    createAccountRepeatPassword: '',

    // recover password page
    recoverPasswordEmail: '',

    // course list page
    courses: null,
    searchPhrase: ''
  }

  onClickLogin = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(this.state.loginEmail, this.state.loginPassword)
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
  }

  render () {
    const {
      loginEmail,
      loginEmailError,
      loginPassword,
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage,
      notLoginUserRoute,
      createAccountEmail,
      createAccountPassword,
      createAccountRepeatPassword,
      recoverPasswordEmail
    } = this.state

    return (
      <div>

        {
          notLoginUserRoute === 'LOGIN' ?
            <FullPageLayout>
              <LoginForm
                email={loginEmail}
                emailError={loginEmailError}
                password={loginPassword}
                onChangeEmail={(e) => {
                  this.setState(() => ({
                    loginEmail: e.target.value,
                    loginEmailError: isEmail(e.target.value) ? '' : 'Please type a valid e-mail!'
                  }))
                }}
                onChangePassword={(e) => this.setState(() => ({ loginPassword: e.target.value }))}
                onClickLogin={this.onClickLogin}
                onClickCreateAccount={() => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))}
                onClickForgotPassword={() => this.setState(() => ({ notLoginUserRoute: 'RECOVER-PASSWORD' }))}
              />
            </FullPageLayout>
            :
            notLoginUserRoute === 'CREATE-ACCOUNT' ?
              <FullPageLayout>
                <CreateAccountForm
                  email={createAccountEmail}
                  password={createAccountPassword}
                  repeatPassword={createAccountRepeatPassword}
                  onChangeEmail={(e) => this.setState(() => ({ createAccountEmail: e.target.value }))}
                  onChangePassword={(e) => this.setState(() => ({ createAccountPassword: e.target.value }))}
                  onChangeRepeatPassword={(e) => this.setState(() => ({ createAccountRepeatPassword: e.target.value }))}
                  onClickCreateAccount={() => console.log('onClickCreateAccount')}
                  onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                />
              </FullPageLayout>
              :
              notLoginUserRoute === 'RECOVER-PASSWORD' ?
                <FullPageLayout>
                  <RecoverPasswordForm
                    email={recoverPasswordEmail}
                    onChangeEmail={(e) => this.setState(() => ({ recoverPasswordEmail: e.target.value }))}
                    onClickRecover={() => console.log('onClickRecover')}
                    onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                  />
                </FullPageLayout>
                :
                null
        }

        {
          isLoading ?
            <FullPageLoader />
            :
            null
        }

        {
          isInfoDisplayed ?
            <FullPageMessage
              message={infoMessage}
              iconVariant={'info'}
              onButtonClick={console.log}
            />
            :
            null
        }

        {
          hasError ?
            <FullPageLayout
              className={'wrapper-class'}
            >
              <Message
                className={'regular-class'}
                message={errorMessage}
                iconVariant={'error'}
                onButtonClick={this.dismissError}
              />
            </FullPageLayout>
            :
            null
        }

      </div>
    )
  }
}

export default App
