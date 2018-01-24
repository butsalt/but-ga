import ButGa from 'but-ga';
import { TRACKING_ID, USER_ID } from './consts';

export function createGa() {
  return new ButGa({
    trackingId: TRACKING_ID,
    userId: USER_ID
  });
}