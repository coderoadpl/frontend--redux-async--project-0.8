import React from 'react'
import PropTypes from 'prop-types'

import Typography from '../Typography'
import Button from '../Button'

import classes from './styles.module.css'

export const CourseCard = (props) => {
  const {
    className,
    course = {},
    onClick,
    ...otherProps
  } = props

  const {
    category,
    description,
    image,
    title
  } = course

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.imageWrapper}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${image})`
          }}
        >
        </div>
      </div>
      <div
        className={classes.textWrapper}
      >
        <div
          className={classes.titleWrapper}
        >
          <Typography
            variant={'body1'}
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            variant={'body2'}
            className={classes.category}
          >
            {category}
          </Typography>
        </div>
        <div
          className={classes.descriptionWrapper}
        >
          <Typography
            variant={'body2'}
            className={classes.description}
          >
            {description}
          </Typography>
        </div>
      </div>
      <div
        className={classes.actionsWrapper}
      >
        <Button
          icon={'eye'}
          disabled={!onClick}
          onClick={onClick}
        >
          VIEW COURSE
        </Button>
      </div>
    </div>
  )
}

export const CoursePropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}).isRequired

CourseCard.propTypes = {
  className: PropTypes.string,
  course: CoursePropType,
  onClick: PropTypes.func
}

export default CourseCard
