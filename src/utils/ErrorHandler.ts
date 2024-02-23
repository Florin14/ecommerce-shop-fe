import React from "react";
import Axios from "axios";
// import { useRouter } from "next/router";
// import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

// import { loadingActions } from "../store/slices/loading/loading-slice";
// import { snackbarActions } from "../store/slices/snackbar/snackbar-slice";
import { useNavigate } from "react-router-dom";
import { loadingActions } from "../store/slices/loading/loading-slice";
import { RootState } from "../store";

const ErrorHandler = () => {
    // const [cookies, setCookie] = useCookies(["name", "role"]);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    // const languageData = useSelector((state: RootState) => state.website.languageData);
    // const router = useNavigate();

    Axios.interceptors.request.use(
        function (config) {
            let loadingHeader = config?.headers?.["X-Loading"];
            if (loadingHeader || loadingHeader === undefined) {
                if (!loading) {
                    dispatch(loadingActions.setLoading({ loading: true }));
                }
            }

            return config;
        },
        function (error) {
            dispatch(loadingActions.setLoading({ loading: false }));

            return Promise.reject(error);
        }
    );

    Axios.interceptors.response.use(
        function (response) {
            let loadingHeader = response?.config?.headers?.["X-Loading"];
            let continueLoadingHeader = response?.config?.headers?.["X-Continue-Loading"];

            if (!continueLoadingHeader && (loadingHeader || loadingHeader === undefined)) {
                setTimeout(() => {
                    dispatch(loadingActions.setLoading({ loading: false }));
                }, 300);
            }

            if (response) {
                const { method } = response?.config;
                switch (method) {
                    case "put":
                        if (response?.config?.url !== "/warehouses") {
                            // dispatch(
                            //     snackbarActions.handleOpen({
                            //         message: "Salvat cu succes",
                            //         type: "success",
                            //     })
                            // );
                        }
                        break;
                    case "post": {
                        if (
                            response?.config?.url !== "/auth/logout" &&
                            response?.config?.url !== "/account/reset-password" &&
                            response?.config?.url !== "/auth/login" &&
                            response?.config?.url !== "/account/change-password" &&
                            response?.config?.url !== "/vehicle"
                        ){}
                            // dispatch(
                            //     snackbarActions.handleOpen({
                            //         message: languageData?.SuccessAndErrorMessages.Success.Put,
                            //         type: "success",
                            //     })
                            // );
                        if (response?.config?.url === "/account/change-password"){}
                            // dispatch(
                            //     snackbarActions.handleOpen({
                            //         message: "Schimbat cu succes",
                            //         type: "success",
                            //     })
                            // );
                        if (response?.config?.url === "/vehicle"){}
                            // dispatch(
                            //     snackbarActions.handleOpen({
                            //         message: "Vehicul salvat cu succes",
                            //         type: "success",
                            //     })
                            // );
                        break;
                    }
                    case "delete":
                        // dispatch(
                        //     snackbarActions.handleOpen({
                        //         message: "Sters cu succes",
                        //         type: "success",
                        //     })
                        // );
                        break;
                    default:
                        break;
                }
            }
            return response;
        },
        function (error) {
            setTimeout(() => {
                dispatch(loadingActions.setLoading({ loading: false }));
            }, 300);

            const { response, config } = error;
            if (response) {
                const { data } = response;
                if (response?.status === 401 || data?.code === "E0013" || data?.code === "E0015") {
                    // setCookie("name", "", { path: "/" });
                    // setCookie("role", "", { path: "/" });
                    // setCookie("id", "", { path: "/" });
                    // router("/login")
                } else {
                    let match = null;
                    // if (
                    //     languageData?.SuccessAndErrorMessages.Error[data?.code] &&
                    //     languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method] &&
                    //     typeof languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method] === "object"
                    // ) {
                    //     const errorMethod = languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method];

                    //     for (const key of Object.keys(errorMethod)) {
                    //         const reg = new RegExp(key);

                    //         if (reg.test(config?.url)) {
                    //             match = key;
                    //             break;
                    //         }
                    //     }
                    //     if (match === null) {
                    //         match = "default";
                    //     }
                    // }
                    if (response?.config?.url !== "/account/reset-password") {
                        if (match !== null) {
                            // dispatch(
                            //     snackbarActions.handleOpen({
                            //         message: languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method]?.[match],
                            //         type: "error",
                            //     })
                            // );
                        } else {
                            // if (data?.code === "E0144" || data?.code === "E0145")
                            //     dispatch(
                            //         snackbarActions.handleOpen({
                            //             message:
                            //                 languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method] ||
                            //                 languageData?.SuccessAndErrorMessages.Error[data?.code] ||
                            //                 languageData?.SomethingWentWrong,
                            //             type: "info",
                            //         })
                            //     );
                            // else
                            //     dispatch(
                            //         snackbarActions.handleOpen({
                            //             message:
                            //                 languageData?.SuccessAndErrorMessages.Error[data?.code]?.[config?.method] ||
                            //                 languageData?.SuccessAndErrorMessages.Error[data?.code] ||
                            //                 languageData?.SomethingWentWrong,
                            //             type: "error",
                            //         })
                            //     );
                        }
                    }
                }
            } else {
                // router("/platform-in-work");
            }
            return Promise.reject(error);
        }
    );
    // return <></>;
};

export default ErrorHandler;
