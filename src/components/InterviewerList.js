import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import propTypes from "prop-types";


export default function InterviewerList(props) {
  const interviewList = props.interviewers.map (interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    )
  })

  InterviewerList.propTypes = {
    interviewers: propTypes.array.isRequired
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewList}
      </ul>
    </section>
  )
}