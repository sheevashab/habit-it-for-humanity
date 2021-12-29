import classes from "./HabitList.module.css";
import HabitItem from "./HabitItem";

export default function HabitList(props) {
  return (
    <ul>
      {props.habits.map((habit) => (
        <HabitItem
          key={habit.id}
          id={habit.id}
          title={habit.title}
          description={habit.description}
          frequency={habit.frequency}
        />
      ))}
    </ul>
  );
}
