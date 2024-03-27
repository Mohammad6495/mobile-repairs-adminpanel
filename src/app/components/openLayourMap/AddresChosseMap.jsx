import React, { useEffect, useState } from "react";
import MapBox from "./Map";
import { useLocation } from "react-router";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon, Stroke } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get, toLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";
// import colorPin from "../../assets/images/map.png";
////

////
function addUserFeature(params) {
  var iconStyle = new Style({
    image: new Icon({
      // anchorXUnits: "fraction",
      // anchorYUnits: "pixels",
      size: [32, 34],
      anchor: [0.5, 1],
      // src: colorPin,
    }),
  });
  let feature = new Feature({
    geometry: new Point(fromLonLat(params)),
  });
  feature.setStyle(iconStyle);
  return feature;
}
////
/////////////////////////
/////////////////////////
const OLAddressMap = ({ destination, onDestinationSelected }) => {
  // initial config
  const location = useLocation();
  const [center, setCenter] = useState(destination);
  const [zoom, setZoom] = useState(15);
  // features
  const [userFeature, setUserFeature] = useState();
  
  const handleClick = (e, map) => {
    const lnglat = toLonLat(e);
    if (onDestinationSelected) {
      onDestinationSelected([lnglat[1], lnglat[0]]);
    }
    setCenter(lnglat)

  };

  // useEffects
  useEffect(() => {
    if (destination) {
      const lnglat = [destination[1], destination[0]];
      setUserFeature(null);
      setTimeout(() => {
        setCenter(lnglat);
        // setUserFeature(addUserFeature(lnglat));
      }, 0);
    }
  }, [destination]);
  ////////////////////////
  return (
    <div>
      <MapBox
        center={fromLonLat(center)}
        zoom={zoom}
        onDestinationSelected={onDestinationSelected}
        onClick={handleClick}
      >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>

        {userFeature && (
          <VectorLayer source={vector({ features: [userFeature] })} />
        )}
      </MapBox>
    </div>
  );
};

export default OLAddressMap;
