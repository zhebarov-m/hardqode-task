import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface iUser {
  id: number;
  name: string;
  age: number;
}

interface iUsersState {
  users: iUser[];
  loading: boolean;
  error: string | null;
  nameFilter: string;
  ageFilter: string;
  limit: number;
  offset: number;
}

const initialState: iUsersState = {
  users: [],
  loading: false,
  error: null,
  nameFilter: "",
  ageFilter: "",
  limit: 4,
  offset: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<iUser[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    setAgeFilter: (state, action: PayloadAction<string>) => {
      state.ageFilter = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
  },
});

export const {
  setUsers,
  setLoading,
  setError,
  setNameFilter,
  setAgeFilter,
  setLimit,
  setOffset,
} = userSlice.actions;

export default userSlice.reducer;
