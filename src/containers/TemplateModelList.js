import { React, useEffect, useState } from 'react'
import { getTemplateList } from 'services/api'
import TemplateModel from 'components/TemplateModel'
import { useAuth } from 'context/currentUser'

function TemplateModelList() {
  const [data, setData] = useState([])
  const [templateModelData, setTemplateModelData] = useState([])
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTemplateList(currentUser.id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [currentUser])

  useEffect(() => {
    let dict = {} // create an empty array

    for (let i = 0; i < data.length; i++) {
      dict[data[i].model] = data[i].model in dict ? dict[data[i].model] + 1 : 1
    }
    let modelAndQuantity = []
    let count = 0
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        modelAndQuantity.push({ id: count, model: key, quantity: dict[key] })
        count += 1
      }
    }
    console.log(modelAndQuantity)
    setTemplateModelData(dict)
    console.log(dict)
  }, [data])

  return (
    <div>
      {Object.entries(templateModelData)?.map(([item, index]) => (
        <div>
          <TemplateModel key={index} item={item} />
        </div>
      ))}
    </div>
  )
}

export default TemplateModelList
