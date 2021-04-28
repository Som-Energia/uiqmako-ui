import {React, Component, useEffect, useState} from 'react'
import TemplateInfo from '../components/TemplateInfo';
import {getTemplateList} from '../services/api'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
  newTemplateButtom: {
    borderRadius: "50%",
    fontSize: "2rem",
    position: "fixed",
    right: "5%",
    bottom: "5%",

  }
  }));


function TemplateList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles();


  useEffect(() => {
    console.log("Entro??")
    getTemplateList()
      .then((response) => {
        setData(response)
        setIsLoading(false)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  },[])

  var items = data?.map((item, index) => {
  return (
      <TemplateInfo key={index} item={item}/>
    );
  });
  return (
    <div>
      <ul className="list-template"> {items} </ul>
      <Button
        color="primary"
        variant="contained"
        className={classes.newTemplateButtom}
        to={{ pathname: "/newTemplate"}}
        component={Link}
      >
        +
      </Button>
    </div>
  );
}


export default TemplateList