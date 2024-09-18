import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

type Position = {
  latitude: string;
  longitude: string;
};

type userState = {
  username: string;
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  position: Position;
  address: string;
  error?: string;
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, () => {
      reject(new Error('Permission denied. Please allow location access.'));
    });
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj: any = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of FULFILLED state
    return { position, address };
  },
);

const initialState: userState = {
  username: '',
  status: 'idle',
  position: {
    latitude: '',
    longitude: '',
  },
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'error';
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
