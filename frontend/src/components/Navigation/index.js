import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton />
    );
  } else {
    sessionLinks = (
      <>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
      </>
    )
  }

  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      {sessionLinks}
    </ul>
  );
};

export default Navigation;