import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center rounded-2xl mb-8">

      <h1 className="text-3xl font-bold text-blue-600">
        SprintHive
      </h1>

      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;