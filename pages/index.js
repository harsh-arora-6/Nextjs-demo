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
function HomePage(props) {
  // console.log(props);
  // console.log('Home Page',props);
  return <MeetupList meetups={props.meetups} />;
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
  return {
    // here props is the props which we receive in above component.
    // this is how we can move data fetching away from client side to the build process side
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // time in seconds after which the page should be re pre-rendered with the new data.
    // page is updated regularly after deployment(not only at build time)
    revalidate: 10,
  };
}

export default HomePage;
