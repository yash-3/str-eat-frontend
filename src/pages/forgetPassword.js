import React from "react";
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

import hamBurgerIcon from "../images/hamburger.jpg";


import axios from "../util/axios";
import axiosNewInstance from "axios";

import {
    SIGNUP_SUCCESS,
    LOADING_UI,
    SET_ERRORS,
    SERVER_ERROR,
    CLEAR_ERRORS,
    LOADING_USER,
    SET_USER,
    SET_ERROR,
    SET_UNAUTHENTICATED,
    SET_ERRORS_SIGNUP_SELLER,
  } from "../redux/types";

//custom-hook
import useForm from "../hooks/forms";
import { loginAction } from "../redux/actions/authActions";

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

  const { loading, serverError, errors, signUpSuccess } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  const history = useHistory();

  
    const forgetPasswordHandle = (props) => {
        const userData = { email: inputs.email };
        console.log("<>>",userData); 
        const resetPassAction = (userData) => {

            axios
                .post("/auth/forgotPassword", JSON.stringify(userData))
                .then((res) => {

                    console.log(res);
                    // history.push("/");
                })
                .catch((err) => {
                    if (err.response) {
                        dispatch({
                            type: SET_ERROR,
                            payload: err.response.data,
                        });
                    } else {
                        dispatch({
                            type: SERVER_ERROR,
                        });
                    }
                });
            console.log("<>>");
        };
      
        resetPassAction();
    };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      email: "",
    },
    forgetPasswordHandle
  );

  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("Invalid email/password"))
      incorrectCredentialsError = errors;
    if (errors.includes("Verify your email")) verifyEmailError = errors;
  }

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
          Forget Password
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
            Forget Password
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
