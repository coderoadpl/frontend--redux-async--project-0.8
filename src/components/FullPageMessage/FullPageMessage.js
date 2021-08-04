import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import classes from './styles.module.css'

import Typography from '../Typography'

import ErrorIcon from './ErrorIcon'
import InfoIcon from './InfoIcon'

export const FullPageMessage = (props) => {
  const {
    className,
    message,
    buttonLabel = 'GO BACK',
    iconVariant = 'info',
    onButtonClick,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.wrapper}
      >
        {
          iconVariant === 'info' ?
            <InfoIcon />
            :
            iconVariant === 'error' ?
              <ErrorIcon />
              :
              null
        }
        <Typography
          className={classes.message}
          variant={'h3'}
        >
          {message}
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

FullPageMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  iconVariant: PropTypes.oneOf(['error', 'info']),
  onButtonClick: PropTypes.func.isRequired
}

export default FullPageMessage
