import { createStore, createTypedHooks } from 'easy-peasy';
import shapesStore, { ShapesModel } from './model';

const store = createStore<ShapesModel>(shapesStore);

const typedHooks = createTypedHooks<ShapesModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
