import classes from "./HabitItem.module.css";
import { useRouter } from "next/router";

function HabitItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <li>
      <h2>{props.title}</h2>
      <h2>{props.description}</h2>
      <h2>{props.frequency}</h2>
      <button onClick={showDetailsHandler}>Show Details</button>
    </li>
  );
}

export default HabitItem;
