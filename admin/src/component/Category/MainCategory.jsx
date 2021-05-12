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
import DataGrid, {
  Column,
  Editing,
  MasterDetail,
  Popup,
  Lookup,
  Scrolling,
  Paging,
  Selection,
  SearchPanel,
} from "devextreme-react/data-grid";

class MainCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MasterCategoryID: 0,
      jMasterCategory: [],
      LoadPanelVisible: false,
      ListViewing: false,
    };

    this.FormRef = React.createRef();
  }

  componentDidMount() {
    var config = {
      method: "get",
      url: `${APIURl.URL}category`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
    };

    this.serverRequest = axios(config)
      .then((response) => {
        if (response.data.success) {
          this.setState({ jMasterCategory: response.data.data });
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }

        console.log("-----------------------", this.state);
        //this.OnListClickEvent();
      })
      .catch((error) => {
        this.onLoadPanelHiding("Error", "error");
        console.log(error);
      });
  }

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
                this.componentDidMount();
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
  onInitNewRow = (e) => {
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
          name: e.data.name,
        });

        var config = {
          method: "post",
          url: `${APIURl.URL}category/add/masterCategory`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
            "Content-Type": "application/json",
          },
          data: data,
        };

        this.serverRequest = axios(config)
          .then((response) => {
            if (response.data.success) {
              this.onLoadPanelHiding(response.data.message, "success");
            } else {
              this.onLoadPanelHiding(
                response.data.error == null
                  ? response.data.message
                  : response.data.error,
                "error"
              );
            }
          })
          .catch((error) => {
            this.onLoadPanelHiding("Error", "error");
            console.log(error);
          });
      } else if (res.dismiss == "cancel") {
      } else if (res.dismiss == "esc") {
      }
    });
  };

  render() {
    return (
      <Aux>
        <Card title="Master Category">
          <DataGrid
            id="grid-subject"
            ref={this.GridRef}
            dataSource={this.state.jMasterCategory}
            keyExpr="_id"
            showBorders={true}
            allowSearch={true}
            onRowInserting={this.onInitNewRow}
          >
            <Editing
              mode="popup"
              useIcons={true}
              allowDeleting={true}
              allowAdding={true}
            >
              <Popup title="Add Main Category" showTitle={true}></Popup>
            </Editing>
            <Column dataField="name" caption="Main Category">
              <RequiredRule />
            </Column>
          </DataGrid>
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
      </Aux>
    );
  }
}

export default MainCategory;
