import React from 'react'
import PropTypes from 'prop-types'

import FullPageLayout from '../FullPageLayout'
import Message from '../Message'

export const FullPageMessage = (props) => {
  const {
    wrapperProps,
    ...otherProps
  } = props

  return (
    <FullPageLayout
      {...wrapperProps}
    >
      <Message
        {...otherProps}
      />
    </FullPageLayout>
  )
}

FullPageMessage.propTypes = {
  wrapperProps: PropTypes.object
}

export default FullPageMessage
