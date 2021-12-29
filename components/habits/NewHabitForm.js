import { useRef } from "react";
import classes from "./NewHabitForm.module.css";

export default function NewHabitForm(props) {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const frequencyInput = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredTitle = titleInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredFrequency = frequencyInput.current.value;

    const habitData = {
      title: enteredTitle,
      description: enteredDescription,
      frequency: enteredFrequency,
    };

    props.onAddHabit(habitData);
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="title">Habit Title</label>
      <input type="text" required id="title" ref={titleInput} />

      <label htmlFor="description">Habit Description</label>
      <textarea
        type="text"
        required
        id="description"
        rows="2"
        ref={descriptionInput}
      />

      <label htmlFor="frequency">Habit Frequency</label>
      <input type="text" required id="frequency" ref={frequencyInput} />

      <button>Habit-It!</button>
    </form>
  );
}
