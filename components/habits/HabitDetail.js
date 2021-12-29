import classes from "./HabitDetail.module.css";

export default function HabitDetail(props) {
  return (
    <div className={classes.detail}>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h2>{props.frequency}</h2>
    </div>
  );
}
