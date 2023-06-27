import NewMeetup from "../../components/meetups/NewMeetupForm";

function HomePage() {
  function addMeetupHandler(enteredMeetup) {
    console.log(enteredMeetup);
  }
  return <NewMeetup onAddMeetup={addMeetupHandler} />;
}

export default HomePage;
