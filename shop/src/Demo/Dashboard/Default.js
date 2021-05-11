import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import NVD3Chart from "react-nvd3";
import { connect } from "react-redux";
import queryString from "query-string";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log("location-----------------", this.props.location.query);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <Aux>dashboard</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);
