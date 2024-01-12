import { Menu, Navbar } from "react-daisyui";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <Navbar>
        <div className="flex-1">
            <NavLink to="/" className="normal-case text-xl">
                Holidaze
            </NavLink>
        </div>
        <div className="flex">
          <Menu horizontal={true} className="px-1">
            <div>
                <NavLink to="/register" className="p-4">
                    Register
                </NavLink>
            </div>
            <div>
                <NavLink to="/login">
                    Login
                </NavLink>
            </div>
          </Menu>
        </div>
      </Navbar>
  );
}