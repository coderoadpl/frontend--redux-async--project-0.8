import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

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
      <Logo
        className={classes.logo}
      />
      <Typography
        className={classes.header}
        variant={'h1'}
      >
        Log in 👋
      </Typography>
      <TextField
        className={classes.textField}
        placeholder={'E-mail'}
      />
      <TextField
        className={classes.textField}
        placeholder={'Password'}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
      >
        LOGIN
      </Button>
      <Button
        className={classes.button}
        variant={'contained'}
        color={'secondary'}
      >
        CREATE ACCOUNT
      </Button>
      <Button
        className={classes.button}
        variant={'text'}
      >
        FORGOT PASSWORD
      </Button>
    </div>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string
}

export default LoginForm
