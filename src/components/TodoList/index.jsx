import { useContext } from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import AddTask from '../../modals/AddTask'
import UpdateTask from '../../modals/UpdateTask'
import { MainContext } from '../../store/mainContext'
import { types } from '../../store/reducer'
import Card from '../Card'
import styles from './styles.module.css'

const TodoList = () => {
  const { state, dispatch } = useContext(MainContext)

  const toggleUpdateModal = () => {
    dispatch({
      type: state.isUpdateModelOpen
        ? types.CLOSE_UPDATE_MODEL
        : types.OPEN_UPDATE_MODEL,
    })
  }

  const openModal = () => {
    dispatch({
      type: types.OPEN_ADD_MODEL,
    })
  }

  const deleteTask = (index) => {
    dispatch({
      type: types.REMOVE_TASK,
      payload: {
        index,
      },
    })
  }

  const openEditModal = (index) => {
    dispatch({
      type: types.OPEN_UPDATE_MODEL,
      payload: { currentEditIndex: index },
    })
  }

  const updateTask = (obj) => {
    updateListArray(obj, state?.currentEditIndex)
  }

  const saveTask = (task) => {
    dispatch({
      type: types.CREATE_TASK,
      payload: {
        task,
      },
    })
  }

  const updateListArray = (task, index) => {
    dispatch({
      type: types.EDIT_TASK,
      payload: {
        task,
        index,
      },
    })
  }

  const toggle = () => {
    dispatch({
      type: state.isAddModelOpen ? types.CLOSE_ADD_MODEL : types.OPEN_ADD_MODEL,
    })
  }
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.mainHeaderContainer}>
          <h1 className={styles.mainHeading}>Pomodoro App</h1>
          <h4 className={styles.subMainHeading}>
            Now track your daily task using pomodoro app!
          </h4>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.toDoContainer}>
            <h3>Tasks to be done...</h3>
            <div onClick={openModal} className={styles.todoListIcon}>
              <FaPlusSquare />
              <div className={styles.addTaskLabel}>Add Task</div>
            </div>
          </div>

          <div className={styles.taskContainer}>
            {!!state?.taskList?.length &&
              state?.taskList.map((obj, index) => (
                <Card
                  openEditModal={openEditModal}
                  key={index}
                  taskobj={obj}
                  index={index}
                  deleteTask={deleteTask}
                  updateListArray={updateListArray}
                />
              ))}
          </div>
        </div>
        {state.isUpdateModelOpen && (
          <UpdateTask
            modal={state.isUpdateModelOpen}
            toggle={toggleUpdateModal}
            updateTask={updateTask}
            taskobj={{
              ...state?.taskList[state?.currentEditIndex],
            }}
          />
        )}
        {state.isAddModelOpen && (
          <AddTask
            toggle={toggle}
            modal={state.isAddModelOpen}
            saveTask={saveTask}
          />
        )}
      </div>
    </div>
  )
}

export default TodoList
