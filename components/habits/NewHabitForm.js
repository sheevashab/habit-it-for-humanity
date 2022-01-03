import { useRef, useState } from "react";
import { daysOfTheWeek } from "./DaysOfWeek";
import classes from "./NewHabitForm.module.css";

function NewHabitForm(props) {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [checkedState, setCheckedState] = useState(
    new Array(daysOfTheWeek.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );
    setCheckedState(updatedCheckedState);
  };

  function submitHandler(e) {
    e.preventDefault();
    const enteredTitle = titleInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredFrequency = checkedState;

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
      <ul className={classes.ul}>
        {daysOfTheWeek.map(({ day }, index) => {
          return (
            <li className={classes.li} key={index}>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={day}
                value={day}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{day}</label>
            </li>
          );
        })}
      </ul>
      <button>Habit-It!</button>
    </form>
  );
}

export default NewHabitForm;
