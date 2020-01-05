import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => (
  <div className={props.notification.type}>
    {props.notification.message}
  </div>
)

// yhdistetään redux-tila propsiin
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
)(Notification)
