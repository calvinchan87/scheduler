export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointmentsForDay = state.days.filter(today=> today.name === day);
  // console.log(appointmentsForDay[0].appointments)

  let appointmentArray = [];

  if (appointmentsForDay[0] === undefined) {
    return appointmentArray;
  }

  for (let id of appointmentsForDay[0].appointments) {
    // console.log(state.appointments[id])
    appointmentArray.push(state.appointments[id])
  }
  return appointmentArray;

}