import React from 'react'
import { connect } from 'react-redux'
import Note from './Note'

import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
  const notesToShow = () => {
    if ( props.filter === 'ALL' ) {
      return props.notes
    }

    return props.filter === 'IMPORTANT'
      ? props.notes.filter(note => note.important)
      : props.notes.filter(note => !note.important)
  }


  return (
    <ul>
      {props.visibleNotes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleImportanceOf(note.id)}
        />
      )}
    </ul>
  )
}

const notesToShow = ({ notes, filter }) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
  return {
    visibleNotes: notesToShow(state)
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
