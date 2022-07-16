import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { convertHMS } from '../utils/time'

const UpdateTask = ({ modal, toggle, updateTask, taskobj }) => {
  const [taskName, setTaskName] = useState('')
  const [desc, setDesc] = useState('')
  const [timer, setTimer] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'taskName') {
      setTaskName(value)
    } else if (name === 'taskDescription') {
      setDesc(value)
    } else {
      setTimer(value)
    }
  }

  useEffect(() => {
    setTaskName(taskobj.name)
    setDesc(taskobj.description)
    setTimer(taskobj.time)
  }, [taskobj])

  const handleEdit = (e) => {
    e.preventDefault()
    let tempObj = {}
    tempObj['name'] = taskName
    tempObj['description'] = desc
    tempObj['time'] = timer
    updateTask(tempObj)
  }
  return (
    <Modal show={modal} onHide={toggle}>
      <Modal.Header>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className='form-group'>
            <label>Task Name</label>
            <input
              type='text'
              className='form-control'
              value={taskName}
              name='taskName'
              onChange={handleChange}></input>
          </div>
          <div className='form-group'>
            <label>Task Description</label>
            <textarea
              rows='5'
              className='form-control'
              value={desc}
              name='taskDescription'
              onChange={handleChange}></textarea>
          </div>
          <div className='form-group'>
            <label>Task Time (In Minutes)</label>
            <input
              type='number'
              className='form-control'
              value={timer}
              name='taskTimer'
              onChange={handleChange}></input>
            {timer && <div>{convertHMS(timer * 60, true)}</div>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color='primary' onClick={handleEdit}>
          Save
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTask
