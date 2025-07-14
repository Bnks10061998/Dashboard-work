// import { configureStore } from '@reduxjs/toolkit';
// import clientReducer from '../slices/clientSlice';


// export const store = configureStore({
//   reducer: {
//     client: clientReducer,
//   },
// });



// import { configureStore } from '@reduxjs/toolkit';
// import selectedClientReducer from '../slices/selectedClientSlice';

// const store = configureStore({
//   reducer: {
//     selectedClient: selectedClientReducer,
//   },
// });

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import selectedClientReducer from '../slices/selectedClientSlice.js';

const store = configureStore({
  reducer: {
    selectedClient: selectedClientReducer,
  },
});

export default store;
