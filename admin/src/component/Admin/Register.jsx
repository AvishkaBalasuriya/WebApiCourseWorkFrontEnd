import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import Form, { Label, Item, RequiredRule } from "devextreme-react/form";
import "devextreme-react/text-area";
import Card from "../../App/components/MainCard";
import { Button, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { LoadPanel } from "devextreme-react/load-panel";
import Swal from "sweetalert2";
import notify from "devextreme/ui/notify";
import APIURl from "../../APIConfig";
import OTPEmail from "../../DataLists/OTPEmail";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserID: 0,
      jRegistration: {},
      LoadPanelVisible: false,
      ListViewing: false,
    };

    this.FormRef = React.createRef();
  }

  componentDidMount() {}

  get FormLayout() {
    return this.FormRef.current.instance;
  }

  OnClickSave = () => {
    if (this.FormLayout.validate().isValid == true) {
      Swal.fire({
        type: "info",
        showCancelButton: true,
        text: "Do you want to save ?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((res) => {
        if (res.value) {
          this.setState({ LoadPanelVisible: true });

          var data = JSON.stringify({
            email: this.state.jRegistration.email,
            password: this.state.jRegistration.password,
            passwordConfirm: this.state.jRegistration.passwordConfirm,
            firstName: this.state.jRegistration.firstName,
            lastName: this.state.jRegistration.lastName,
            mobileNumber: this.state.jRegistration.mobileNumber,
            address: this.state.jRegistration.address,
            isSocial: false,
          });

          console.log("adasdasd", data);
          var config = {
            method: "post",
            url: `${APIURl.URL}auth/register/admin`,
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("accessToken") + "",
              "Content-Type": "application/json",
            },
            data: data,
          };

          this.serverRequest = axios(config)
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
              //this.OnListClickEvent();
            })
            .catch((error) => {
              this.onLoadPanelHiding("Error", "error");
              console.log(error);
            });
        } else if (res.dismiss == "cancel") {
        } else if (res.dismiss == "esc") {
        }
      });
    } else {
      notify({
        message: "Fields marked with * are required",
        type: "error",
        displayTime: 3000,
        position: { at: "top right", offset: "50" },
      });
    }
  };

  OnClearForm = () => {
    this.setState({
      jRegistration: {},
    });
  };

  onLoadPanelHiding = (message, type) => {
    this.setState({
      LoadPanelVisible: false,
    });

    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  OnListClickEvent = () => {
    this.setState({ ListViewing: !this.state.ListViewing }, () => {});
  };

  render() {
    return (
      <Aux>
        <Card title="User Registration">
          <Form
            ref={this.FormRef}
            colCount={2}
            formData={this.state.jRegistration}
          >
            <Item
              dataField="email"
              editorOptions={{
                maxLength: 100,
              }}
            >
              <Label text="Email" />
              <RequiredRule message="Email is required" />
            </Item>
            <Item
              dataField="firstName"
              editorOptions={{
                maxLength: 50,
              }}
            >
              <Label text="First Name" />
              <RequiredRule message="First Name is required" />
            </Item>

            <Item
              dataField="lastName"
              editorOptions={{
                maxLength: 50,
              }}
            >
              <Label text="Last Name" />
              <RequiredRule message="Last Name is required" />
            </Item>

            <Item
              dataField="mobileNumber"
              editorOptions={{
                maxLength: 12,
              }}
            >
              <Label text="Mobile Number" />
            </Item>

            <Item
              colSpan={2}
              dataField="address"
              editorType="dxTextArea"
              editorOptions={this.notesOptions}
            >
              <Label text="Address" />
              <RequiredRule message="Address is required" />
            </Item>

            <Item
              dataField="password"
              displayFormat="#"
              editorOptions={{
                mode: "password",
              }}
            >
              <Label text="Password" />
              <RequiredRule message="Password is required" />
            </Item>

            <Item
              dataField="passwordConfirm"
              displayFormat="#"
              editorOptions={{
                mode: "password",
              }}
            >
              <Label text="Confirm Password" />
              <RequiredRule message="Confirm Password is required" />
            </Item>
          </Form>

          <Navbar bg="" variant="light">
            <Button
              variant="success"
              icon="feather icon-layers"
              onClick={this.OnClickSave}
            >
              Save
            </Button>
            <Button variant="warning" icon="feather icon-layers">
              Clear
            </Button>

            <Button variant="primary" icon="feather icon-layers">
              View List
            </Button>
          </Navbar>
        </Card>

        <LoadPanel
          message="Processing.... Please, wait..."
          shadingColor="rgba(0,0,0,0.4)"
          onHiding={this.onLoadPanelHiding}
          visible={this.state.LoadPanelVisible}
          showIndicator={true}
          shading={true}
          showPane={true}
          closeOnOutsideClick={false}
          width={500}
        />

        <OTPEmail
          Show={this.state.ListViewing}
          OnHide={this.OnListClickEvent}
          User={this.state.jlRegister}
        ></OTPEmail>
      </Aux>
    );
  }
}

export default Register;
