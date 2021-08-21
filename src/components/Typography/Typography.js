import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const Typography = (props) => {
  const {
    className,
    children,
    variant,
    ...otherProps
  } = props

  const variantClass = classes[variant]

  return (
    <span
      className={`${classes.root}${className ? ` ${className}` : ''}${variantClass ? ` ${variantClass}` : ''}`}
      {...otherProps}
    >
      {children}
    </span>
  )
}

Typography.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['h1', 'h3', 'button', 'body1', 'caption'])
}

export default Typography
