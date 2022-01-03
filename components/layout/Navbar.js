import classes from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={classes.header}>
      <h1 className={classes.logo}>Habit-it for Humanity</h1>
      <ul className={classes.header}>
        <li className={classes.header}>
          <Link href="/">All Habits</Link>
        </li>
        <li className={classes.header}>
          <Link href="/create-habit">Add Habit</Link>
        </li>
      </ul>
    </nav>
  );
}
