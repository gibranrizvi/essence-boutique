import { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const useCustomers = () => {
  const [customers, setCustomers] = useState(null);

  const usersRef = firestore.collection(`/users/`);

  useEffect(() => {
    const unsubscribe = getCustomers();

    return () => unsubscribe();
  }, []);

  const getCustomers = () => {
    return usersRef.orderBy('displayName').onSnapshot(handleSnapshot);
  };

  const handleSnapshot = snapshot => {
    const customers = snapshot.docs
      .map(doc => {
        return { id: doc.id, ...doc.data() };
      })
      .filter(customer => customer.role === 'customer');

    setCustomers(customers);
  };

  return customers;
};

export default useCustomers;
