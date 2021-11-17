import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { LESSONS_KEY } from './const'

export const get = async (lessonId) => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY + '/' + lessonId))
  return objectToArray(rawData)
}

export default get
