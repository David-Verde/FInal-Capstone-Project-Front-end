import pluralize from 'pluralize';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '../../hooks/toast.hook';
import { fetchUserReservationsAsync } from '../../redux/reservation/reservation.actions';
import { selectReservationIsLoading, selectUserReservations } from '../../redux/reservation/reservation.selectors';
import { selectStatusMessage } from '../../redux/status/status.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import ReservationBlock from '../reservationBlock/reservationBlock.component';
import { SectionTitle } from '../section-title/section-title.component';
import { SimpleCard } from '../simple-card/simple-card.component';
import Spinner from '../spinner/spinner.component';

import './reservations.styles.scss';

const ReservationsComponent = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const userReservations = useSelector(selectUserReservations);
  const isLoading = useSelector(selectReservationIsLoading);
  const currentUser = useSelector(selectCurrentUser);
  const statusMessage = useSelector(selectStatusMessage);

  if (statusMessage) {
    addToast(statusMessage);
  }

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserReservationsAsync(currentUser.id));
    }
  }, [currentUser]);

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <section className="reservations">
        <SimpleCard>
          <header className="reservations__header">
            <SectionTitle
              title={pluralize('Reservation', userReservations.length, true)}
            />
          </header>
        </SimpleCard>
        {
          userReservations.length > 0 ? (
            <section className="reservations__container">
              {
                userReservations.map((reservation) => (
                  <ReservationBlock
                    checkIn={reservation.check_in}
                    checkOut={reservation.check_out}
                    price={reservation.price}
                    guests={reservation.guests}
                    propertyDetails={reservation.property}
                    id={reservation.id}
                    reservationId={reservation.id}
                    userId={reservation.userId}
                    key={reservation.id}
                  />
                ))
              }
            </section>
          ) : (
            <h4 className="reservations__text">
              &mdash;&nbsp; No reservations &nbsp;&mdash;
            </h4>
          )
        }
      </section>
    )
  );
};

export default ReservationsComponent;
