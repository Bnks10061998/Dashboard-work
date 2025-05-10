// import React, { useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { enUS } from "date-fns/locale";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const CalendarPage = () => {
//   const [events, setEvents] = useState([
//     {
//       title: "Client Meeting",
//       start: new Date(2025, 4, 10, 10, 0),
//       end: new Date(2025, 4, 10, 11, 0),
//     },
//     {
//       title: "Design Review",
//       start: new Date(2025, 4, 11, 14, 0),
//       end: new Date(2025, 4, 11, 15, 0),
//     },
//   ]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Calendar</h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//       />
//     </div>
//   );
// };

// export default CalendarPage;


import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Client Meeting",
      start: new Date(2025, 4, 10, 10, 0),
      end: new Date(2025, 4, 10, 11, 0),
    },
    {
      title: "Design Review",
      start: new Date(2025, 4, 11, 14, 0),
      end: new Date(2025, 4, 11, 15, 0),
    },
  ]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.title.toLowerCase().includes("meeting")
      ? "#1e90ff"
      : "#28a745";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        border: "none",
        padding: "4px",
      },
    };
  };

  const handleSlotSelect = ({ start, end }) => {
    const title = prompt("Enter Event Title:");
    if (title && title.trim()) {
      setEvents([...events, { title, start, end }]);
    }
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updated = events.map((e) =>
      e === event ? { ...e, start, end } : e
    );
    setEvents(updated);
  };

  const handleEventResize = ({ event, start, end }) => {
    const updated = events.map((e) =>
      e === event ? { ...e, start, end } : e
    );
    setEvents(updated);
  };

  const handleEventSelect = (event) => {
    const action = window.prompt(
      `Edit or delete event:\n\nCurrent Title: ${event.title}\n\nType new title to rename, or leave empty to delete:`
    );
    if (action === null) return; // Cancel
    if (action.trim() === "") {
      // Delete
      setEvents(events.filter((e) => e !== event));
    } else {
      // Rename
      setEvents(
        events.map((e) =>
          e === event ? { ...e, title: action.trim() } : e
        )
      );
    }
  };

  return (
    <div className="bg-[#1a3a8b] text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">📅 Calendar</h2>
      <div className="bg-white rounded-lg p-4 text-black shadow-lg">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          resizable
          onSelectSlot={handleSlotSelect}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          onSelectEvent={handleEventSelect}
          eventPropGetter={eventStyleGetter}
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
