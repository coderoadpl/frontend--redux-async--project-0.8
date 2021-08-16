import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const LoginForm = (props) => {
  const {
    className,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      LoginForm
    </div>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string
}

export default LoginForm
