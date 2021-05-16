import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={[]}
        onCancel={back}
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