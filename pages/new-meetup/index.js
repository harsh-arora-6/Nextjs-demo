import { Fragment } from "react";
import NewMeetup from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetup) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    // console.log(resData);
    router.replace("/");
  }
  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="Add an amazing meetup" />
      </Head>
      <NewMeetup onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
