import React from "react";
import { useSelector } from "react-redux";

export default function SearchedLocation() {
    const locations = useSelector((state) => state.location);
    return (
      <>
        <h2>Recent Search</h2>
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
      </>
    );
}
