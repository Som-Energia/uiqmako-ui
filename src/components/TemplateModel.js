import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TreeItem from '@material-ui/lab/TreeItem'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  singleItem: {
    margin: '0.4rem 0',
  },
})

function TemplateModel(props) {
  const { item } = props
  const { id = '', model, quantity } = item
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <TreeItem
        nodeId={id}
        label={
          <ListItem
            button
            className={classes.singleItem}
            key={1}
            onClick={(e) => history.push('/templatesByModel/' + item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        }
      />
    </>
  )
}

export default TemplateModel
