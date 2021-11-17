import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { LESSONS_KEY } from './const'

export const get = async (lessonId) => {
  const lesson = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId))
  return {
    id: lessonId,
    ...lesson
  }
}

export default get
