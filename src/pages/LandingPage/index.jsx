import React from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import styles from './styles.module.css'
import Task from '../../components/Task'

const LandingPage = () => {
  return (
    <div>
      <div>
        <h1 className={styles.mainHeading}>Pomodoro App</h1>
        <h2 className={styles.subMainHeading}>
          Now track your daily task using pomodoro app!
        </h2>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.todoWrapper}>
              <div className={styles.todoContainer}>
                <div className={styles.todoListHeading}>To-Do List :</div>
                <div className={styles.todoListIcon}>
                  <FaPlusSquare />
                </div>
              </div>
            </div>
            <div className={styles.taskComponents}>
              <Task />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
