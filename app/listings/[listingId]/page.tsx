import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import getReservations from "../../actions/getReservations";

import EmptyState from "../../components/EmptyState";

import ListingClient from "./ListingClient";
import ClientOnly from "../../components/ClientOnly";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
