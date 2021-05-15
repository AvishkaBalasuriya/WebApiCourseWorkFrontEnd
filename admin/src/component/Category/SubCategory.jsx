import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import axios from "axios";
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
  RequiredRule,
  Lookup,
} from "devextreme-react/data-grid";

class SubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MasterCategoryID: 0,
      jMasterCategory: [],
      jSubCategory: [],
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
          let subCat = [];
          response.data.data.map((value) => {
            if (value.subCategory.length > 0) {
              console.log();
              for (const val of value.subCategory) {
                console.log(val);
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
          masterCategoryId: e.data.masterCategoryId,
          name: e.data.name,
        });

        var config = {
          method: "post",
          url: `${APIURl.URL}category/subCategory`,
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

  onRowRemoved = (e) => {
    this.setState({ LoadPanelVisible: true });

    console.log("daat", e);
    var data = JSON.stringify({
      subCategoryId: e.key,
    });

    var config = {
      method: "delete",
      url: `${APIURl.URL}category/subCategory/${e.key}`,
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
  };

  render() {
    return (
      <Aux>
        <Card title="Sub Category">
          <DataGrid
            id="grid-subject"
            ref={this.GridRef}
            dataSource={this.state.jSubCategory}
            keyExpr="_id"
            showBorders={true}
            allowSearch={true}
            onRowInserting={this.onInitNewRow}
            onRowRemoved={this.onRowRemoved}
          >
            <Editing
              mode="popup"
              useIcons={true}
              allowDeleting={true}
              allowAdding={true}
            >
              <Popup title="Add Main Category" showTitle={true}></Popup>
            </Editing>
            <Column
              dataField="masterCategoryId"
              caption="Main Category"
              groupIndex={0}
            >
              <Lookup
                dataSource={this.state.jMasterCategory}
                valueExpr="_id"
                displayExpr="name"
              />
              <RequiredRule />
            </Column>
            <Column dataField="name" caption="Sub Category">
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

export default SubCategory;
