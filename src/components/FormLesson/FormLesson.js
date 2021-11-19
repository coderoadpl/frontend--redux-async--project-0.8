import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext, Controller } from 'react-hook-form'

import { Box, FormHelperText, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export const FormLesson = (props) => {
  const {
    sx,
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
        {...register('content', {
          required: {
            value: true,
            message: 'Video URL is required'
          }
        })}
        label={'Video URL (e.g. from YouTube)'}
        sx={{ width: '100%', marginBottom: 2 }}
        size={'small'}
        error={Boolean(errors.content)}
        helperText={errors.content && errors.content.message}
      />
      <Controller
        control={control}
        name={'type'}
        rules={{
          required: {
            value: true,
            message: 'Type is required'
          }
        }}
        render={({
          field: { onChange, value }
        }) => (
          <FormControl
            sx={{ width: '100%', marginBottom: 2 }}
            error={Boolean(errors.type)}
          >
            <InputLabel
              size={'small'}
              id={'form-lesson-select-label'}
            >
              Type
            </InputLabel>
            <Select
              value={value}
              onChange={onChange}
              labelId={'form-lesson-select-label'}
              id={'form-lesson-select'}
              label={'Type'}
              size={'small'}
            >
              <MenuItem value={'video'}>Video</MenuItem>
            </Select>
            {
              errors.type ?
                <FormHelperText>{errors.type.message}</FormHelperText>
                :
                null
            }
          </FormControl>
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

FormLesson.propTypes = {
  sx: PropTypes.object
}

export default FormLesson
