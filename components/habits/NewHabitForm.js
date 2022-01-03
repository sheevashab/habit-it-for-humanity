import { useRef, useState } from "react";
import { daysOfTheWeek } from "./DaysOfWeek";
import classes from "./NewHabitForm.module.css";

function NewHabitForm(props) {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [checkedState, setCheckedState] = useState(
    // declare array to check the state of each checkbox
    //output will be boolean, intial state of unchecked box is false and when clicked is true
    new Array(daysOfTheWeek.length).fill(false)
  );

  const handleOnChange = (position) => {
    //looping over checkedState array with map method
    //if value of checked position matches current index
    //reverse value/state to in this case to true ie checked
    const updatedCheckedState = checkedState.map((day, index) =>
      index === position ? !day : day
    );
    setCheckedState(updatedCheckedState);
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log("Hello!");
    const enteredTitle = titleInput.current.value;
    const enteredDescription = descriptionInput.current.value;

    //this may be where the issue is coming from between how the database is expecting habitData
    //vs the actual response it is getting
    //or it is a promise issue -> as the boolean array of t/f values for checked days is mapped,
    //a value is being read as undefined or null
    console.log(setCheckedState);
    const enteredFrequency = checkedState;
    // const enteredFrequency = Array.current;
    // const enteredFrequency = setCheckedState.Array;
    // const enteredFrequency = JSON.stringify(setCheckedState);
    //const enteredFrequency = setCheckedState;

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
