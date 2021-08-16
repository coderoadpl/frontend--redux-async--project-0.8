import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const TextField = (props) => {
  const {
    className,
    ...otherProps
  } = props

  return (
    <input
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    />
  )
}

TextField.propTypes = {
  className: PropTypes.string
}

export default TextField
