import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
      <>
        <li className='login-modal'><LoginFormModal /></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
      </>
    )
  }

  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
};

export default Navigation;