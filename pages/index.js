import HabitList from "../components/habits/HabitList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Habit-It For Humanity</title>
        <meta
          name="description"
          content="Habit-it For Humanity is an easy way to create your very own habit tracker"
        />
      </Head>

      <HabitList habits={props.habits} />
    </Fragment>
  );
}

//connect to database to access all habits
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
  );
  const db = client.db();
  const habitItCollection = db.collection("habitIt");
  const habits = await habitItCollection.find().toArray();
  client.close();
  //render all habits page

  const DUMMY_ARRAY = [
    {
      title: "title",
      description: "test",
      frequency: [true, true, true, false, false, true, false],
      id: "t1",
    },
  ];

  return {
    props: {
      habits:
        // DUMMY_ARRAY,
        habits.map((habit) => {
          return Array.isArray(habit.frequency)
            ? {
                title: habit.title,
                description: habit.description,
                frequency: habit?.frequency,
                id: habit._id.toString(),
              }
            : {
                title: habit.title,
                description: habit.description,
                frequency: DUMMY_ARRAY[0].frequency,
                id: habit._id.toString(),
              };
        }),
    },
    revalidate: 1,
  };
}
export default Home;
