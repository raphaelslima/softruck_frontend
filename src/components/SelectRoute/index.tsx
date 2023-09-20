import { useTranslation } from "react-i18next"
import {useState, useEffect} from 'react'

//Style
import '../../styles/selectRoute.scss'

//icons
import {FaMapMarkerAlt} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'

//Components
import ItemList from "../ItemList"

//Database
import data from '../../api/frontend_data_gps.json'

//Types
import { Course } from "../../interfaces/course"

const SelectRoute = ()=>{

  const {t} = useTranslation()
  const [showSelectRoute, setShowSelectRoute] = useState(true)
  const [routes, setRoutes] = useState<Course[]>([])

  useEffect(()=>{
    const newRoutesArray: Course[] = []
    data.courses.forEach((course)=>{
      newRoutesArray.push({
        start_at: course.start_at,
        end_at: course.end_at,
        distance: course.distance,
        duration: course.duration,
        gps: course.gps
      })
    })
    setRoutes(newRoutesArray)
  },[])

  console.log(routes)

  return(
    <div className="container">
      {
        showSelectRoute ? (
          <div className="containerBtnSelect">
            <button className="btnSelectRoute" onClick={()=> setShowSelectRoute(false)}>
              <FaMapMarkerAlt color='#ff0000' />
              {t('Selecione trajeto')}
            </button>
      </div>
        ) : (
          <div className="listRoutes">
            <div className="headerListRoutes">
              <h2 className="titleRoutes">{t('Trajetos')}</h2>
              <button className="iconClose" onClick={()=> setShowSelectRoute(true)}>
                <AiFillCloseCircle color='ff0000'/>
              </button>
            </div>
            <ul className="container">
              {routes.map((route, i) => (
                <ItemList route={route} key={i}/>
              ))}
            </ul>
          </div>
        )
      }

    </div>
  )
}

export default SelectRoute