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
            <Menu.Item>
                <NavLink to="/register">
                    Register
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/login">
                    Login
                </NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </Navbar>
  );
}