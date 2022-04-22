import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useTranslation } from "react-i18next";

//custom-hook
import useForm from "../hooks/forms";

import { signupUser } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "48px 0px 10px 0px",
  },
}));

var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/;
var passwordErrorText = "Password must contain at least 6 upto 20 characters with atleast one numeric digit, one uppercase and one lowercase letter";
var emailErrorText = "Enter Valid Email";
const validateRegex = (inputStr, regexType) => {
  return regexType.test(inputStr);
};
export default function Register() {
  const classes = useStyles();

  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();

  const signupHandle = (props) => {

    const newUserData = {
      email: inputs.email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      role: "ROLE_USER",
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    };
    dispatch(signupUser(newUserData, history));
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    signupHandle
  );

  // console.log(errors);
  let emailError = null;
  let passwordError = null;
  let confirmPasswordError = null;
  let firstNameEmptyError = null;
  let lastNameEmptyError = null;

  if (errors) {
    if (typeof errors !== "string") {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].msg.includes("First Name"))
          firstNameEmptyError = errors[i].msg;
        if (errors[i].msg.includes("Last Name"))
          lastNameEmptyError = errors[i].msg;
        if (errors[i].msg.includes("valid email")) emailError = errors[i].msg;
        if (errors[i].msg.includes("Email address already"))
          emailError = errors[i].msg;
        if (errors[i].msg.includes("least 6 characters long"))
          passwordError = errors[i].msg;
        if (errors[i].msg.includes("Passwords have to"))
          confirmPasswordError = errors[i].msg;
      }
    }
  }

  const [isValidEmail, onChangeEmail] = useState("");
  const [isValidPass, onChangePassword] = useState("");



  useEffect(() => { 
    console.log("---",inputs.email, inputs.password ,isValidEmail, ">",isValidPass);
      console.log();
  }, [isValidEmail, isValidPass]);


  const { t, i18n } = useTranslation(["translation"]);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.title}>
        {t("Buttons.register")}
          <span role="img" aria-label="Pizza Emoji">
            🍕
          </span>
        </Typography>
        <form noValidate onSubmit={handleSubmit}   >
          <TextField
            id="firstName"
            name="firstName"
            label="FirstName"
            onChange={handleInputChange}
            value={inputs.firstName}
            className={classes.textField}
            helperText={firstNameEmptyError}
            error={firstNameEmptyError ? true : false}
            fullWidth
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="LastName"
            onChange={handleInputChange}
            value={inputs.lastName}
            className={classes.textField}
            helperText={lastNameEmptyError}
            error={lastNameEmptyError ? true : false}
            fullWidth
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            onChange={(e) => {  handleInputChange(e);  }}
            inputMode="email"
            value={inputs.email}
            className={classes.textField}
            fullWidth
            helperText={isValidEmail === false ? emailErrorText : null}
            error={passwordError || isValidEmail === false ? true : false}
            required
            onBlur={(e) => { onChangeEmail(validateRegex(inputs.email, emailRegex)) }}
                 
          />


          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={(e) => { onChangePassword(validateRegex(inputs.password, passRegex));  handleInputChange(e);   }}
            value={inputs.password}
            className={classes.textField}
            helperText={isValidPass === false ? passwordErrorText : null}
            error={passwordError || isValidPass === false ? true : false}
            fullWidth
            required
            onBlur={(e) => { onChangePassword(validateRegex(inputs.password, passRegex))  }}

          />

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
            className={classes.textField}
            helperText={passwordError ? null : confirmPasswordError}
            error={passwordError ? true : confirmPasswordError ? true : false}
            fullWidth
            required
          />

          {serverError && (
            <Typography variant="body2" className={classes.customError}>
              {"server error, please try again"}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={((isValidEmail === (false || "")) || (isValidPass === (false || "")) || loading || (inputs.password !== inputs.confirmPassword)) ? true : false}
            
          >
            {/* Sign UP */}
            {t("Buttons.sign_up")}
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small className={classes.small}>
          {t("already_account")} ? {t("Buttons.login")}  <Link to="/login">{t("here")}</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
