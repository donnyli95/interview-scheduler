import React from "react";
import "./styles.scss"

import { Header, Show, Empty, Form, Status, Error, Confirm } from "./components"
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const CONFIRM = "CONFIRM"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      })
  }

  function confirmAction () {
    transition(CONFIRM)
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  function editInterview() {
    transition(EDIT);
  }


  return (
    <article 
      className="appointment"
      data-testid="appointment"
    >
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmAction}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
        message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message= "Are you sure you would like to delete?"
        onCancel={back}
        onConfirm={deleteInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message = "Error Saving"
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message = "Error Deleting"
        onClose={back}
        />
      )}
      
    </article>
  )
}