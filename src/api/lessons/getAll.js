import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { LESSONS_KEY } from './const'

export const getAll = async () => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(LESSONS_KEY))
  return objectToArray(rawData)
}

export default getAll
