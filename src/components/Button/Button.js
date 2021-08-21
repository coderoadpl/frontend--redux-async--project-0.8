import React from 'react'
import PropTypes from 'prop-types'

import Typography from '../Typography'

import EyeIcon from './EyeIcon'

import classes from './styles.module.css'

export const Button = (props) => {
  const {
    className,
    children,
    variant,
    icon,
    color,
    disabled,
    ...otherProps
  } = props

  const variantClass = classes[variant]
  const colorClass = classes[color]

  return (
    <button
      className={`${classes.root}${className ? ` ${className}` : ''}${variantClass ? ` ${variantClass}` : ''}${colorClass ? ` ${colorClass}` : ''}${disabled ? ` ${classes.disabled}` : ''}`}
      {...otherProps}
    >
      {
        icon ?
          <span
            className={classes.iconWrapper}
          >
            {
                icon === 'eye' ?
                  <EyeIcon />
                  :
                  null
              }
          </span>
          :
          null
      }
      <Typography
        variant={'button'}
      >
        {children}
      </Typography>
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['contained', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.oneOf(['eye']),
  disabled: PropTypes.bool
}

export default Button
