import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewHabitForm from "../../components/habits/NewHabitForm";

function CreateHabit() {
  const router = useRouter();
  async function addHabitHandler(enteredHabitData) {
    //sends request to pages/api/create-habit folder to trigger handler function
    const response = await fetch("/api/create-habit", {
      method: "POST",
      //data attached to request
      //has to be js object that carries data we want to store in our database
      //enteredHabitData comes from components/NewHabitForm
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

      <NewHabitForm onAddHabit={addHabitHandler} />
    </Fragment>
  );
}

export default CreateHabit;
