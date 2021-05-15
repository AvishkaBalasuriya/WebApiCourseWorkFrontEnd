import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import NVD3Chart from "react-nvd3";
import { connect } from "react-redux";
import APIURl from "../../APIConfig";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jDashborad: [],
    };
  }

  componentDidMount() {
    var config = {
      method: "get",
      url: "" + APIURl.URL + "dashboard",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        this.setState({
          jDashborad: response.data.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col md={6} xl={3}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Orders</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                      {this.state.jDashborad.orderCount}
                    </h3>
                  </div>

                  {/* <div className="col-3 text-right">
                    <p className="m-b-0">50%</p>
                  </div> */}
                </div>
        
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={3}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Customer Base</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{" "}
                      {this.state.jDashborad.userCount}
                    </h3>
                  </div>

                  {/* <div className="col-3 text-right">
                    <p className="m-b-0">36%</p>
                  </div> */}
                </div>
         
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Product Count</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />
                      {this.state.jDashborad.productCount}
                    </h3>
                  </div>

                  {/* <div className="col-3 text-right">
                    <p className="m-b-0">70%</p>
                  </div> */}
                </div>
          
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={3}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Venders</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{" "}
                      {this.state.jDashborad.vendorCount}
                    </h3>
                  </div>
                </div>
          
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);
