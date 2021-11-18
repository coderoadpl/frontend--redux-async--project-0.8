import React from 'react'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

import FullPageLayout from '../../components/FullPageLayout'
import FullPageMessage from '../../components/FullPageMessage'
import FullPageLoader from '../../components/FullPageLoader'
import Message from '../../components/Message'

import {
  createActionRemoveError,
  createActionRemoveInfo
} from '../../state/loaders'

import classes from './styles.module.css'

export const ViewLoadersOverlay = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const {
    isLoading,
    loadingMessage,
    hasError,
    errorMessage,
    isInfoDisplayed,
    infoMessage
  } = useSelector((state) => state.loaders)
  const dispatch = useDispatch()

  const dismissError = React.useCallback(() => {
    dispatch(createActionRemoveError())
  }, [dispatch])

  const dismissMessage = React.useCallback(() => {
    dispatch(createActionRemoveInfo())
  }, [dispatch])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      {
        isLoading ?
          <FullPageLoader
            message={loadingMessage}
          />
          :
          null
      }

      {
        isInfoDisplayed ?
          <FullPageMessage
            message={infoMessage}
            iconVariant={'info'}
            buttonLabel={'OK'}
            onButtonClick={dismissMessage}
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
              onButtonClick={dismissError}
            />
          </FullPageLayout>
          :
          null
      }
    </div>
  )
}

ViewLoadersOverlay.propTypes = {
  className: PropTypes.string
}

export default ViewLoadersOverlay
