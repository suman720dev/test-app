import React from 'react';
import { Map, TileLayer, Popup } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import { useDispatch } from "react-redux";

import { addLocation } from "./actions/location";

function myPopup(SearchInfo, dispatch) {
  let location = {
    info: SearchInfo.info,
    lat: SearchInfo.latLng["lat"],
    lng: SearchInfo.latLng["lng"],
  };
  dispatch(addLocation(location));
  return (
    <Popup>
      <div>
        <p>{SearchInfo.info}</p>
      </div>
    </Popup>
  );
}

export default function Openmap() {
  
    const dispatch = useDispatch();
    return (
      <div>
        <p>Search location</p>
        <Map center={[45.4, -75.7]} zoom={6}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ReactLeafletSearch
            popUp={(result) => myPopup(result, dispatch)}
            className="custom-style"
            position="topleft"
            inputPlaceholder="search location"
            search={[]}
            zoom={6} // Default value is 10
            showMarker={true}
            showPopup={true}
            openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
            closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
            providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
            customProvider={undefined | { search: (searchString) => {} }}
          />
        </Map>
      </div>
    );
}