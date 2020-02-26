import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { firestore } from '../firebase';

const useTickets = () => {
  const [ticketCollection, setTicketCollection] = useState(null);

  const currentDate = format(new Date(), 'dd-MM-yyyy');

  const ticketCollectionDoc = firestore.doc(
    `/ticketCollections/${currentDate}`
  );

  useEffect(() => {
    const unsubscribe = getTicketCollection();

    return () => unsubscribe();
  }, []);

  const getTicketCollection = () => {
    return ticketCollectionDoc.onSnapshot(handleSnapshot);
  };

  const handleSnapshot = snapshot => {
    const ticketCollection = snapshot.data();

    setTicketCollection(ticketCollection);
  };

  return ticketCollection;
};

export default useTickets;
