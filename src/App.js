import React from 'react'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Message from './components/Message'
import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'

import { getAll as getAllCourses } from './api/courses'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from './consts'

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

    // create account page
    createAccountEmail: '',
    createAccountEmailError: EMAIL_VALIDATION_ERROR,
    createAccountPassword: '',
    createAccountPasswordError: PASSWORD_VALIDATION_ERROR,
    createAccountRepeatPassword: '',
    createAccountRepeatPasswordError: REPEAT_PASSWORD_VALIDATION_ERROR,
    createAccountSubmitted: false,

    // recover password page
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false,

    // courses
    courses: null
  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    this.setState(() => ({ isLoading: false }))
    if (userIsLoggedIn) this.onUserLogin()
  }

  onClickLogin = async (email, password) => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(email, password)
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickCreateAccount = async () => {
    this.setState(() => ({ createAccountSubmitted: true }))

    if (this.state.createAccountEmailError) return
    if (this.state.createAccountPasswordError) return
    if (this.state.createAccountRepeatPasswordError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await signUp(this.state.createAccountEmail, this.state.createAccountPassword)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'User account created. User is logged in!'
      }))
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickRecover = async () => {
    this.setState(() => ({ recoverPasswordSubmitted: true }))

    if (this.state.recoverPasswordEmailError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await sendPasswordResetEmail(this.state.recoverPasswordEmail)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'Check your inbox!'
      }))
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  fetchCourses = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      const courses = await getAllCourses()
      this.setState(() => ({ courses }))
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onUserLogin = () => {
    const token = getIdToken()
    if (!token) return
    const user = decodeToken(token)

    // @TODO replace this token decoding with request for user data
    this.setState(() => ({
      isUserLoggedIn: true,
      userDisplayName: '',
      userEmail: user.email,
      userAvatar: ''
    }))

    this.fetchCourses()
  }

  onClickLogOut = async () => {
    await logOut()
    this.setState(() => ({
      isUserLoggedIn: false,
      userDisplayName: '',
      userEmail: '',
      userAvatar: ''
    }))
  }

  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
  }

  dismissMessage = () => {
    this.setState(() => ({
      isInfoDisplayed: false,
      infoMessage: ''
    }))
  }

  render () {
    const {
      isUserLoggedIn,
      userDisplayName,
      userEmail,
      userAvatar,
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage,
      notLoginUserRoute,
      createAccountEmail,
      createAccountEmailError,
      createAccountPassword,
      createAccountPasswordError,
      createAccountRepeatPassword,
      createAccountRepeatPasswordError,
      createAccountSubmitted,
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted,
      courses
    } = this.state

    return (
      <div>

        {
          isUserLoggedIn ?
            <PageCoursesList
              userDisplayName={userDisplayName}
              userEmail={userEmail}
              userAvatar={userAvatar}
              courses={courses}
              onClickLogOut={this.onClickLogOut}
            />
            :
            notLoginUserRoute === 'LOGIN' ?
              <PageLogin
                onClickLogin={this.onClickLogin}
              />
              :
              notLoginUserRoute === 'CREATE-ACCOUNT' ?
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
                    onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                  />
                </FullPageLayout>
                :
                notLoginUserRoute === 'RECOVER-PASSWORD' ?
                  <FullPageLayout>
                    <RecoverPasswordForm
                      email={recoverPasswordEmail}
                      emailError={recoverPasswordSubmitted ? recoverPasswordEmailError : undefined}
                      onChangeEmail={(e) => this.setState(() => ({
                        recoverPasswordEmail: e.target.value,
                        recoverPasswordEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
                      }))}
                      onClickRecover={this.onClickRecover}
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
              buttonLabel={'OK'}
              onButtonClick={this.dismissMessage}
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
