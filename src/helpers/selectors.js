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

export function getInterview(state, interview) {

  // The function should return a new object containing the interview data when we pass it an object that contains the interviewer.
  // Otherwise, the function should return null. 
  // console.log(state);
  // console.log(interview);

  let interviewObject = interview;

  if (interview) {
    let interviewerID = interview.interviewer;
    // console.log(state.interviewers[interviewerID]);
    interviewObject.interviewer = state.interviewers[interviewerID];
    // console.log(interviewObject);
  }

  return interviewObject;

}