import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const AppBar = (props) => {
  const {
    className,
    children,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.container}
      >
        {children}
      </div>
    </div>
  )
}

AppBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default AppBar
