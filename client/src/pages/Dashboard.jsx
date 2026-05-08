import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium"
  });

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks/create",
        {
          title: formData.title,
          description: formData.description,
          project: "69fdcdf0c02d910b66d6ab12",
          assignedTo: "69fdcdf0c02d910b66d6ab12",
          dueDate: formData.dueDate,
          priority: formData.priority
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium"
      });

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        {
          status: "completed"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {

      if (filter === "completed") {
        return task.status === "completed";
      }

      if (filter === "pending") {
        return task.status === "pending";
      }

      return true;

    });

  return (

    <div className={`min-h-screen p-8 transition duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        : "bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100 text-black"
    }`}>

      <div className="max-w-7xl mx-auto">

        <Navbar />

        {/* Dark Mode Button */}

        <div className="flex justify-end mb-6">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black text-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
          >

            {
              darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"
            }

          </button>

        </div>

        {/* Hero Section */}

        <div className="text-center mb-14 mt-6">

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SprintHive
          </h1>

          <p className={`text-xl ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}>
            Smart Productivity & Task Management Platform
          </p>

        </div>

        {/* Analytics Cards */}

        <div className="grid md:grid-cols-3 gap-8 mb-12">

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">

            <h2 className="text-5xl font-bold">
              {tasks.length}
            </h2>

            <p className="mt-3 text-lg">
              Total Tasks
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">

            <h2 className="text-5xl font-bold">
              {completedTasks}
            </h2>

            <p className="mt-3 text-lg">
              Completed Tasks
            </p>

          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">

            <h2 className="text-5xl font-bold">
              {pendingTasks}
            </h2>

            <p className="mt-3 text-lg">
              Pending Tasks
            </p>

          </div>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search Tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full backdrop-blur-lg border border-white/20 p-5 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl ${
            darkMode
              ? "bg-white/10 text-white"
              : "bg-white/70 text-black"
          }`}
        />

        {/* Filter Buttons */}

        <div className="flex flex-wrap gap-4 mb-10">

          <button
            onClick={() => setFilter("all")}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="bg-yellow-500 text-white px-6 py-3 rounded-2xl hover:bg-yellow-600 transition duration-300 shadow-lg"
          >
            Pending
          </button>

        </div>

        {/* Create Task Form */}

        <form
          onSubmit={handleSubmit}
          className={`backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl mb-14 ${
            darkMode
              ? "bg-white/10"
              : "bg-white/70"
          }`}
        >

          <h2 className="text-3xl font-bold mb-8">
            Create New Task
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl mb-6 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="High">
              High Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="Low">
              Low Priority
            </option>

          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:scale-105 transition duration-300 shadow-xl"
          >
            Create Task
          </button>

        </form>

        {/* Task Cards */}

        <div className="grid md:grid-cols-2 gap-10">

          {
            filteredTasks.length === 0 ? (

              <div className={`col-span-2 backdrop-blur-lg border border-white/20 p-16 rounded-3xl shadow-2xl text-center ${
                darkMode
                  ? "bg-white/10"
                  : "bg-white/70"
              }`}>

                <h2 className="text-4xl font-bold mb-4">
                  🚀 No Tasks Found
                </h2>

                <p className={`text-lg ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}>
                  Create your first task and boost productivity.
                </p>

              </div>

            ) : (

              filteredTasks.map((task) => (

                <div
                  key={task._id}
                  className={`backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl hover:-translate-y-2 transition duration-300 ${
                    darkMode
                      ? "bg-white/10 hover:shadow-gray-700"
                      : "bg-white/70 hover:shadow-blue-200"
                  }`}
                >

                  <h2 className="text-3xl font-bold mb-4">
                    {task.title}
                  </h2>

                  <p className={`mb-5 text-lg ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}>
                    {task.description}
                  </p>

                  <p className={`mb-4 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}>
                    📅 Due Date: {task.dueDate?.slice(0, 10)}
                  </p>

                  <p className="mb-4">

                    Priority:

                    <span className={`ml-2 px-3 py-1 rounded-full text-white text-sm font-bold ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}>

                      {task.priority}

                    </span>

                  </p>

                  <p className="mb-6 text-lg">
                    Status:
                    <span className={`ml-2 font-bold ${
                      task.status === "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}>
                      {task.status}
                    </span>
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() => updateStatus(task._id)}
                      className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition duration-300 shadow-lg"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-6 py-3 rounded-2xl hover:bg-red-600 transition duration-300 shadow-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;