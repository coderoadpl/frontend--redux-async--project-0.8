import React from 'react'
import PropTypes from 'prop-types'

import Typography from '../Typography'

import LogOutIcon from './LogOutIcon'
import ProfileIcon from './ProfileIcon'

import classes from './styles.module.css'

export const ListItem = (props) => {
  const {
    className,
    text,
    icon,
    disabled = false,
    ...otherProps
  } = props

  return (
    <li
      className={`${classes.root}${className ? ` ${className}` : ''}${disabled ? ` ${classes.disabled}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.iconWrapper}
      >
        {
        icon === 'log-out' ?
          <LogOutIcon />
          :
          icon === 'profile' ?
            <ProfileIcon />
            :
            null
      }
      </div>
      <div
        className={classes.textWrapper}
      >
        <Typography
          variant={'body2'}
          className={classes.text}
        >
          {text}
        </Typography>
      </div>
    </li>
  )
}

ListItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.oneOf(['log-out', 'profile']),
  disabled: PropTypes.bool
}

export default ListItem
