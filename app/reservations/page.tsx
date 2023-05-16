import EmptyState from "../../app/components/EmptyState";

import getCurrentUser from "../../app/actions/getCurrentUser";
import getReservations from "../../app/actions/getReservations";

import TripsClient from "./ReservationsClient";
import ClientOnly from "../../app/components/ClientOnly";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  // if (reservations.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No reservations found"
  //         subtitle="Looks like you have no reservations on your properties."
  //       />
  //     </ClientOnly>
  //   );
  // }

  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return (
      <ClientOnly>
        <EmptyState
          title="Restricted User"
          subtitle="Looks like you have no access."
        />
      </ClientOnly>
    );
  }

  if (session?.user.role === "ADMIN") {
    return (
      <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    );
  }

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }
};

export default ReservationsPage;
