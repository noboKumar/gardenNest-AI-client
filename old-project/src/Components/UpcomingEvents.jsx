import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const UpcomingEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("upcomingEvents.json")
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="space-y-10 mt-20">
      {loading && <Loading></Loading>}
      <h1 className="text-2xl md:text-4xl font-semibold text-secondary text-center">
        Upcoming Gardening Events:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventData.map((event) => (
          <div
            key={event.id}
            className="space-y-2 border-2 border-secondary bg-base-200 rounded-2xl px-10 py-6 shadow-sm"
          >
            <img
              className=" h-56 w-full object-cover rounded-2xl mx-auto"
              src={event.image}
              alt="trending tips photo"
            />
            <h1 className="text-2xl">{event.title}</h1>
            <p>Organizer: {event.organizer}</p>
            <p>Location: {event.location}</p>
            <p>Time: {event.time}</p>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() =>
                document.getElementById("join_event_modal").showModal()
              }
            >
              {event.ctaText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
