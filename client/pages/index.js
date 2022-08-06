// import axios from "axios";

// const LandingPage = ({ currnetUser }) => {
//   console.log(currnetUser);
//   // axios.get("/api/users/currentuser").catch((err) => {
//   //   console.log(err.message);
//   // });
//   console.log("hello");

//   return <h1>Landing Page</h1>;
// };

// LandingPage.getInitialProps = async ({ req }) => {
//   console.log(req.headers);
//   if (typeof window === "undefined") {
//     // console.log(typeof window);
//     // we are on  the server
//     // requests should be made to http://ingress-srv
//     const { data } = await axios
//       .get(
//         "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//         {
//           headers: req.headers,
//         }
//       )
//       .catch((err) => {
//         console.log(err.message);
//       });
//     return data;
//   } else {
//     // console.log("client");
//     const { data } = await axios.get("/api/users/currentuser").catch((err) => {
//       console.log(err.message);
//     });
//     return data;
//   }
//   return {};
// };

// // export async function getServerSideProps({ req }) {
// //   const response = await axios.get(
// //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
// //     {
// //       headers: req.headers,
// //     }
// //   );

// //   return {
// //     props: {
// //       currentUser: response.data,
// //     },
// //   };
// // }

// export default LandingPage;

// import axios from "axios";
// import buildClient from "../api/build-client";

// const LandingPage = ({ currentUser }) => {
//   console.log(currentUser);
//   return <h1>Hello, {currentUser?.email ?? "user"}</h1>;
// };

// export const getServerSideProps = async (context) => {
//   // let res;
//   // if (typeof window === "undefined") {
//   //   res = await axios.get(
//   //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//   //     {
//   //       withCredentials: true,
//   //       headers: req.headers,
//   //     }
//   //   );
//   // } else {
//   //   res = await axios.get("/api/users/currentuser");
//   // }
//   // return { props: res.data };

//   const { data } = await buildClient(context).get("api/users/currentuser");
//   return data;
// };

// export default LandingPage;

// ---------------------------------
// import buildClient from "../api/build-client";
import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
  // axios.get('/api/users/currentuser');
  // console.log(currentUser);
  // console.log(tickets);

  // return currentUser ? (
  //   <h1>You are signed in </h1>
  // ) : (
  //   <h1>You are NOT signed in </h1>
  // );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // console.log("landing page");
  // const client = buildClient(context);
  // const { data } = await client.get("/api/users/currentuser");

  // return data;
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
