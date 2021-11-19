import React from 'react'

import { Routes, Route } from 'react-router-dom'

import ViewLoadersOverlay from './views/ViewLoadersOverlay'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile'
import PageCourse from './pages/PageCourse'
import PageCourseContentEmpty from './pages/PageCourseContentEmpty'
import PageCourseContent from './pages/PageCourseContent'
import PageAdminMain from './pages/PageAdminMain'
import PageAdminLessons from './pages/PageAdminLessons'
import PageAdminLessonsNew from './pages/PageAdminLessonsNew'
import PageAdminLessonsEdit from './pages/PageAdminLessonsEdit'
import PageAdminCourses from './pages/PageAdminCourses'
import PageAdminCoursesNew from './pages/PageAdminCoursesNew'
import PageAdminCoursesEdit from './pages/PageAdminCoursesEdit'

import { useAuthUser } from './contexts/UserContext'

import { checkIfUserIsLoggedIn } from './auth'

import { handleAsyncAction } from './handleAsyncAction'

export const App = () => {
  const {
    isUserLoggedIn,
    isAdmin,
    getUserData
  } = useAuthUser()

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await getUserData()
      }
    }, 'Loading app...')
    // mount only
  }, [getUserData])

  return (
    <div>

      {
        isUserLoggedIn ?
          <Routes>
            <Route
              path={'/profile'}
              element={<PageProfile />}
            />
            <Route
              path={'courses/:courseId'}
              element={<PageCourse />}
            >
              <Route
                index={true}
                element={<PageCourseContentEmpty />}
              />
              <Route
                path={':lessonId'}
                element={<PageCourseContent />}
              />
            </Route>
            {
              isAdmin ?
                <Route
                  path={'/admin'}
                  element={<PageAdminMain />}
                >
                  <Route
                    path={'lessons'}
                    element={<PageAdminLessons />}
                  />
                  <Route
                    path={'lessons/new'}
                    element={<PageAdminLessonsNew />}
                  />
                  <Route
                    path={'lessons/:lessonId'}
                    element={<PageAdminLessonsEdit />}
                  />
                  <Route
                    path={'courses'}
                    element={<PageAdminCourses />}
                  />
                  <Route
                    path={'courses/new'}
                    element={<PageAdminCoursesNew />}
                  />
                  <Route
                    path={'courses/:courseId'}
                    element={<PageAdminCoursesEdit />}
                  />
                </Route>
                :
                null
            }
            <Route
              path={'*'}
              element={
                <PageCoursesList />
              }
            />
          </Routes>
          :
          null
      }

      {
        !isUserLoggedIn ?
          <Routes>
            <Route
              path={'*'}
              element={<PageLogin />}
            />
            <Route
              path={'/create-account'}
              element={
                <PageCreateAccount />
              }
            />
            <Route
              path={'/recover-password'}
              element={<PageRecoverPassword />}
            />
          </Routes>
          :
          null
      }

      <ViewLoadersOverlay />

    </div >
  )
}

export default App
