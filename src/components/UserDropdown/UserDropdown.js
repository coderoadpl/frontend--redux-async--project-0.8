import React from 'react'
import PropTypes from 'prop-types'

import Typography from '../Typography'
import Avatar from '../Avatar'

import classes from './styles.module.css'

export const UserDropdown = (props) => {
  const {
    className,
    userDisplayName,
    userEmail,
    userAvatar,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.textWrapper}
      >
        <Typography>
          {userDisplayName || '– –'}
        </Typography>
        <Typography>
          {userEmail}
        </Typography>
      </div>
      <div
        className={classes.avatarWrapper}
      >
        <Avatar
          src={userAvatar}
        />
      </div>
    </div>
  )
}

UserDropdown.propTypes = {
  className: PropTypes.string,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string
}

export default UserDropdown
