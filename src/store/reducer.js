export const types = {
  CREATE_TASK: 'CREATE_TASK',
  IMPORT_TASK_FROM_LOCALSTORAGE: 'IMPORT_TASK_FROM_LOCALSTORAGE',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  OPEN_UPDATE_MODEL: 'OPEN_UPDATE_MODEL',
  CLOSE_UPDATE_MODEL: 'CLOSE_UPDATE_MODEL',
  OPEN_ADD_MODEL: 'OPEN_ADD_MODEL',
  CLOSE_ADD_MODEL: 'CLOSE_ADD_MODEL',
}

export const initialState = {
  taskList: [],
  isAddModelOpen: false,
  isUpdateModelOpen: false,
  currentEditIndex: 0,
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.IMPORT_TASK_FROM_LOCALSTORAGE: {
      try {
        let arr = localStorage.getItem('taskList')
        let obj = JSON.parse(arr)
        return {
          ...state,
          taskList: obj || [],
        }
      } catch (error) {
        return {
          ...state,
          taskList: [],
        }
      }
    }
    case types.CREATE_TASK: {
      const tempList = state?.taskList
      tempList.push(payload?.task)
      localStorage.setItem('taskList', JSON.stringify(tempList))
      return {
        ...state,
        taskList: [...tempList],
        isAddModelOpen: false,
      }
    }
    case types.EDIT_TASK: {
      const tempList = state?.taskList
      tempList[payload?.index] = payload?.task
      localStorage.setItem('taskList', JSON.stringify(tempList))
      return {
        ...state,
        taskList: [...tempList],
        isUpdateModelOpen: false,
      }
    }
    case types.REMOVE_TASK: {
      let tempList = state?.taskList
      tempList.splice(payload?.index, 1)
      localStorage.setItem('taskList', JSON.stringify(tempList))
      return { ...state, taskList: [...tempList] }
    }
    case types.OPEN_ADD_MODEL:
      return { ...state, isAddModelOpen: true }
    case types.CLOSE_ADD_MODEL:
      return { ...state, isAddModelOpen: false }
    case types.OPEN_UPDATE_MODEL:
      return {
        ...state,
        isUpdateModelOpen: true,
        currentEditIndex: payload?.currentEditIndex || 0,
      }
    case types.CLOSE_UPDATE_MODEL:
      return { ...state, isUpdateModelOpen: false }

    default:
      return state
  }
}
