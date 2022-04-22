import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
//custom-hook
import useForm from "../hooks/forms";
import hamBurgerIcon from "../images/hamburger.jpg";
import { sendResetPassLinkAction } from "../redux/actions/authActions";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "10px 0px 10px 0px",
  },
  hamBurger: {
    height: 200,
    width: 240,
  },
}));

export default function ForgetPassComp() {
  const classes = useStyles();

  const { loading, serverError, errors, } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  const history = useHistory();


  const sendResetPassLinkEmail = (props) => {


    const userData = { email: inputs.email };
    console.log("<>>", userData);

    dispatch(sendResetPassLinkAction(userData, history));

  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      email: "",
    },
    sendResetPassLinkEmail
  );

  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("Invalid email/password"))
      incorrectCredentialsError = errors;
    if (errors.includes("Verify your email")) verifyEmailError = errors;
  }

  const { t, i18n } = useTranslation(["translation"]);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm style={{ marginBottom: 34 }}>
        <img
          src={hamBurgerIcon}
          alt="hamBurger"
          className={classes.hamBurger}
        />
        <Typography variant="h3" className={classes.title}>
        {t("Buttons.forgot_password")}
        </Typography>
        <form noValidate onSubmit={handleSubmit}>

          <TextField
            id="email"
            name="email"
            label="Email"
            className={classes.textField}
            onChange={handleInputChange}
            value={inputs.email}
            fullWidth
          />

          {serverError && (
            <Typography variant="body2" className={classes.customError}>
              {"server error, please try again"}
            </Typography>
          )}

          {verifyEmailError && (
            <Typography variant="body2" className={classes.customError}>
              {verifyEmailError}
            </Typography>
          )}

          {incorrectCredentialsError && (
            <Typography variant="body2" className={classes.customError}>
              {incorrectCredentialsError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {t("Buttons.send_reset_password_email")}
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          {/* <small className={classes.small}>
            <Link to="/">Forgot Password</Link>
          </small> */}
          <br />

        </form>


      </Grid>
      <Grid item sm />
    </Grid>
  );
}
