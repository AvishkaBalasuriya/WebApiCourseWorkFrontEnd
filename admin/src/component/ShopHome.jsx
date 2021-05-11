import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Aux from "../hoc/_Aux";
import axios from "axios";
import NVD3Chart from "react-nvd3"


class ShopHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datum: [],
      NoOfStudents: 0,
      SchoolName: "",
      PendingInvoiceValue: 0,
      SettledPaymentValue: 0,
      StudentRegistrationsToday: 0,
      ApplicationsTodayViaPortal: 0,
      CourseRegList: [],
      chartData: [],
      chartObject: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Aux>
        <Row>
          <Col md={6} xl={6}>
            <h2 className="f-w-300">{this.state.SchoolName}</h2>
            <p>Showing information for your default School</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-green" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">{this.state.NoOfStudents}</h3>
                    <span className="d-block text-uppercase">
                      Total Students
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-orange" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      Rs. {this.state.PendingInvoiceValue}
                    </h3>
                    <span className="d-block text-uppercase">
                      Total Pending Invoices
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-purple" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      Rs.{this.state.SettledPaymentValue}
                    </h3>
                    <span className="d-block text-uppercase">
                      Total Settled Payments
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-yellow" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      {this.state.StudentRegistrationsToday}
                    </h3>
                    <span className="d-block text-uppercase">
                      Course Registrations Today
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-red" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      {this.state.ApplicationsTodayViaPortal}
                    </h3>
                    <span className="d-block text-uppercase">
                      Portal Applications Today
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} xl={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Course Registration Status</Card.Title>
              </Card.Header>
              <Card.Body>
                <NVD3Chart
                  tooltip={{ enabled: true }}
                  type="discreteBarChart"
                  datum={this.state.chartObject}
                  x="label"
                  y="value"
                  height={300}
                  showValues
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ShopHome;
