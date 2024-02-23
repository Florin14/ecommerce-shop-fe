import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
};
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading(state, action) {
            if ((!state.loading && action.payload.loading) || (state.loading && !action.payload.loading)) {
                state.loading = action.payload.loading;
            }
        },
    },
});
export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
