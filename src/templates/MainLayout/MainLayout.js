import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '../../components/AppBar'
import Container from '../../components/Container'

import classes from './styles.module.css'

export const MainLayout = (props) => {
  const {
    className,
    contentAppBar,
    contentMain,
    contentSearch,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <AppBar>
        <Container>
          {contentAppBar}
        </Container>
      </AppBar>
      <div
        className={classes.wrapper}
      >
        <div
          className={classes.contentSearchWrapper}
        >
          <Container>
            {contentSearch}
          </Container>
        </div>
        <div
          className={classes.contentMainWrapper}
        >
          <Container>
            {contentMain}
          </Container>
        </div>
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  className: PropTypes.string,
  contentAppBar: PropTypes.node,
  contentMain: PropTypes.node,
  contentSearch: PropTypes.node
}

export default MainLayout
