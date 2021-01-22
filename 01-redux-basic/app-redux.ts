import { createStore, Store } from 'redux';
import { addAction } from './counter/counter.actions';
import { counterReducer } from './counter/counter.reducer';

const store: Store = createStore(counterReducer);
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(addAction);
store.dispatch(addAction);
store.dispatch(addAction);
store.dispatch(addAction);