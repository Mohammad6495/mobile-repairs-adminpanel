import React, {useRef, useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router'
import './Map.css'
import MapContext from './MapContext'
import * as ol from 'ol'
import {FaLocationDot} from 'react-icons/fa6'

const Map = ({children, zoom, setIsStroke, setIs, center, onClick = () => {}, isStaticMap = false}) => {
  const mapRef = useRef()
  const [map, setMap] = useState(null)
  const location = useLocation()

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({zoom, center}),
      layers: [],
      controls: [],
      overlays: [],
      interactions: isStaticMap ? [] : undefined // Disable interactions if isStaticMap is true
    }
 
    let mapObject = new ol.Map(options)
    mapObject.setTarget(mapRef.current)

    mapObject.on('moveend', (e) => {
      const mapAll = e.map
      const center = mapAll.getView().getCenter()
      onClick(center)
    })
    setMap(mapObject)

    return () => mapObject.setTarget(undefined)
  }, [])

  // zoom change handler
  useEffect(() => {
    if (!map) return
    map.getView().setZoom(zoom)
  }, [zoom])

  // center change handler
  useEffect(() => {
    if (!map) return

    map.getView().setCenter(center)
    // flyTo(center, map.getView());
    // map.getView().animate({
    //   resolution: 4, // jump effect
    //   center: center,
    //   duration: 500,
    // });
  }, [center])

  return (
    <MapContext.Provider value={{map}}>
      <div ref={mapRef} className='ol-map' style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10',
          }}
        >
          <FaLocationDot color='#000' fontSize={30} />
        </div>
        {children}
      </div>
    </MapContext.Provider>
  )
}

export const useMap = () => useContext(MapContext)
export default Map
