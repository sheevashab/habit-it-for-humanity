import classes from "./HabitList.module.css";
import HabitItem from "./HabitItem";

function HabitList(props) {
  console.log(props);
  return (
    <ul className={classes.ul}>
      {props.habits.map((habit) => (
        <HabitItem
          key={habit?.id}
          id={habit?.id}
          title={habit?.title}
          frequency={habit?.frequency}
        />
      ))}
    </ul>
  );
}

export default HabitList;
