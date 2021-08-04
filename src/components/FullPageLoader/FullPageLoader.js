import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

import classes from './styles.module.css'

export const FullPageLoader = (props) => {
  const {
    className,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <Spinner />
    </div>
  )
}

FullPageLoader.propTypes = {
  className: PropTypes.string
}

export default FullPageLoader
