import React from 'react'
import { FaEdit, FaRegWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { mintuesToHoursAndMinutes } from '../../utils/time'
import styles from './styles.module.css'

const Card = ({ taskobj, index, deleteTask, openEditModal }) => {
  const handleDelete = () => {
    deleteTask(index)
  }
  return (
    <div className={styles.cardWrapper}>
      <Link
        to={`/task/${index}`}
        style={{ textDecoration: 'none', width: '100%' }}>
        <div className={styles.cardHolder}>
          <h5 className={styles.cardHeading}>{taskobj.name}</h5>
          <h7 className={styles.cardTimer}>
            {mintuesToHoursAndMinutes(taskobj.time)}
          </h7>
        </div>
      </Link>
      <div className={styles.icon}>
        <div className={styles.actionCTA}>
          <FaEdit
            className={styles.actionIcon}
            onClick={() => openEditModal(index)}
          />
          <div>Edit</div>
        </div>
        <div className={styles.actionCTA}>
          <FaRegWindowClose
            className={styles.actionIcon}
            onClick={handleDelete}
          />
          <div>Delete</div>
        </div>

        <div className={styles.deleteBtn}></div>
      </div>
    </div>
  )
}

export default Card
