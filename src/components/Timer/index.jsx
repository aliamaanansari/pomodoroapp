import React, { useContext, useEffect, useState } from 'react'
import { AiFillLeftCircle } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { MainContext } from '../../store/mainContext'
import { convertHMS } from '../../utils/time'
import styles from './styles.module.css'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'

const Timer = () => {
  const { state } = useContext(MainContext)
  const [task, setTask] = useState(null)
  const { taskId } = useParams()
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(parseInt(task.time, 10) * 60)
    setIsActive(false)
  }

  useEffect(() => {
    if (taskId !== null && taskId !== undefined) {
      const task = state?.taskList?.[taskId]
      if (task) {
        setTask(task)
        setSeconds(parseInt(task.time, 10) * 60)
      }
    }
  }, [taskId, state?.taskList])

  useEffect(() => {
    let interval = null
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          setIsActive(false)
          clearInterval(interval)
        }
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  let progressWidth = 100

  if (task?.time != null) {
    progressWidth = (seconds / (parseInt(task.time, 10) * 60)) * 100
  }
  const remainingTime = convertHMS(seconds)
  return (
    <>
      <div className={styles.timer}>
        <div className={styles.container}>
          <div className={styles.subContainer}>
            <Link to='/'>
              <AiFillLeftCircle size={30} style={{ color: '#3c5898' }} />
            </Link>
            <div className={styles.timerContainer}>
              <h1>Timer</h1>
              {/* <div class={styles.progressBar}>
                <div
                  className={styles.timeRemaining}
                  style={{ width: progressWidth }}></div>
              </div> */}
              <div className={styles.circularProgressBar}>
                <CircularProgressbarWithChildren
                  value={progressWidth}
                  styles={buildStyles({
                    pathColor: '#3c5898',
                    trailColor: '#d6d9e1',
                    pathTransitionDuration: 1,
                  })}>
                  {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                  <div style={{ fontSize: 12, marginTop: -5 }}>
                    <h1>
                      {remainingTime === '00' ? 'Completed' : remainingTime}
                    </h1>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              {remainingTime === '00' ? null : (
                <button
                  disabled={parseInt(task?.time, 10) * 60 <= 0}
                  className={styles.startBtn}
                  onClick={toggle}>
                  {isActive ? 'Pause' : 'Start'}
                </button>
              )}

              <button className={styles.btnReset} onClick={reset}>
                Reset
              </button>
            </div>
            <div className={styles.textContainer}>
              <h1>{task?.name}</h1>
              <h4>{task?.description}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Timer
