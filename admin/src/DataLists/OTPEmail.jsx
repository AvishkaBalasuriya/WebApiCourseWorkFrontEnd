import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DataGrid, {
  Column,
  SearchPanel,
  GroupPanel,
  Paging,
} from "devextreme-react/data-grid";
import Form, { Label, Item, RequiredRule } from "devextreme-react/form";
import axios from "axios";
import APIURl from "../APIConfig";

export class OTPEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SelectID: 0,
      jList: [],
      jOTP: {},
    };

    console.log(this.props);
  }

  componentDidMount() {}

  onSelectionChanged = (e) => {
    this.setState({ SelectID: e.selectedRowsData[0].AutoID });
  };

  onSelectClick = (e) => {
    var data = JSON.stringify({
      userId: "60991e3473e8454fc0a40649",
      otpCode: "574122",
    });

    console.log("adasdasd", data);
    var config = {
      method: "post",
      url: `${APIURl.URL}otp/verify`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.data.success) {
          this.onLoadPanelHiding(response.data.message, "success");

          this.OnClearForm();
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
        this.OnListClickEvent();
      })
      .catch((error) => {
        this.onLoadPanelHiding("Error", "error");
        console.log(error);
      });

    this.props.OnHide();
  };

  onCloseClick = (e) => {
    this.props.OnHide(0);
  };

  render() {
    return (
      <Fragment>
        <Modal
          size="xl"
          show={this.props.Show}
          onHide={this.onCloseClick}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Email Variication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this.FormRef} colCount={2} formData={this.state.jOTP}>
              <Item
                dataField="otpCode"
                editorOptions={{
                  maxLength: 50,
                  dataType: "number",
                }}
              >
                <Label text="OTP " />
              </Item>
            </Form>

            <br></br>
            <br></br>

            <Button variant="success" onClick={this.onSelectClick}>
              Verify
            </Button>
            <Button
              variant="danger"
              onClick={this.onCloseClick}
              icon="feather icon-layers"
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default OTPEmail;
