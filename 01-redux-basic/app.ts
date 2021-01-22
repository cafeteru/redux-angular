import { addAction, multiplyAction } from "./counter/counter.actions";
import { counterReducer } from "./counter/counter.reducer";
import { FakeStore } from "./fake-store";

const store = new FakeStore(counterReducer, 10);
console.log(store.getState());
store.dispatch(addAction);
console.log(store.getState());
store.dispatch(multiplyAction);
console.log(store.getState());