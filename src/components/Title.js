import React from 'react'
import { useHistory } from 'react-router-dom'

function Title(props) {
  const history = useHistory()

  return (
    <div>
      <h1 onClick={(e) => history?.push('/')}>UI-QMako</h1>
    </div>
  )
}

export default Title
