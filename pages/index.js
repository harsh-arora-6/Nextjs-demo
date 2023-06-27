import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYm7g_W9BtaVvrBtn1PAp1oZ59vHHfuIKOlHvXhgi&s",
    title: "First Meetup",
    address: "random address",
    description: "random",
  },
  {
    id: "m2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYm7g_W9BtaVvrBtn1PAp1oZ59vHHfuIKOlHvXhgi&s",
    title: "Second Meetup",
    address: "random address",
    description: "random",
  },
];
function HomePage() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  // doing like this nextjs gets snapshot of first render cycle for pre rendering but useEffect works after page component is rendered so 
  // in this case we can see in page source that it would be empty (not consisting of meetups)
	useEffect(()=>{
		setLoadedMeetups(DUMMY_MEETUPS);
	},[]);	
  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
