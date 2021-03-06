import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext, Controller } from 'react-hook-form'

import { Box, Button, TextField } from '@mui/material'

import LessonsSelect, { LessonOptionsPropType } from '../LessonsSelect'

export const FormCourse = (props) => {
  const {
    sx,
    lessons,
    ...otherProps
  } = props

  const methods = useFormContext()
  const { register, control, formState: { errors } } = methods

  return (
    <Box
      component={'form'}
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <TextField
        {...register('title', {
          required: {
            value: true,
            message: 'Title is required'
          }
        })}
        label={'Title'}
        sx={{ width: '100%', marginBottom: 2 }}
        size={'small'}
        error={Boolean(errors.title)}
        helperText={errors.title && errors.title.message}
      />
      <TextField
        {...register('category', {
          required: {
            value: true,
            message: 'Category is required'
          }
        })}
        label={'Category'}
        sx={{ width: '100%', marginBottom: 2 }}
        size={'small'}
        error={Boolean(errors.category)}
        helperText={errors.category && errors.category.message}
      />
      <TextField
        {...register('image', {
          required: {
            value: true,
            message: 'Image URL is required'
          }
        })}
        label={'Image URL'}
        sx={{ width: '100%', marginBottom: 2 }}
        size={'small'}
        error={Boolean(errors.image)}
        helperText={errors.image && errors.image.message}
      />
      <TextField
        {...register('description', {
          required: {
            value: true,
            message: 'Description is required'
          }
        })}
        label={'Description'}
        multiline={true}
        sx={{ width: '100%', marginBottom: 2 }}
        size={'small'}
        error={Boolean(errors.description)}
        helperText={errors.description && errors.description.message}
      />
      <Controller
        control={control}
        name={'lessons'}
        rules={{
          required: {
            value: true,
            message: 'Lessons are required'
          }
        }}
        render={({
          field: { onChange, value }
        }) => (
          <LessonsSelect
            options={lessons}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Button
        variant={'contained'}
        sx={{ width: '100%' }}
        type={'submit'}
      >
        SAVE
      </Button>
    </Box>
  )
}

FormCourse.propTypes = {
  sx: PropTypes.object,
  lessons: LessonOptionsPropType
}

export default FormCourse
