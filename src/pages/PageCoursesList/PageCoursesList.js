import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logo'
import UserDropdown from '../../components/UserDropdown'
import ListItem from '../../components/ListItem'
import List from '../../components/List'
import CoursesList from '../../components/CoursesList'
import TextField from '../../components/TextField'
import MainLayout from '../../templates/MainLayout'

import { useAuthUser } from '../../contexts/UserContext'

import { logOut } from '../../auth'
import { signOutWithFirebaseSDK } from '../../firebaseConfig'

import { getAll as getAllCourses } from '../../api/courses'

import { handleAsyncAction } from '../../handleAsyncAction'

import classes from './styles.module.css'

export const PageCoursesList = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const [courses, setCourses] = React.useState(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false)
  const [searchPhrase, setSearchPhrase] = React.useState('')

  const navigate = useNavigate()
  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])
  const onClickCourse = React.useCallback((courseId) => navigate(`/courses/${courseId}`), [navigate])
  const onClickAdminPanel = React.useCallback((courseId) => navigate('/admin'), [navigate])

  const {
    isAdmin,
    userDisplayName,
    userEmail,
    userAvatar,
    clearUser
  } = useAuthUser()

  const fetchCourses = React.useCallback(async () => {
    handleAsyncAction(async () => {
      const courses = await getAllCourses()
      setCourses(() => courses)
    }, 'Loading courses...')
  }, [])

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

  React.useEffect(() => {
    fetchCourses()
  // mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredCourses = React.useMemo(() => {
    const searchPhraseUpperCase = searchPhrase.toUpperCase()
    return courses && courses.filter((course) => {
      return (
        course.title.toUpperCase().includes(searchPhraseUpperCase) ||
        course.category.toUpperCase().includes(searchPhraseUpperCase) ||
        course.description.toUpperCase().includes(searchPhraseUpperCase)
      )
    })
  }, [courses, searchPhrase])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <MainLayout
        contentAppBar={
          <>
            <Logo
              className={classes.logo}
            />
            <UserDropdown
              className={classes.userDropdown}
              userDisplayName={userDisplayName}
              userEmail={userEmail}
              userAvatar={userAvatar}
              onOpenRequested={() => setIsUserDropdownOpen(() => true)}
              onCloseRequested={() => setIsUserDropdownOpen(() => false)}
              contentList={
                isUserDropdownOpen ?
                  <List
                    className={classes.userDropdownList}
                  >
                    {
                      isAdmin ?
                        <ListItem
                          icon={'admin'}
                          text={'Admin panel'}
                          onClick={onClickAdminPanel}
                        />
                        :
                        null
                    }
                    <ListItem
                      icon={'profile'}
                      text={'Profile'}
                      onClick={onClickProfile}
                    />
                    <ListItem
                      icon={'log-out'}
                      text={'Log out'}
                      onClick={onClickLogOut}
                    />
                  </List>
                  :
                  null
              }
            />
          </>
        }
        contentSearch={
          <TextField
            className={classes.searchTextField}
            placeholder={'Type to search'}
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(() => e.target.value)}
          />
        }
        contentMain={
          <CoursesList
            courses={filteredCourses}
            onClickCourse={onClickCourse}
          />
        }
      />
    </div>
  )
}

PageCoursesList.propTypes = {
  className: PropTypes.string
}

export default PageCoursesList
