import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { COURSES_KEY } from './const'

export const getAll = async () => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(COURSES_KEY))
  return objectToArray(rawData)
}

export default getAll
