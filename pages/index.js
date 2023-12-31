// This import won't be a part of bundle in client side code as it is used in getStaticProps
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  // console.log(props);
  // console.log('Home Page',props);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   /**
//    * If you don't have data that changes multiple times a second or if we don't need access to req object lets say for authentication
//    * then getStaticProps is better as it would be faster.
//    */
//   // request,response
//   const req = context.req;
//   const resp = context.res;

//   // fetch data from API or take to some database
//   return {
//     // here props is the props which we receive in above component.
//     // this is how we can move data fetching away from client side to the build process side
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  // console.log('hi');
  // fetch data from API or take to some database
  // we can use credentials here as it won't be exposed
  const client = await MongoClient.connect(
    "mongodb+srv://harsh_arora:iBk8oP6RjVv1O34V@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    // here props is the props which we receive in above component.
    // this is how we can move data fetching away from client side to the build process side
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // time in seconds after which the page should be re pre-rendered with the new data.
    // page is updated regularly after deployment(not only at build time)
    revalidate: 1,
  };
}

export default HomePage;
