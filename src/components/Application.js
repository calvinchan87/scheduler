import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors"

import "components/Application.scss";

const axios = require('axios').default;

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Alice Anderson",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   }
// ];

// const iterate = appointments.map(appointment => {
//   return (<Appointment key={appointment.id} {... appointment} />)
// });

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  // const dailyAppointments = [];
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const iterateAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
      />
    );
  });

  const interviewers = getInterviewersForDay(state, state.day);
  console.log(interviewers)

  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState({ ...state, days });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   axios.get("api/days")
  //   .then(function (response) {
  //     // console.log(response);
  //     // setDays(response.data);
  //   })
  // }, []);

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
    
      const [first, second, third] = all;
    
      // console.log(first.data, second.data, third.data);

      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}));
    });

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
            days={state.days}
            day={state.day}
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
        <ul className="interviewers__list">{iterateAppointments} <Appointment key="last" time="5pm" /></ul>
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