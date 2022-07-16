import React from 'react'
import { FaEdit, FaRegWindowClose } from 'react-icons/fa'
import styles from './styles.module.css'

const task = () => {
  return (
    <div>
      <div class={styles.task}>
        <input class={styles.taskInput} value=' New Task'></input>
        <div class={styles.iconWrapper}>
          <div>10</div>
          <div className={styles.editBtn}>
            <FaEdit />
          </div>
          <div className={styles.deleteBtn}>
            <FaRegWindowClose />
          </div>
        </div>
      </div>
    </div>
  )
}

export default task
