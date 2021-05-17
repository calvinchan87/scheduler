import { useState, useEffect } from "react";

const axios = require('axios').default;

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      // console.log(id)
      // console.log(state)
      // if (state.day === "Monday") {
      //   let count = 0;
      //   for (let x = 1; x < 6; x++) {
      //     if (state.appointments.x.interview === null) {
      //       count++;
      //     }
      //   }
      //   console.log(count);
      // }
      setState({
        ...state,
        appointments
      });
    })
  }

  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({
        ...state,
        appointments
      });
    })
  }

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

  return { state, setDay, bookInterview, cancelInterview };
  
}