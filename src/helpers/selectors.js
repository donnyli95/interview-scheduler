export const getAppointmentsForDay = (state, day) => {
  let appointmentsForDay = [];
  const filteredDay = state.days.filter(dayObj => dayObj.name === day);
  if (filteredDay.length > 0) {
    for (let appointment of filteredDay[0].appointments) {
      if (state.appointments[appointment]) {
        appointmentsForDay = [...appointmentsForDay, state.appointments[appointment]];
      }
  
    }
  }
  return appointmentsForDay;
};



export const getInterview = (state, interview) => {
  let interviewObj = {};
  if (interview && interview.interviewer) {
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    interviewObj.student = interview.student;
  } else {
    return null;
  }

  return interviewObj;
}

export const getInterviewersForDay = (state, day) => {
  let interviewersForDay = [];
  const filteredDay = state.days.filter(dayObj => dayObj.name === day);
  if (filteredDay.length > 0) {
    for (let interviewer of filteredDay[0].interviewers) {
      if (state.interviewers[interviewer]) {
        interviewersForDay = [...interviewersForDay, state.interviewers[interviewer]];
      }
  
    }
  }
  return interviewersForDay;
};