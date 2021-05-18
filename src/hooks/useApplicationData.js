import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY:
        return {...state, day: action.value}
      case SET_APPLICATION_DATA:
        return {...state, appointments: action.value.appointments, days: action.value.days, interviewers: action.value.interviewers}
      case SET_INTERVIEW: {
        return {...state, days: action.value.days, appointments: action.value.appointments}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day})
  }
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(function(response) {
         dispatch({ 
          type: SET_APPLICATION_DATA,
          value: {
            days: response[0].data,
            appointments: response[1].data,
            interviewers: response[2].data
          }
        })
      })
  }, [])



  function getSpotsRemaining(currentDay, appointments) {
    const [ toDay ] = state.days.filter ((element) => element.name === currentDay)
    const appointmentList = toDay.appointments
    
    const nullInterviews = Object.values(appointments).filter((appointment) => appointmentList.includes(appointment.id) && appointment.interview === null)

    return nullInterviews.length;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        let days = state.days.map(day => {
          return {...day, spots: getSpotsRemaining(day.name, appointments)}
        })
        dispatch({ type: SET_INTERVIEW, value: { days, appointments }})
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

  
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      let days = state.days.map(day => {
        return {...day, spots: getSpotsRemaining(day.name, appointments)}
      })
      dispatch({ type: SET_INTERVIEW, value: {appointments, days}})
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}