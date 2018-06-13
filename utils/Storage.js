
import { AsyncStorage } from 'react-native'

const key = '@Tasks:Storage'

export const saveTask = (val) => {
  console.log(val)
  return AsyncStorage.mergeItem(key, JSON.stringify({[val.id]: {...val}})).then((data) => {
    return JSON.parse(data)
  })
}

export const getTasks = () => {
  return AsyncStorage.getItem(key).then((data) => {
    return JSON.parse(data)
  })
}

export const clearAll = () => {
  return AsyncStorage.clear()
}