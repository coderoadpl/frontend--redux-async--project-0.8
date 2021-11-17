import { get } from './'

export const getMultiple = async (lessonIds) => {
  const requestsPromises = lessonIds.map((lessonId) => get(lessonId))

  return Promise.all(requestsPromises)
}

export default getMultiple
