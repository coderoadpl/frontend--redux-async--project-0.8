import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const TextField = (props) => {
  const {
    className,
    errorMessage,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
    >
      <input
        className={`${classes.input}${errorMessage ? ` ${classes.hasError}` : ''}`}
        {...otherProps}
      />
      {
        errorMessage ?
          <div
            className={classes.errorMessage}
          >
            {errorMessage}
          </div>
          :
          null
      }
    </div>
  )
}

TextField.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string
}

export default TextField
