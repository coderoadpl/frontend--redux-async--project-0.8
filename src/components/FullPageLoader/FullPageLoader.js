import React from 'react'
import PropTypes from 'prop-types'

import FullPageLayout from '../FullPageLayout'
import Loader from '../Loader'

export const FullPageLoader = (props) => {
  const {
    wrapperProps,
    ...otherProps
  } = props

  return (
    <FullPageLayout
      {...wrapperProps}
    >
      <Loader
        {...otherProps}
      />
    </FullPageLayout>
  )
}

FullPageLoader.propTypes = {
  wrapperProps: PropTypes.object
}

export default FullPageLoader
