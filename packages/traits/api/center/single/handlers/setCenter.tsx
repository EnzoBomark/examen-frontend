import { setCenter } from '../actions';
import store from '../store';

export const useSetCenter = () => {
  const dispatch = store.useDispatch();
  return (center: Center) => dispatch(setCenter(center));
};
