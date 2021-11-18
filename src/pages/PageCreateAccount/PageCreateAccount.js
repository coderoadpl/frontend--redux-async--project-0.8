import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import FullPageLayout from '../../components/FullPageLayout'
import CreateAccountForm from '../../components/CreateAccountForm'

import { useAuthUser } from '../../contexts/UserContext'

import { handleAsyncAction } from '../../handleAsyncAction'

import { signUp } from '../../auth'

import { createActionSetInfo } from '../../state/loaders'

import classes from './styles.module.css'

export const PageCreateAccount = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const dispatch = useDispatch()

  const {
    getUserData
  } = useAuthUser()

  const methods = useForm()
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const onClickBackToLogin = React.useCallback(() => navigate('/'), [navigate])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      dispatch(createActionSetInfo('User account created. User is logged in!'))
      await getUserData()
    }, 'Creating account...')
  }, [dispatch, getUserData])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <FormProvider
          {...methods}
        >
          <CreateAccountForm
            onSubmit={handleSubmit((data) => onClickCreateAccount(data.email, data.password))}
            onClickBackToLogin={onClickBackToLogin}
          />
        </FormProvider>
      </FullPageLayout>
    </div>
  )
}

PageCreateAccount.propTypes = {
  className: PropTypes.string
}

export default PageCreateAccount
