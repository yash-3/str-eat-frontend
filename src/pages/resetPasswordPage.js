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
import { useParams } from "react-router-dom";
//custom-hook
import useForm from "../hooks/forms";
import { resetPasswordAction } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "48px 0px 10px 0px",
  },
}));

export default function ResetPasswordPage() {
  const classes = useStyles();

  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();

  const tokenParam = params.token;


  const resetPasswordHandle = (props) => {
    const userData = {
      password: inputs.password,
      token: tokenParam,
    };

    dispatch(resetPasswordAction(userData, history));
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      password: "",
      confirmPassword: "",
    },
    resetPasswordHandle
  );

  // console.log(errors);
  let passwordError = null;
  let confirmPasswordError = null;


  if (errors) {
    if (typeof errors !== "string") {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].msg.includes("least 6 characters long"))
          passwordError = errors[i].msg;
        if (errors[i].msg.includes("Passwords have to"))
          confirmPasswordError = errors[i].msg;
      }
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.title}>
          Reset Password{" "}
          <span role="img" aria-label="Pizza Emoji">
            🍕
          </span>
        </Typography>
        <form noValidate onSubmit={handleSubmit}>


          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={handleInputChange}
            value={inputs.password}
            className={classes.textField}
            helperText={passwordError}
            error={passwordError ? true : false}
            fullWidth
            required
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
            className={classes.textField}
            helperText={passwordError ? passwordError : confirmPasswordError}
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
            disabled={loading}
          >
            Reset Password            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />

        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
