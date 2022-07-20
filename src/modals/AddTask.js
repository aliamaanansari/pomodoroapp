import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { convertHMS } from '../utils/time'

const CreateTask = ({ modal, toggle, saveTask }) => {
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

  const handleSave = () => {
    let taskobj = {}
    taskobj['name'] = taskName
    taskobj['description'] = desc
    taskobj['time'] = timer
    saveTask(taskobj)
  }

  return (
    <Modal show={modal} onHide={toggle} backdrop centered>
      <Modal.Header>
        <Modal.Title>Create Task</Modal.Title>
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
              onChange={handleChange}
            />
            {timer && <div>{convertHMS(timer * 60, true)}</div>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Create</Button>
        <Button variant='danger' onClick={toggle}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTask
