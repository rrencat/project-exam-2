import { Menu, Navbar } from "react-daisyui";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/logout/LogOutButton";
import { useToken } from "../../stores/useUserStore"; 

export default function Header() {
    const { token, isManager } = useToken();


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
                <NavLink to="/">
                    Home
                </NavLink>
            </Menu.Item>
            {!token ? (
                <>
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
                </>
            ) : (
                <>
                    <Menu.Item>
                            <NavLink to={isManager ? "/manager" : "/customer"}>
                                Profile
                            </NavLink>
                        </Menu.Item>
                    <LogoutButton />
                </>
			)}
          </Menu>
        </div>
      </Navbar>
  );
}