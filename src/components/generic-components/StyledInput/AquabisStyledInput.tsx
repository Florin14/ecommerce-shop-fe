import React, { useState, useEffect } from "react";
import moment from "moment";
import { FormControl, FormHelperText, InputLabel, TextField, Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import cssVariables from "../../../assets/css/variables";
import { inputHasValue } from "../../../utils/app-functions";
import useClasses from "../../../utils/useClasses";
import { css } from "@emotion/css";
const useStyles = (_theme) => ({
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        textAlign: "right",
        fontStyle: "normal",
        color: "red",
        marginRight: 8,
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "15px",
        color: "black",
        marginBottom: "5px",
    },
    disabledInput: {
        backgroundColor: "rgba(97, 97, 97, 0.1)",
    },
    showHidePasswordIcon: {
        margin: `0 ${cssVariables.smallMargin} 0 0`,
        width: 25,
        color: _theme.palette.grey.text,
    },
    input: {
        fontSize: 12,
        fontFamily: "Inter",
        fontStyle: "normal",
        color: "black",
        fontWeight: "500",
        lineHeight: "22.5px",
        "&[type=number]": {
            MozAppearance: "textfield",
        },
        "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
            WebkitBoxShadow: "white !important",
            WebkitBackgroundClip: "content-box !important",
            BoxShadow: "white !important",
            transition: "background-color 5000s ease-in-out 0s",
        },
    },
    multilineInput: {
        fontSize: 12,
        fontStyle: "normal",
        color: "black",
        fontWeight: "600",
        lineHeight: "12px",
        minHeight: 23,

        "&[type=number]": {
            MozAppearance: "textfield",
        },
        "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
    },
    multilineWrapper: {
        "& .MuiInputBase-multiline": {
            padding: 0,
        },
    },
});
const StyledInput = ({
    id,
    activeLabel,
    label,
    value,
    onChange,
    className,
    inputClassName,
    type = "text",
    helperText,
    error,
    step,
    width,
    required,
    disabled,
    textAlign,
    placeholder,
    endAdornment,
    showHidePassword,
    format,
    inputColorClass,
    inputName = "input",
    maxLength,
    autoComplete = "off",
    onKeyUp,
    viewMode,
    viewModeClassName,
    labelClassName,
    variant = "outlined",
    rows,
}) => {
    const classes = useClasses(useStyles, { name: "styledInputStyles" });
    const [currentType, setCurrentType] = useState("text");
    useEffect(() => {
        setCurrentType(type);
    }, [type]);
    const changeCurrentType = (newType) => {
        setCurrentType(newType);
    };
    const computeEndAdornment = () => {
        return (
            (endAdornment || type === "password") && (
                <>
                    {type === "password" && showHidePassword && (
                        <IconButton
                            className={classes.showHidePasswordIcon}
                            onClick={() => (currentType === "password" ? changeCurrentType("text") : changeCurrentType("password"))}
                        >
                            {currentType === "password" ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                    )}
                    {endAdornment}
                </>
            )
        );
    };
    return (
        <div id={id}>
            {activeLabel && (
                <InputLabel required={!!required} className={labelClassName ? labelClassName : classes.label}>
                    {label}
                </InputLabel>
            )}
            {!viewMode ? (
                <FormControl required={required} id="formControl" style={{ width: width }} className={className}>
                    <TextField
                        placeholder={placeholder ? placeholder : ""}
                        disabled={disabled}
                        name={inputName}
                        value={value}
                        rows={rows ? rows : 1}
                        multiline={!!rows}
                        onChange={(e) => (e.target.value === "" ? onChange(null) : onChange(e.target.value))}
                        type={currentType}
                        inputProps={{
                            maxLength: maxLength !== null && maxLength,
                            min: 0,
                            max: type === "date" ? moment().format("yyyy-MM-DD") : "",
                            step: step || "any",
                            style: { textAlign: textAlign ? textAlign : "left" },
                        }}
                        InputProps={{
                            classes: {
                                input: `${rows ? classes.multilineInput : classes.input} ${inputClassName} ${disabled && classes.disabledInput}`,
                                root: inputClassName,
                                notchedOutline: inputColorClass,
                            },
                            inputComponent: format || undefined,
                            endAdornment: computeEndAdornment(),
                        }}
                        required={!!required}
                        variant={variant}
                        autoComplete={autoComplete}
                        onKeyUp={onKeyUp}
                    />
                    {helperText && (
                        <FormHelperText classes={{ root: classes.error }} error={error}>
                            {helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            ) : (
                <Typography variant={"h6"} className={css(classes.value, viewModeClassName)}>
                    {inputHasValue(value) ? value : "-"}
                </Typography>
            )}
        </div>
    );
};
export default StyledInput;
