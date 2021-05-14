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
import "./../../assets/scss/style.scss";
import { NavLink, Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserID: 0,
      jRegistration: {},
      LoadPanelVisible: false,
      ListViewing: false,
      ReturnToLogin: false,
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
            countryCode:"LK"
          });

          console.log("adasdasd", data);
          var config = {
            method: "post",
            url: `${APIURl.URL}auth/register`,
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
                this.setState({ ReturnToLogin: true });
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
      <>
        {this.state.ReturnToLogin == true ? (
          <Redirect to={"/login"} />
        ) : (
          <Aux>
            <div className="auth-wrapper">
              <div className="auth-conten">
                <div className="auth-bg">
                  <span className="r" />
                  <span className="r s" />
                  <span className="r s" />
                  <span className="r" />
                </div>
                <div className="card">
                  <div className="auth-bg">
                    <span className="r" />
                    <span className="r s" />
                    <span className="r s" />
                    <span className="r" />
                  </div>
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
                      
                      </Item>
                      <Item
                        dataField="firstName"
                        editorOptions={{
                          maxLength: 50,
                        }}
                      >
                        <Label text="First Name" />
                      
                      </Item>

                      <Item
                        dataField="lastName"
                        editorOptions={{
                          maxLength: 50,
                        }}
                      >
                        <Label text="Last Name" />
                      
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
                      
                      </Item>

                      <Item
                        dataField="password"
                        displayFormat="#"
                        editorOptions={{
                          mode: "password",
                        }}
                      >
                        <Label text="Password" />
                       
                      </Item>

                      <Item
                        dataField="passwordConfirm"
                        displayFormat="#"
                        editorOptions={{
                          mode: "password",
                        }}
                      >
                        <Label text="Confirm Password" />
                    
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

                      <Button
                        type="button"
                        style={{ color: "white" }}
                        variant="primary"
                        href="/login"
                        icon="feather icon-layers"
                      >
                        Login
                      </Button>
                    </Navbar>
                  </Card>
                </div>
              </div>
            </div>
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
          </Aux>
        )}
      </>
    );
  }
}

export default Register;
