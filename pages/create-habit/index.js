import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewHabitForm from "../../components/habits/NewHabitForm";

export default function CreateHabit() {
  const router = useRouter();

  async function addHabitHandler(enteredHabitData) {
    const response = await fetch("/api/create-habit", {
      method: "POST",
      body: JSON.stringify(enteredHabitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Create a New Habit-It</title>
        <meta
          name="description"
          content="Create a new habit and stay on top of all of the things you want to accomplish this week."
        />
      </Head>
      <NewHabitForm onAddHabit={addHabitHandler} />;
    </Fragment>
  );
}
