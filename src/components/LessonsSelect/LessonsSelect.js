import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material'
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material'

export const LessonsSelect = (props) => {
  const {
    sx,
    onChange,
    value,
    options,
    ...otherProps
  } = props

  const selectedLessons = options.filter((lesson) => value.includes(lesson.id))

  return (
    <>
      <Autocomplete
        onChange={(e, option) => {
          if (!option) return
          onChange(value.concat(option.id))
        }}
        options={options}
        getOptionLabel={(option) => option.title}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Lessons'}
            sx={{ width: '100%', marginBottom: 2 }}
            size={'small'}
            {...otherProps}
          />
        )}
      />
      <List>
        {
          selectedLessons && selectedLessons.map((lesson, i, arr) => {
            return (
              <ListItem
                key={lesson.id}
                sx={{ paddingRight: 18 }}
                secondaryAction={
                  <>
                    <IconButton
                      disabled={i === 0}
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton
                      disabled={i === arr.length - 1}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onChange(value.filter((lessonId) => lesson.id !== lessonId))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
              }
              >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary={lesson.title}
                />
              </ListItem>
            )
          })
        }
      </List>
    </>
  )
}

export const LessonOptionsPropType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})).isRequired

LessonsSelect.propTypes = {
  sx: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: LessonOptionsPropType
}

export default LessonsSelect
