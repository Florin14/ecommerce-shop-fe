import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: "",
    languageData: null,
    role: null,
    title: null,
    goBack: null,
    deviceType: null,
    sidebarExpanded: true
};

const websiteSlice = createSlice({
    name: "website",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload.language;
        },
        setLanguageData(state, action) {
            state.languageData = action.payload.languageData;
        },
        setRole(state, action) {
            state.role = action.payload.role;
        },
        setTitle(state, action) {
            state.title = action.payload.title;
        },
        setGoBack(state, action) {
            state.goBack = action.payload.goBack;
        },
        setDeviceType(state, action) {
            state.deviceType = action.payload.deviceType;
        },
        toggleSidebar(state) {
            state.sidebarExpanded = !state.sidebarExpanded
        }
    },
});

export const websiteActions = websiteSlice.actions;
export default websiteSlice.reducer;
