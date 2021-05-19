import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";

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
    .then (res => {
      transition(SHOW);
    })
    .catch (err => {
      transition(ERROR_SAVE, true);
    })
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then (res => {
      transition(EMPTY);
    })
    .catch (err => {
      transition(ERROR_DELETE, true);
    })
  }

  // console.log(props)

  return <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
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
        message="Are you sure you want to delete this appointment?"
        onCancel={back}
        onConfirm={deleteInterview}
      />
    )}
    {mode === SAVING && (
      <Status
        message="Saving"
      />
    )}
    {mode === ERROR_SAVE && props.interview && (
      <Error
        message="Could not edit appointment."
        onClose={back}
      />
    )}
    {mode === ERROR_SAVE && !props.interview && (
      <Error
        message="Could not save appointment."
        onClose={back}
      />
    )}
    {mode === DELETING && (
      <Status
        message="Deleting"
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Could not delete appointment."
        onClose={back}
      />
    )}
    {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty /> } */}
  </article>

};

// storiesOf("Appointment", module)
//   .addParameters({
//     backgrounds: [{ name: "white", value: "#fff", default: true }]
//   })
//   .add("Appointment", () => <Appointment />)
//   .add("Appointment with Time", () => <Appointment time="12pm" />)
//   .add("Header", () => <Header time="12pm" />)
//   .add("Empty", () => <Empty onAdd={action("onAdd")} />)
//   .add("Show", () => (
//     <Show
//       student="Lydia Miller-Jones"
//       interviewer={interviewer}
//       onEdit={action("onEdit")}
//       onDelete={action("onDelete")}
//     />))
//   .add("Confirm", () => (
//     <Confirm
//       message="Delete the appointment?"
//       onConfirm={action("onConfirm")}
//       onCancel={action("onCancel")}
//     />))
//   .add("Status", () => <Status message="Deleting" />)
//   .add("Error", () => (
//     <Error
//       message="Could not delete appointment."
//       onClose={action("onClose")}
//     />))
//   .add("Edit", () => (
//     <Form
//       name="name here"
//       interviewers={interviewers}
//       interviewer={3}
//       onSave={action("onSave")}
//       onCancel={action("onCancel")}
//       setInterviewer={action("setInterviewer")}
//     />))
//   .add("Create", () => (
//     <Form
//       interviewers={interviewers}
//       onSave={action("onSave")}
//       onCancel={action("onCancel")}
//     />))
//   .add("Appointment Empty", () => (
//     <Fragment>
//       <Appointment id={1} time="12pm" />
//       <Appointment id="last" time="1pm" />
//     </Fragment>))
//   .add("Appointment Booked", () => (
//     <Fragment>
//       <Appointment
//         id={1}
//         time="12pm"
//         interview={{ student: "Lydia Miller-Jones", interviewer }}
//       />
//       <Appointment id="last" time="1pm" />
//     </Fragment>
//   ));