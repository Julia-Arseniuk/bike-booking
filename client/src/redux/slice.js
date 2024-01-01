import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
    bike: null,
    bikes: [],
    loading: 'idle'

};

export const getAllBikes = createAsyncThunk(
  'bike/getAllBikes',
  async () => {
    const {data} = await api.get('/bikes');
    return data;
  }
);

export const addBike = createAsyncThunk(
  'bike/addBike',
  async (formData, {rejectWithValue}) => {
    try {
      const {data} = await api.post('/bikes/add',  formData);
      return data;
    } catch (err) {
      console.log('AsyncThunk err: ', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBike = createAsyncThunk(
  'bike/updateBike',
  async (getData, {rejectWithValue}) => {
    try {
      const {data} = await api.put('/bikes/update', getData);
      return data;
    } catch (err) {
      console.log('AsyncThunk err: ', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBike = createAsyncThunk(
  'bike/deleteBike',
  async ({_id}, {rejectWithValue}) => {
    try {
      const {data} = await api({
        method: 'DELETE',
        url: `/bikes/${_id}`,
        data: {
          _id
        }
      });
      return {data, _id};
    } catch (err) {
      console.log('AsyncThunk err: ', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const bikeSlice = createSlice({
    name: 'bike',
    initialState,
    reducers: {
      add: (state) => {
        state.bike = {
            name: 'Bike'
        }
      }
    },
    extraReducers: (builder) => {
      // get all bikes
      builder.addCase(getAllBikes.pending, (state) => {
        state.loading = 'pending';
        console.log('Pending');
      })
      .addCase(getAllBikes.fulfilled, (state, action) => {
        state.bikes = action.payload;
        state.loading = 'succeeded';
        console.log('Fulfielld');
      })
      .addCase(getAllBikes.rejected, (state) => {
        state.loading = 'failed';
        console.log('failed');
      });

      // add bike
      builder.addCase(addBike.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(addBike.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.bike = action.payload;
          state.bikes.push(state.bike);
      })
      .addCase(addBike.rejected, (state, action) => {
          console.log('rejected error: ', action.payload);
          state.loading = 'failed';
      });

            // update bike
      builder.addCase(updateBike.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateBike.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.bikes = action.payload;
      })
      .addCase(updateBike.rejected, (state, action) => {
          console.log('rejected error: ', action.payload);
          state.loading = 'failed';
      });

            // delete bike
      builder.addCase(deleteBike.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteBike.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          // console.log(action.payload);
          state.bikes = state.bikes.filter(bike => bike._id !== action.payload._id)
      })
      .addCase(deleteBike.rejected, (state, action) => {
          console.log('rejected error: ', action.payload);
          state.loading = 'failed';
      });
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { add } = bikeSlice.actions;
  
  export default bikeSlice.reducer

