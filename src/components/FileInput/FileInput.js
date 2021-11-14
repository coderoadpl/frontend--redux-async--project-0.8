import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const FileInput = (props) => {
  const {
    className,
    variant,
    color,
    children,
    disabled,
    ...otherProps
  } = props

  const variantClass = classes[variant]
  const colorClass = classes[color]

  return (
    <label
      className={`${classes.root}${className ? ` ${className}` : ''}${variantClass ? ` ${variantClass}` : ''}${colorClass ? ` ${colorClass}` : ''}${disabled ? ` ${classes.disabled}` : ''}`}
    >
      {children}
      <input
        className={classes.input}
        type={'file'}
        {...otherProps}
      />
    </label>
  )
}

FileInput.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  children: PropTypes.node
}

export default FileInput
