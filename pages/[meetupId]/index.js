import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
// this function is required in dynamic pages when using getStaticProps
export async function getStaticPaths() {
  // we can dynamically generate paths by fetching the array of ids from database,
  // fallback = false means that only the paths defined should exist
  // fallback = true means for the defined paths pages should be pre generated while the other pages will be dynamically pre generated on the server for the incoming request
  //   with the help of fallback we can pre generate some popular pages
  const client = await MongoClient.connect(
    "mongodb+srv://harsh_arora:iBk8oP6RjVv1O34V@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  // with true it would immediately return an empty page and then pull down the dynamically generated content once thats done so we need to handle the case when page doesn't have data yet
  // with blocking user won't see anything until the page is pre generated (new page)
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  // fetch data from API or take to some database
  //   here context won't have request,response
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://harsh_arora:iBk8oP6RjVv1O34V@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  return {
    // here props is the props which we receive in above component.
    // this is how we can move data fetching away from client side to the build process side
    props: {
      meetupData: {
        id: meetupId,
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
    // time in seconds after which the page should be re pre-rendered with the new data.
    // page is updated regularly after deployment(not only at build time)
    revalidate: 1,
  };
}
export default MeetupDetails;
