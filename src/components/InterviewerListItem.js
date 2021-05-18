import React from "react";
import "components/InterviewerListItem.scss"

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  let buttonClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li 
      key={props.id}
      className={buttonClass}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={props.setInterviewer}
      />
      {props.selected && props.name}
    </li>
  );
};