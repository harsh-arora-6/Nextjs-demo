import MeetupList from "../components/meetups/MeetupList";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYm7g_W9BtaVvrBtn1PAp1oZ59vHHfuIKOlHvXhgi&s",
    title: "First Meetup",
    address: "random address",
    description:'random'
  },
  {
    id: "m2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYm7g_W9BtaVvrBtn1PAp1oZ59vHHfuIKOlHvXhgi&s",
    title: "Second Meetup",
    address: "random address",
    description:'random'
  },
];
function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
