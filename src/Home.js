import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchedLocation from "./SearchedLocation";
import MapExport from "./MapExport";

export default function Home() {
    const user = useSelector(state => state.authentication.user);
    return (
      <div>
        <h1>Hi {user.firstName},</h1>
        <p>
          <Link to="/login">Logout</Link>
        </p>
        <MapExport />
        <SearchedLocation />
      </div>
    );
}