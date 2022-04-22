import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logoutAction } from "../redux/actions/authActions";

import { useTranslation } from "react-i18next";
import { Dropdown } from "semantic-ui-react";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#e8ede1",
    marginBottom: 10,
  },
  title: { flex: 1, marginLeft: 60, color: "black" },
  buttonStyles: {
    color: "black",
    margin: "0 6px 0",
    display: "inline-block",
  },
  buttons: {
    marginRight: 60,
  },
  name: {
    fontStyle: "bold",
    fontSize: 32,
  },
}));

export default function AppBarPrimary() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    account: { role },
    authenticated,
    firstName,
    lastName,
    address,
  } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction(history));
  };

  const { t, i18n } = useTranslation(["translation"]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  const languageOptions = [
    { key: "English", text: "English", value: "en" },
    { key: "Hindi", text: "Hindi", value: "hi" },
    { key: "Gujarati", text: "Gujarati", value: "gu" }
  ];

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            <span className={classes.name}>StrEAT</span>
          </Typography>
        </Link>

        <div>
        <button type="button" onClick={() => changeLanguage("hi")}>
          {t("translation:hi")}
        </button> &nbsp;

        <button type="button" onClick={() => changeLanguage("gu")}>
          {t("translation:gu")}
        </button> &nbsp;

        <button type="button" onClick={() => changeLanguage("en")}>
          {t("translation:en")}
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
            
            {/* <Dropdown
              button
              className='icon'
              floating
              labeled
              icon='world'
              options={languageOptions}
              search
              text='Select Language'
              onChange={changeLanguage("en")}
            /> */}
        
      

        {authenticated ? (
          role === "ROLE_SELLER" ? (
            <div className={classes.buttons}>
              <Typography className={classes.buttonStyles}>
              {t("seller_dashboard")}
              </Typography>
              <Link to="/seller/orders">
                <Button className={classes.buttonStyles}>{ t("Buttons.orders")}</Button>
              </Link>
              <Button
                onClick={handleLogout}
                className={classes.buttonStyles}
                variant="outlined"
              >
                { t("Buttons.logout")}
              </Button>
            </div>
          ) : (
            <div className={classes.buttons}>
              <Typography className={classes.buttonStyles}>
                Hello, {firstName} {lastName}
              </Typography>
              <Link to="/orders">
                <Button className={classes.buttonStyles}>{ t("Buttons.orders")}</Button>
              </Link>
              <Link to={{ pathname: "/cart", state: { address: address } }}>
                <Button className={classes.buttonStyles}>{ t("Buttons.cart")}</Button>
              </Link>
              <Button
                onClick={handleLogout}
                className={classes.buttonStyles}
                variant="outlined"
              >
                { t("Buttons.logout")}
              </Button>
            </div>
          )
        ) : (
          <div className={classes.buttons}>
            <Link to="/login">
              <Button className={classes.buttonStyles}>{ t("Buttons.login")}</Button>
            </Link>
            <Link to="/register">
              <Button className={classes.buttonStyles} variant="outlined">
              { t("Buttons.register")}
              </Button>
            </Link>
            
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
