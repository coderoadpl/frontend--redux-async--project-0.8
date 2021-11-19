import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, MenuItem, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material'
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material'

const move = (array, fromIndex, toIndex) => {
  const target = array[fromIndex]
  const arrayWithoutTarget = array.slice(0, fromIndex).concat(array.slice(fromIndex + 1))
  const result = arrayWithoutTarget.slice(0, toIndex).concat(target).concat(arrayWithoutTarget.slice(toIndex))
  return result
}

export const LessonsSelect = (props) => {
  const {
    sx,
    onChange,
    value,
    options,
    ...otherProps
  } = props

  const selectedLessons = value.map((lessonId) => options.find((lesson) => lesson.id === lessonId))
  const filteredOptions = options.filter((option) => !value.includes(option.id))

  const add = React.useCallback((lessonId) => onChange(value.concat(lessonId)), [onChange, value])
  const remove = React.useCallback((lessonId) => onChange(value.filter((id) => id !== lessonId)), [onChange, value])
  const moveUp = React.useCallback((lessonId) => {
    const currentIndex = value.indexOf(lessonId)
    const newValue = move(value, currentIndex, currentIndex - 1)
    onChange(newValue)
  }, [onChange, value])
  const moveDown = React.useCallback((lessonId) => {
    const currentIndex = value.indexOf(lessonId)
    const newValue = move(value, currentIndex, currentIndex + 1)
    onChange(newValue)
  }, [onChange, value])

  return (
    <>
      <Autocomplete
        onChange={(e, option) => {
          if (!option) return
          add(option.id)
        }}
        options={filteredOptions}
        getOptionLabel={(option) => option.title}
        sx={{ width: '100%' }}
        renderOption={(props, option) => (
          <MenuItem
            key={option.id}
            {...props}
          >
            {option.title}
          </MenuItem>
        )}
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
                      onClick={() => moveUp(lesson.id)}
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton
                      disabled={i === arr.length - 1}
                      onClick={() => moveDown(lesson.id)}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => remove(lesson.id)}
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
