import React from 'react'

const Notification = (props) => {
  const notification = props.store.getState().notification
  if (!notification)
    return (<div></div>)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
