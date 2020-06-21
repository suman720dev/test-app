import React from "react";
import ReactLeafletSearch from "react-leaflet-search";
import { connect } from "react-redux";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  FeatureGroup,
  withLeaflet,
  Popup,
} from "react-leaflet";
import { addLocation } from "./actions/location";
import { DOCDownloadLink } from "./Location-doc";

import PrintControlDefault from "react-leaflet-easyprint";
const PrintControl = withLeaflet(PrintControlDefault);

class MapExport extends React.Component {
  constructor() {
    super();
    this.print = this.print.bind(this);

    this.state = {
      center: [45.4, -75.7],
      zoom: 6,
      minZoom: 1,
      maxZoom: 22,
    };
    this.baseMaps = [
      {
        name: "OpenStreet Map",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
        type: "tile",
      },
    ];
    this.mapElement = (
      <Map {...this.state} id="user_searched">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ReactLeafletSearch
          popUp={(result) => this.myPopup(result)}
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
        <PrintControl
          ref={(ref) => {
            this.printControl = ref;
          }}
          title="Export as PNG"
          tileWait={500}
          position="topleft"
          sizeModes={["A4Landscape"]}
          hidden={true}
          hideControlContainer={true}
          filname={"User recent search"}
        />
      </Map>
    );
  }

  myPopup(SearchInfo) {
    let location = {
      info: SearchInfo.info,
      lat: SearchInfo.latLng["lat"],
      lng: SearchInfo.latLng["lng"],
    };
    this.props.addLocation(location);
    return (
      <Popup>
        <div>
          <p>{SearchInfo.info}</p>
        </div>
      </Popup>
    );
  }

  print() {
    this.printControl.printMap("A4Landscape", "User recent search");
  }

  renderBaseLayerControl() {
    return (
      <LayersControl position="topright">
        {this.baseMaps.map(
          ({
            name,
            url,
            attribution,
            type,
            layer,
            format,
            checked = false,
          }) => {
            return type === "wms" ? (
              <LayersControl.BaseLayer key={name} name={name} checked={checked}>
                <WMSTileLayer
                  layers={layer}
                  format={format}
                  transparent={false}
                  url={url}
                  attribution={attribution}
                />
              </LayersControl.BaseLayer>
            ) : (
              <LayersControl.BaseLayer key={name} name={name} checked={checked}>
                <TileLayer attribution={attribution} url={url} />
              </LayersControl.BaseLayer>
            );
          }
        )}
        <LayersControl.BaseLayer name="ImageryLabels">
          <FeatureGroup>
            <TileLayer
              attribution="Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community"
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              attribution=""
              url="http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              attribution=""
              url="http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
            />
          </FeatureGroup>
        </LayersControl.BaseLayer>
      </LayersControl>
    );
  }

  render() {
    const { location, user } = this.props;
    return (
      <div>
        {location.length > 0 ? (
          <>
            <a
              role="button"
              href={void 0}
              id="export"
              onClick={this.print}
              style={{ color: "#007bff" }}
            >
              Print(or Export) as PDF
            </a>
            |
            <DOCDownloadLink
              fileName={`user_${user.id}_searched`}
              elementId="docx"
            />
          </>
        ) : (
          ""
        )}
        {this.mapElement}
        {/* <Map {...this.state}>
          {this.renderBaseLayerControl()}
          <PrintControl
            ref={(ref) => {
              this.printControl = ref;
            }}
            {...printOptions}
          />
          <PrintControl {...downloadOptions} />
          <GeoJSON data={geojson} />
        </Map> */}
      </div>
    );
  }
}

function mapState(state) {
  const { location, authentication } = state;
  const { user } = authentication;
  return { location, user };
}

const actionCreators = {
  addLocation: (location) => addLocation(location),
};
const connectedMapExport = connect(mapState, actionCreators)(MapExport);
export default connectedMapExport;

