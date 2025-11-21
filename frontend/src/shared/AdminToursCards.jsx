import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";

const AdminToursCards = ({ tour, index, removeTourFromUI }) => {
  const { token } = useContext(AuthContext);
  const { title, city, photo, maxGroupSize, featured, reviews, _id } = tour;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const res = await fetch(`${BASE_URL}/tour/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { message } = await res.json();

      if (res.ok) {
        removeTourFromUI(_id); // remove from UI immediately
        toast.success(message, {
          position: "top-right",
          autoClose: 2500,
          style: {
            background: "#004d33", // same dark green premium
            color: "#f4fff4",
            fontWeight: "600",
            borderRadius: "12px",
          },
        });
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 2500,
          style: {
            background: "#8b0000",
            color: "#f4fff4",
            fontWeight: "600",
            borderRadius: "12px",
          },
        });
      }
    } catch (err) {
      toast.error("Server not responding", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#8b0000",
          color: "#f4fff4",
          fontWeight: "600",
          borderRadius: "12px",
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2 items-center bg-[#00291e]/70 text-white p-2 rounded-xl hover:bg-[#00391f]/80 transition-all">
      <p className="text-center">{index}</p>
      <div className="flex justify-center items-center">
        <img
          src={photo}
          alt={title}
          className="h-16 w-24 object-cover rounded-xl"
        />
      </div>
      <p className="text-left">{title}</p>
      <p className="text-center">{city}</p>
      <p className="text-center">{featured ? "Yes" : "No"}</p>
      <p className="text-center">{maxGroupSize}</p>
      <p className="text-center">{reviews.length}</p>
      <div className="flex justify-center gap-2">
        <Link
          to={`/update-tour/${_id}`}
          className="text-blue-400 hover:text-blue-600"
        >
          <FaEdit size={22} />
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600"
        >
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default AdminToursCards;
