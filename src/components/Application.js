import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  // const dailyAppointments = [];
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const iterateAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // const setDays = days => setState({ ...state, days });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   axios.get("api/days")
  //   .then(function (response) {
  //     // console.log(response);
  //     // setDays(response.data);
  //   })
  // }, []);

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
        {iterateAppointments} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}