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
import FileUploader from "devextreme-react/file-uploader";
import ProgressBar from "devextreme-react/progress-bar";
import OTPEmail from "../../DataLists/OTPEmail";
var fs = require("fs");

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserID: 0,
      jItems: {},
      LoadPanelVisible: false,
      ListViewing: false,
      jMasterCategory: [],
      jSubCategory: [],
      jVender: [],
      File: [],
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

    var config2 = {
      method: "get",
      url: `${APIURl.URL}vendor`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
    };

    this.serverRequest = axios(config)
      .then((response) => {
        if (response.data.success) {
          let subCat = [];
          response.data.data.map((value) => {
            if (value.subCategory.length > 0) {
              console.log();
              for (const val of value.subCategory) {
                subCat.push(val);
              }
            }
          });

          this.setState({
            jMasterCategory: response.data.data,
            jSubCategory: subCat,
          });
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

    this.serverRequest = axios(config2)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            jVender: response.data.data,
          });
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

          var data = new FormData();
          data.append("vendorId", this.state.jItems.vendorId);
          data.append("masterCategoryId", this.state.jItems.masterCategoryId);
          data.append("subCategoryId", this.state.jItems.subCategoryId);
          data.append("name", this.state.jItems.name);
          data.append("description", this.state.jItems.description);
          data.append("price", this.state.jItems.price);
          data.append("discount", this.state.jItems.discount);
          data.append("isAvailable", this.state.jItems.isAvailable);
          data.append("status", this.state.jItems.status);
          data.append(
            "images",
            fs.createReadStream(
              "/Users/avishkabalasuriya/Downloads/vendor_default.png"
            )
          );
          data.append(
            "images",
            fs.createReadStream(
              "/Users/avishkabalasuriya/Downloads/product_default.jpeg"
            )
          );
          data.append(
            "images",
            fs.createReadStream(
              "/Users/avishkabalasuriya/Downloads/515CBCE833E34FE39BE1C78D6C740115 (1).jpg"
            )
          );
          data.append(
            "images",
            fs.createReadStream(
              "/Users/avishkabalasuriya/Downloads/515CBCE833E34FE39BE1C78D6C740115 (2).jpg"
            )
          );

          console.log("adasdasd", data);
          var config = {
            method: "post",
            url: `${APIURl.URL}products/add`,
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
      jItems: {},
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

  onValueChanged = (e) => {
    this.setState({ File: e.value[0] });
    console.log("++++++++++",this.stategit)
  };

  render() {
    return (
      <Aux>
        <Card title="Manage Items">
          <Form ref={this.FormRef} colCount={2} formData={this.state.jItems}>
            <Item
              dataField="name"
              editorOptions={{
                maxLength: 100,
              }}
            >
              <Label text="Item Name" />
              <RequiredRule message="Item Name is required" />
            </Item>

            <Item
              dataField="vendorId"
              editorType="dxSelectBox"
              editorOptions={{
                items: this.state.jVender,
                valueExpr: "_id",
                displayExpr: "name",
              }}
            >
              <Label text="Vender" />
              <RequiredRule />
            </Item>

            <Item
              dataField="masterCategoryId"
              editorType="dxSelectBox"
              editorOptions={{
                items: this.state.jMasterCategory,
                valueExpr: "_id",
                displayExpr: "name",
              }}
            >
              <Label text="Main Category" />
              <RequiredRule />
            </Item>

            <Item
              dataField="subCategoryId"
              editorType="dxSelectBox"
              editorOptions={{
                items: this.state.jSubCategory,
                valueExpr: "_id",
                displayExpr: "name",
              }}
            >
              <Label text="Sub Category" />
              <RequiredRule />
            </Item>

            <Item
              colSpan={2}
              dataField="description"
              editorType="dxTextArea"
              editorOptions={this.notesOptions}
            >
              <Label text="Item Description" />
              <RequiredRule message="Item Description is required" />
            </Item>

            <Item
              dataField="price"
              dataType="number"
              editorOptions={{
                maxLength: 50,
                format: "#,##0.00",
              }}
            >
              <Label text="Price" />
              <RequiredRule message="Price is required" />
            </Item>

            <Item
              dataField="discount"
              dataType="number"
              editorOptions={{
                maxLength: 50,
                format: "#,##0.00",
              }}
            >
              <Label text="Discount" />
            </Item>

            <Item dataField="isAvailable" editorType="dxCheckBox">
              <Label text="Active" />
            </Item>

            <Item dataField="status" editorType="dxCheckBox">
              <Label text="Published" />
            </Item>
          </Form>

          <div className="main-block">
            <div className="file-uploader-block">
              <FileUploader
                multiple={true}
                uploadMode="useButtons"
                uploadUrl="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
                allowedFileExtensions={[".jpg", ".jpeg", ".gif", ".png"]}
                onValueChanged={this.onValueChanged}
              />
              <span className="note">
                {"Allowed file extensions: "}
                <span>.jpg, .jpeg, .gif, .png</span>.
              </span>
            </div>
          </div>

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

export default Items;
