import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import HabitDetail from "../../components/habits/HabitDetail";

export default function HabitId(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.habitData.title}</title>
        <meta name="description" content={props.habitData.description} />
      </Head>
      <HabitDetail
        title={props.habitData.title}
        description={props.habitData.description}
        frequency={props.habitData.frequency}
      />
    </Fragment>
  );
}

//dynamically allows next js to know which pages to pregenerate
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
  );
  const db = client.db();
  const habitItCollection = db.collection("habitIt");

  //fetches ids from MongoDB
  const habits = await habitItCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    //false = paths contail all supported values
    //true = next js will try to pregenerate without all supported values
    fallback: false,
    paths: habits.map((habit) => ({
      params: { habitId: habit._id.toString() },
    })),
  };
}

//for editing habit
export async function getStaticProps(context) {
  //fetch data for a single habit
  const habitId = context.params.habitId;

  const client = await MongoClient.connect(
    "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
  );
  const db = client.db();
  const habitItCollection = db.collection("habitIt");

  //find a single habit
  const selectedHabit = await habitItCollection.findOne({
    _id: ObjectId(habitId),
  });
  client.close();

  return {
    props: {
      habitData: {
        id: selectedHabit._id.toString(),
        title: selectedHabit.title,
        description: selectedHabit.description,
        frequency: selectedHabit.frequency,
      },
    },
  };
}
