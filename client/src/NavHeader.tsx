import React from "react";
import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        
        <li className="dropdown">
          <NavLink to="/albums">Albums</NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/addAlbum">Add Album</NavLink>
            </li>
            <li>
              <NavLink to="/editAlbum">Edit Album</NavLink>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <NavLink to="/customers">Customers</NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/addCustomer">Add Customer</NavLink>
            </li>
            <li>
              <NavLink to="/editCustomer">Edit Customer</NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink to="/store">Store</NavLink>
        </li>

        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
{/*
        {auth.isLoggedIn() && (
          <>
            <li>
              <NavLink to="/addParticipants">Add and Edit Participants</NavLink>
            </li>
            <li>
              <NavLink to="/addDisciplines">Add and Edit Disciplines</NavLink>
            </li>
            <li>
              <NavLink to="/addResults">Add and Edit Results</NavLink>
            </li>
          </>
        )}
        <AuthStatus />
      */}
      </ul>
    </nav>
  );
}
