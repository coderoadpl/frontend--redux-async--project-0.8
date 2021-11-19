import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { LESSONS_KEY } from './const'

export const remove = async (lessonId) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId), {
    method: 'DELETE'
  })
  return lesson
}

export default remove
