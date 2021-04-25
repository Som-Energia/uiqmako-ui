import {React, Component, useEffect, useState} from 'react'
import TemplateInfo from '../components/TemplateInfo';
import {getTemplateList} from '../services/api'
import Button from "@material-ui/core/Button";

function TemplateList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    console.log("Entro??")
    getTemplateList()
      .then((response) => {
        console.log("Aqui")
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  },[])
  console.log("data", data)

  var items = data?.map((item, index) => {
  return (
      <TemplateInfo key={index} item={item}/>
    );
  });
  return (
    <div>
      <ul className="list-template"> {items} </ul>
      <Button
        color="secondary"
        variant="contained"
        //className={classes.actionButtom}
      >
        +
      </Button>
    </div>
  );
}


export default TemplateList