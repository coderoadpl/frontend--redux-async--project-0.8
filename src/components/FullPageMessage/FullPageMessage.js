import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import classes from './styles.module.css'
import Typography from '../Typography'

export const FullPageMessage = (props) => {
  const {
    className,
    message,
    buttonLabel = 'GO BACK',
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
        <Typography
          className={classes.message}
          variant={'h3'}
        >
          {message}
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
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
  buttonLabel: PropTypes.string
}

export default FullPageMessage
