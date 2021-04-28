import {React, Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "2rem",
    width: "80%",
    padding: "2rem",
    margin: "0 auto",
    marginTop: "1.5rem",
    textAlign: "center",
  },
  flexDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",

  },
  name: {
    paddingBottom: "1rem",
    color: "#282c34",
  },
  info: {
    color: "#7c828e",
  }
  }));

function TemplateInfo(props) {
  const {item} =  props
  const { name, xml_id, model, id = ''} = item
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
      <Typography variant="h3" className={classes.name}>{name}</Typography>
      <div className={classes.flexDiv}>
        <Typography variant="subtitle1" className={classes.info}>model: {model}</Typography>
        <Typography variant="subtitle1" className={classes.info}>xml_id: {xml_id}</Typography>
      </div>
      </Paper>
    </div>
  );
}

export default TemplateInfo