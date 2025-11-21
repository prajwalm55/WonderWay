import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateToursComp from './UpdateTourComp';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../utils/config';
import back4 from '../../assets/images/bac4.png';

const UpdateTours = () => {
  const { id } = useParams();
  const { apiData: tour, error } = useFetch(`${BASE_URL}/tour/${id}`);

  return (
    <div className="min-h-screen flex items-start justify-center relative pt-28 px-4 md:px-0">
      {/* Background Blur + Gradient */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      ></div>

      {/* Card/Form */}
      <UpdateToursComp tour={tour} id={id} />
    </div>
  );
};

export default UpdateTours;
