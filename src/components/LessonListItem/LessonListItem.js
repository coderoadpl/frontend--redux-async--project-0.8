import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Videocam as VideocamIcon } from '@mui/icons-material'

export const LessonListItem = (props) => {
  const {
    sx,
    lesson,
    onClick,
    index,
    ...otherProps
  } = props

  return (
    <Tooltip
      title={lesson.title}
      enterDelay={500}
    >
      <ListItem
        sx={sx}
        disablePadding={true}
        {...otherProps}
      >
        <ListItemButton
          sx={{ width: '100%' }}
          onClick={onClick}
        >
          <ListItemIcon>
            <VideocamIcon/>
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              noWrap: true
            }}
            primary={`${index + 1}. ${lesson.title}`}
          />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  )
}

export const LessonPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}).isRequired

LessonListItem.propTypes = {
  index: PropTypes.number.isRequired,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  lesson: LessonPropType
}

export default LessonListItem
