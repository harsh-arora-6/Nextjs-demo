import NewMeetup from "../../components/meetups/NewMeetupForm";

function HomePage() {
  async function addMeetupHandler(enteredMeetup) {
    const response = await fetch('/api/new-meetup',{
        method:'POST',
        body:JSON.stringify(enteredMeetup),
        headers:{
            'Content-Type':'application/json'
        },
    })
    const resData = await response.json();
    console.log(resData);
  }
  return <NewMeetup onAddMeetup={addMeetupHandler} />;
}

export default HomePage;
