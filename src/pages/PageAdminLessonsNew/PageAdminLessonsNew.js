import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { Box, Typography } from '@mui/material'

import FormLesson from '../../components/FormLesson/FormLesson'

export const PageAdminLessonsNew = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 2,
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        sx={{ width: '100%', marginBottom: 2, textAlign: 'center' }}
        variant={'h4'}
      >
        Add new lesson
      </Typography>
      <FormProvider
        {...methods}
      >
        <FormLesson
          onSubmit={handleSubmit(console.log, console.log)}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminLessonsNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminLessonsNew
