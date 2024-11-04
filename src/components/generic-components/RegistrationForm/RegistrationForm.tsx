import React, { useState } from "react";
import {
  styled,
  Button,
  Typography,
  FormLabel,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  css,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
// import { BaseUser, RegisterUserDTO, Role } from '../../../types/User'
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
// import { addUser } from "../../../store/slices/users/thunks";

// import { useAppDispatch } from '../../../redux/hooks'
// import { addUser } from '../actions'
// import { resetAuthState } from '../../application/slice'

export type RegistrationFormType = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
};

interface RegistrationFormProps {
  loginClick: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    upperCaseValidation: {
      valid: false,
      message: "Cel putin o litera mare",
    },
    lowerCaseValidation: {
      valid: false,
      message: "Cel putin o litera mica",
    },
    digitValidation: {
      valid: false,
      message: "Cel putin o cifra",
    },
    specialCharValidation: {
      valid: false,
      message:
        "Cel putin un caracter special [~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/]",
    },
    lengthValidation: {
      valid: false,
      message: "Lungimea minima este de 8 caractere",
    },
  });
  const [passwordType, setPasswordType] = useState("text");
  const [confirmPasswordType, setConfirmPasswordType] = useState("text");

  const upperCaseRegex = new RegExp("(?=.*[A-Z])");
  const lowerCaseRegex = new RegExp("(?=.*[a-z])");
  const digitRegex = new RegExp("(?=.*[0-9])");
  const specialCharRegex = new RegExp(
    "(?=.*[~`!@#$%^&*()_\\-+={\\[}\\]|:;\"'<,>.?/])"
  );

  const onPasswordChange = (value: string) => {
    setPassword(value);

    let upperCaseState = false;
    let lowerCaseState = false;
    let digitState = false;
    let specialCharState = false;
    let lengthState = true;

    if (upperCaseRegex.test(value)) {
      upperCaseState = true;
    }
    if (lowerCaseRegex.test(value)) {
      lowerCaseState = true;
    }
    if (digitRegex.test(value)) {
      digitState = true;
    }
    if (specialCharRegex.test(value)) {
      specialCharState = true;
    }
    if (value?.length < 8) {
      lengthState = false;
    }

    setValidation({
      upperCaseValidation: {
        valid: upperCaseState,
        message: "Cel putin o litera mare",
      },
      lowerCaseValidation: {
        valid: lowerCaseState,
        message: "Cel putin o litera mica",
      },
      digitValidation: {
        valid: digitState,
        message: "Cel putin o cifra",
      },
      specialCharValidation: {
        valid: specialCharState,
        message:
          "Cel putin un caracter special [~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/]",
      },
      lengthValidation: {
        valid: lengthState,
        message: "Lungimea minima este de 8 caractere",
      },
    });
  };

  // Wire to backend endpoint using RTK (create a slice etc.)
  // Note: handleRegistrationSubmit accepts formData as a parameter
  const handleRegistrationSubmit = async () => {
    // transform Form Data into User object
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    // // API call to '/register'
    // dispatch(addUser(userData)).then(response => {
      // if (response.type === 'addUser/fulfilled') {
      //   // empty all fields after submitting
      //   resetForm()
      //   // Move back to log in after successfully registering
      //   loginClick()
      //   // make sure to reset loading / complete status for registration action
      //   // dispatch(resetAuthState())
      // }
    // })
  };

  const goToLogin = () => {
    // resetForm();
    navigate("/login");
  };

  return (
    <Container>
      <ArrowBack onClick={goToLogin} />
      <FormTitle>Inregistreaza-te</FormTitle>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistrationSubmit();
        }}
      >
        <TextFieldGroup>
          <StyledTextField
            // {...register("firstName", {
            //   required: "Prenumele este obligatoriu",
            // })}
            label="Prenume"
            // error={!!errors.firstName}
            // helperText={errors.firstName?.message}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            color="secondary"
            variant="filled"
            required
            helperText="Camp obligatoriu"
            size="small"
          />
          <StyledTextField
            // {...register("lastName", {
            //   required: "Numele de familie este obligatoriu",
            // })}
            label="Nume de familie"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            color="secondary"
            variant="filled"
            size="small"
            required
            helperText="Camp obligatoriu"
          />
        </TextFieldGroup>
        <StyledTextField
          // {...register("email", {
          //   required: "Email is required",
          //   pattern: {
          //     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          //     message: "Invalid email address",
          //   },
          // })}
          label="Email"
          color="secondary"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          size="small"
          helperText="Camp obligatoriu"
        />
        <StyledTextField
          label="Parola"
          type={passwordType}
          size="small"
          variant="filled"
          color="secondary"
          fullWidth
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                onClick={() =>
                  passwordType === "password"
                    ? setPasswordType("text")
                    : setPasswordType("password")
                }
              >
                {passwordType === "password" ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </ShowPasswordButton>
            ),
          }}
          helperText="Camp obligatoriu"
        />
        <div style={{ marginBottom: 20 }}>
          {validation &&
            Object.keys(validation).map((key, value) => {
              return (
                <Grid
                  key={key}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="10px"
                  // style={{}}
                >
                  <div
                    style={{
                      width: "20px",
                    }}
                  >
                    {validation[key].valid === true ? (
                      <StyledCheckIcon />
                    ) : (
                      <StyledClearIcon />
                    )}
                  </div>
                  <Field
                    confirmed={validation[key].valid === true}
                    style={{ width: "90%", fontSize: 14, marginBottom: 3 }}
                  >
                    {validation[key].message}
                  </Field>
                </Grid>
              );
            })}
        </div>
        <StyledTextField
          // {...register("confirmPassword", {
          //   required: "Parola este obligatorie",
          //   minLength: 6,
          //   validate: {
          //     passwordsNotMatching: (confirmPasswordValue) =>
          //       confirmPasswordValue === getValues("password") ||
          //       "Password not matching",
          //   },
          // })}
          label="Confirma parola"
          type={confirmPasswordType}
          size="small"
          color="secondary"
          variant="filled"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                onClick={() =>
                  confirmPasswordType === "password"
                    ? setConfirmPasswordType("text")
                    : setConfirmPasswordType("password")
                }
              >
                {confirmPasswordType === "password" ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </ShowPasswordButton>
            ),
          }}
          helperText="Camp obligatoriu"
        />
        {/* <FormLabel>I want to participate as</FormLabel>
        <RadioGroup value={roleField.value}>
          <FormControlLabel
            onChange={() => {
              roleField.onChange("STUDENT")
              roleField.onBlur()
            }}
            value={"STUDENT"}
            control={<Radio size="small" color="secondary" />}
            label="Student"
          />
          <FormControlLabel
            onChange={() => {
              roleField.onChange("MENTOR")
              roleField.onBlur()
            }}
            value={"MENTOR"}
            control={<Radio size="small" color="secondary" />}
            label="Mentor"
          />
        </RadioGroup> */}

        <RegisterButton variant="contained" color="success" type="submit">
          Create Account
        </RegisterButton>
      </FormWrapper>
    </Container>
  );
};

const Container = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  margin-top: 60px;
  background: #f4f4f4;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0 10px 36px 0,
    rgba(0, 0, 0, 0.06) 0 0 0 1px;
`;

const FormWrapper = styled("form")`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 4px;
`;

const FormTitle = styled(Typography)`
  text-align: center;
  // margin-bottom: 15px;
  font-weight: bold;
  font-size: 18px;
  font-weight: 700;
`;

const ArrowBack = styled(ArrowBackIcon)`
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;

  width: 30px;
  height: 30px;

  transition: color 0.1s ease-in;

  :hover {
    color: #11998e;
  }
`;

const TextFieldGroup = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const StyledTextField = styled(TextField)`
  ${(props) =>
    !props.error &&
    css`
      margin-bottom: 24px;
    `}
`;

// Note: Keeping this here in case we need it somewhere else
//
// const StyledCheckbox = styled(Checkbox)`
//   ${props =>
//     props.color === 'error' &&
//     css`
//       color: ${props.theme.palette.error.main};
//     `}
// `

const RegisterButton = styled(Button)`
  margin-top: 10px;
  color: white;
  background: #11998e;
`;

const ShowPasswordButton = styled(IconButton)`
  margin: 0;
  width: 40px;
  color: #b4b4b4;
`;

const StyledCheckIcon = styled(CheckIcon)`
  color: green;
`;

const StyledClearIcon = styled(ClearIcon)`
  color: #000;
`;

const Field = styled("div")<{ confirmed?: boolean }>`
  ${(props) =>
    !props.confirmed &&
    css`
      color: green;
    `}
  color: #000;
  width: 90%;
`;
