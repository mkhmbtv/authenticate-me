import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false)
    };

    document.addEventListener('click', closeMenu);
    
    return () => {
      document.removeEventListener('click', closeMenu);
    }
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  }

  return (
    <>
      <button className='btn-profile' onClick={openMenu}>
        <i className="far fa-user-circle"></i>
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;