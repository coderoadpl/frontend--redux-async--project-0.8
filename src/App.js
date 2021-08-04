import React from 'react'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Typography from './components/Typography'
import Button from './components/Button/Button'
import Message from './components/Message'

export class App extends React.Component {
  state = {
    // global state
    isLoading: false,
    hasError: true,
    errorMessage: 'ERROR',
    isInfoDisplayed: false,
    infoMessage: '',

    // user/auth state
    isUserLoggedIn: false,
    userDisplayName: '',
    userEmail: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'NEW-ACCOUNT' or 'FORGOT PASSWORD'

    // login page state
    loginEmail: '',
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

  render () {
    const {
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage
    } = this.state

    return (
      <div>
        <h1>CodeRoad APP</h1>
        {
          isLoading ?
            <FullPageLoader />
            :
            null
        }
        <Typography
          variant={'h1'}
        >
          Header 1
        </Typography>
        <br />
        <Typography
          variant={'h3'}
        >
          Header 3
        </Typography>
        <br />
        <Typography
          variant={'button'}
        >
          Button
        </Typography>
        <br />
        <Button
          variant={'contained'}
          color={'primary'}
        >
          CONTAINED PRIMARY
        </Button>
        <br />
        <br />
        <Button
          variant={'contained'}
          color={'secondary'}
        >
          CONTAINED SECONDARY
        </Button>
        <br />
        <br />
        <Button
          variant={'text'}
          color={'primary'}
        >
          TEXT PRIMARY
        </Button>

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

        {/* {
          hasError ?
            <FullPageMessage
              className={'regular-class'}
              wrapperProps={{
                className: 'wrapper-class'
              }}
              message={errorMessage}
              iconVariant={'error'}
              onButtonClick={console.log}
            />
            :
            null
        } */}

        {
          hasError ?
            <FullPageLayout
              className={'wrapper-class'}
            >
              <Message
                className={'regular-class'}
                message={errorMessage}
                iconVariant={'error'}
                onButtonClick={console.log}
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
