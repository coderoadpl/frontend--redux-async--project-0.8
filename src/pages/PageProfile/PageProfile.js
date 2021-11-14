import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logo'
import MainLayout from '../../components/MainLayout'
import Button from '../../components/Button'

// import { useAuthUser } from '../../contexts/UserContext'

import classes from './styles.module.css'

export const PageProfile = (props) => {
  const {
    className,
    ...otherProps
  } = props

  // const {
  //   userDisplayName,
  //   userEmail,
  //   userAvatar
  // } = useAuthUser()

  const navigate = useNavigate()
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <MainLayout
        contentAppBar={
          <>
            <Logo
              className={classes.logo}
            />
            <Button
              onClick={onClickGoBack}
            >
              GO BACK
            </Button>
          </>
        }
        contentMain={
          <>PageProfile</>
        }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string
}

export default PageProfile
