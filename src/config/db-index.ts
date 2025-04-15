const createIndex = <T extends Record<string, number>>(index: T): IndexType<T> => {
  return index as IndexType<T>
}

const DB_INDEX = {
  USER: createIndex({ firstname: 1 }),
}

export default DB_INDEX