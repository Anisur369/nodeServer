import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";

function ProfileNav() {
  const { user, signOutUser } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <span className="mx-auto">
          <b className="text-[18px]">{user?.displayName}</b>
        </span>
        <hr />
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <button onClick={() => signOutUser()} className="link link-hover">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
