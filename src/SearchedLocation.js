import React from "react";
import { useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";

import LocationPDF from "./Location-pdf";
import { DOCDownloadLink } from "./Location-doc";

export default function SearchedLocation() {
    const locations = useSelector((state) => state.location);
    const user = useSelector((state) => state.authentication.user);
    return (
      <>
        <h2>Recent Search</h2>
        {false && locations.length > 0 ? (
          <>
            <PDFDownloadLink
              document={<LocationPDF locations={locations} user={user} />}
              fileName={`user_${user.id}_searched.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Export as PDF"
              }
            </PDFDownloadLink>{" "}
            |
            <DOCDownloadLink
              fileName={`user_${user.id}_searched`}
              elementId="docx"
            />
          </>
        ) : (
          ""
        )}
        {/* <PDFViewer> <LocationPDF /> </PDFViewer> */}

        <div id="docx">
          <div className="WordSection1">
            <table className="table table-bordered">
              <caption>Recent Search</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Location</th>
                  <th scope="col">Lat</th>
                  <th scope="col">Lng</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{location.info}</td>
                    <td>{location.lat}</td>
                    <td>{location.lng}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}
