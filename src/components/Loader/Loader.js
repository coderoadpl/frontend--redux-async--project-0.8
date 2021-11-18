import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

import classes from './styles.module.css'
import Typography from '../Typography'

export const Loader = (props) => {
  const {
    className,
    message,
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
        <Spinner
          className={classes.spinner}
        />
        {
          message ?
            <Typography
              className={classes.message}
              variant={'h3'}
            >
              {message}
            </Typography>
            :
            null
        }
      </div>
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
}

export default Loader
