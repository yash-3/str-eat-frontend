import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { getOrders, socketStatusUpdate } from "../redux/actions/dataActions";
import OrderCard from "../components/OrderCard";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "10px 0px 10px 130px",
    display: "inline-block",
    marginRight: "40%",
  },
}));

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.data);
  const {
    account: { role },
    _id,
  } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrders());
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id });
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order));
      }
      if (data.action === "create") {
        dispatch(getOrders());
        dispatch(getOrders());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { t, i18n } = useTranslation(["translation"]);

  return (
    <>
      <Typography variant="h5" className={classes.title}>
      {t("order_history")}
      </Typography>
      <Grid item container direction="row">
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={2}>
            {orders ? (
              orders.length > 0 ? (
                orders.map((order) => (
                  <Grid item xs={12} sm={4} key={order._id}>
                    <OrderCard order={order} role={role} />
                  </Grid>
                ))
              ) : (
                <p className={classes.para}>{t ("no_order_present")}</p>
              )
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
    </>
  );
};

export default Orders;
