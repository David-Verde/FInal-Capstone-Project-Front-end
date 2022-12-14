import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createReservationFromApi,
  deleteReservationById,
  fetchUserReservations,
} from '../../services/api.service';
import { thunkErrorHandler } from '../../utils/redux.utils';
import { getSelectedHostingFromNumNights } from '../../utils/reservation.utils';
import { setStatusMessage } from '../status/status.actions';
import { RESERVATION_ACTION_TYPES } from './reservation.types';

export const setSelectedGuests = createAction(
  RESERVATION_ACTION_TYPES.SET_SELECTED_GUESTS,
);
export const setSelectedCheckIn = createAction(
  RESERVATION_ACTION_TYPES.SET_SELECTED_CHECK_IN,
);
export const setSelectedCheckOut = createAction(
  RESERVATION_ACTION_TYPES.SET_SELECTED_CHECK_OUT,
);

export const setNumNights = createAction(
  RESERVATION_ACTION_TYPES.SET_NUM_NIGHTS,
);

export const resetSelectedReservation = createAction(
  RESERVATION_ACTION_TYPES.RESET_SELECTED_RESERVATION,
);

export const setSelectedHosting = createAction(
  RESERVATION_ACTION_TYPES.SET_SELECTED_HOSTING,
  (props) => {
    let selectedHosting = null;

    if (props) {
      const { minCycleHosting, hostings, numNights } = props;
      selectedHosting = getSelectedHostingFromNumNights({
        minCycleHosting,
        hostings,
        numNights,
      });
    }

    return {
      payload: selectedHosting,
    };
  },
);

export const fetchUserReservationsAsync = createAsyncThunk(
  RESERVATION_ACTION_TYPES.FETCH_USER_RESERVATIONS_ASYNC,
  async (userId) => {
    const userReservations = await fetchUserReservations(userId);
    return userReservations;
  },
);

export const deleteUserReservationAsync = createAsyncThunk(
  RESERVATION_ACTION_TYPES.DELETE_USER_RESERVATION_ASYNC,
  thunkErrorHandler(async (reservationId, { getState, dispatch }) => {
    await deleteReservationById(reservationId);

    dispatch(setStatusMessage({
      type: 'success',
      message: 'Reservation deleted successfully.',
    }));

    return getState().reservation.userReservations.filter(
      (reservation) => reservation.id !== reservationId,
    );
  }),
);

export const createReservationAsync = createAsyncThunk(
  RESERVATION_ACTION_TYPES.CREATE_RESERVATION_ASYNC,
  thunkErrorHandler(async ({
    propertyId, guests, checkIn, checkOut,
  }, { getState, dispatch }) => {
    const newReservation = await createReservationFromApi({
      guests,
      checkIn,
      checkOut,
      propertyId,
    });
    const { userReservations } = getState().reservation;

    dispatch(setStatusMessage({
      type: 'success',
      message: 'Reservation created successfully.',
    }));

    return [...userReservations, newReservation];
  }),
);
