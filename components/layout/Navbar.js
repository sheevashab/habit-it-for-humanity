import classes from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>Habit-it for Humanity</h1>
      <ul>
        <li>
          <Link href="/">All Habits</Link>
        </li>
        <li>
          <Link href="/create-habit">Add Habit</Link>
        </li>
      </ul>
    </nav>
  );
}
