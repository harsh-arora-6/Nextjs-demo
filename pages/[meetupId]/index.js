import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
// this function is required in dynamic pages when using getStaticProps
export async function getStaticPaths() {
  // we can dynamically generate paths by fetching the array of ids from database,
  // fallback = false means that only the paths defined should exist
  // fallback = true means for the defined paths pages should be pre generated while the other pages will be dynamically pre generated on the server for the incoming request
  //   with the help of fallback we can pre generate some popular pages
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}
export async function getStaticProps(context) {
  // fetch data from API or take to some database
  //   here context won't have request,response
  const meetupId = context.params.meetupId;
  return {
    // here props is the props which we receive in above component.
    // this is how we can move data fetching away from client side to the build process side
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYm7g_W9BtaVvrBtn1PAp1oZ59vHHfuIKOlHvXhgi&s",
        title: "First Meetup",
        address: "Some random place",
        description: "This is first meetup",
      },
    },
    // time in seconds after which the page should be re pre-rendered with the new data.
    // page is updated regularly after deployment(not only at build time)
    revalidate: 10,
  };
}
export default MeetupDetails;
