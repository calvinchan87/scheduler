import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment"

import "components/Application.scss";

const axios = require('axios').default;

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Alice Anderson",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];

const iterate = appointments.map(appointment => {
  return (<Appointment key={appointment.id} {... appointment} />)
});

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("api/days")
    .then(function (response) {
      // console.log(response);
      setDays(response.data);
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            // days={days}
            // day={"Monday"}
            // setDay={day => console.log(day)}
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul className="interviewers__list">{iterate} <Appointment key="last" time="5pm" /></ul>
      </section>
    </main>
  );
}

// export default function InterviewerList(props){

//   const interviewers = props.interviewers.map(interviewer => {

//     return (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === props.interviewer}
//         setInterviewer={event => props.setInterviewer(interviewer.id)}
//       />
//     )
//   })

//     return (
//       <section className="interviewers">
//         <h4 className="interviewers__header text--light">Interviewer</h4>
//         <ul className="interviewers__list">{interviewers}</ul>
//       </section>
//     )
//   }