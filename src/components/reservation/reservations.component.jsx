import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReservationsFromApi } from '../../services/reservationsApi';
import { selectReservationIsLoading, selectReservationsItems } from '../../redux/reservation/reservations.selectors';
import ReservationBlock from '../reservationBlock/reservationBlock.component';
import Spinner from '../spinner/spinner.component';

import './reservations.styles.scss';

const ReservationsComponent = () => {
  const dispatch = useDispatch();

  const allReservations = useSelector(selectReservationsItems);
  const isLoading = useSelector(selectReservationIsLoading);

  useEffect(() => {
    dispatch(getReservationsFromApi());
  }, []);

  return (
    <main className="reservations">
      <h3>Here you&apos;ll see the reservations you&apos;ve made</h3>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <section className="game-list-container">
            {(allReservations.length > 0) ? (
              allReservations.map((reservation) => (
                <ReservationBlock
                  checkIn={reservation.checkIn}
                  checkOut={reservation.checkOut}
                  price={reservation.price}
                  guests={reservation.guests}
                  id={reservation.id}
                  reservationId={reservation.reservationId}
                  userId={reservation.userId}
                  key={reservation.id}
                />
              ))
            ) : (
              <h4>You have no reservations!</h4>
            )}
          </section>
        )
      }
    </main>
  );
};

export default ReservationsComponent;
