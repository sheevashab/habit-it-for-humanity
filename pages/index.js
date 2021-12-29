import HabitList from "../components/habits/HabitList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Habit-It For Humanity</title>
        <meta
          name="description"
          content="Habit-it For Humanity is an easy way to create your very own habit tracker"
        />
      </Head>
      <HabitList habits={props.habits} />;
    </Fragment>
  );
}

//vs server side props (good when data is constantly changing second to second)
//static props are good for data that isn't constantly changing because it can take advantage of caching
export async function getStaticProps() {
  //fetch data from API, also seen in /api/create-habit and /[habitID]/index.js
  //could be refactored
  const client = await MongoClient.connect(
    "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
  );
  const db = client.db();
  const habitItCollection = db.collection("habitIt");

  const habits = await habitItCollection.find().toArray();
  client.close();

  return {
    props: {
      habits: habits.map((habit) => ({
        title: habit.title,
        description: habit.description,
        frequency: habit.frequency,
        id: habit._id.toString(),
      })),
    },
    //revalidate regenerates data and is in seconds
    revalidate: 1,
  };
}
