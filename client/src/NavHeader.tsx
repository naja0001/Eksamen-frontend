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
          <li>
          <NavLink to="/albums">Albums</NavLink>
          </li>
          <li>
            <NavLink to="/store">Store</NavLink>
          </li>
          {auth.isLoggedIn() && (
          <>
            <li>
              <NavLink to="/addAlbum">Add Album</NavLink>
            </li>
            <li>
              <NavLink to="/reservations">Reservations</NavLink>
            </li>
          </>
        )}
        <AuthStatus />
      </ul>
    </nav>
  );
}
