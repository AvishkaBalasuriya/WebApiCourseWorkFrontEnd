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
  Form as MyForm,
} from "devextreme-react/data-grid";
import FileUploader from "devextreme-react/file-uploader";

class Vender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Vender: 0,
      jVender: {},
      jFormData: {},
      File: {},
    };

    this.FormRef = React.createRef();
  }

  componentDidMount() {
    var config = {
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
          this.setState({ jVender: response.data.data });
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

  OnClearForm = () => {
    this.setState({
      Vender: 0,
      jVender: {},
      jFormData: {},
      File: {},
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

  setFileName(rowData, value) {
    rowData.profileImage = this.state.File.Name;
  }

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

        console.log("File name", e);
        var data = new FormData();
        data.append("name", e.data.name);
        data.append("country", e.data.country);
        data.append("logo", this.state.File[0]);

        console.log("adasdasd", data);
        var config = {
          method: "post",
          url: `${APIURl.URL}vendor`,
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

  onValueChanged = (e) => {
    this.setState({ File: e.value });
  };
  renderGridCell(cellData) {
    console.log("celldate", cellData.value);
    return (
      <div>
        <img
          style={{ width: "100px", height: "100px" }}
          src={cellData.value}
        ></img>
      </div>
    );
  }

  onRowRemoved = (e) => {
    this.setState({ LoadPanelVisible: true });

    var data = JSON.stringify({
      masterCategoryId: e.key,
    });

    var config = {
      method: "delete",
      url: `${APIURl.URL}vendor/${e.key}`,
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
        this.componentDidMount();
      })
      .catch((error) => {
        this.onLoadPanelHiding("Error", "error");
        console.log(error);
      });
  };

  OnClickDelete = () => {
    Swal.fire({
      type: "info",
      showCancelButton: true,
      text: "Do you want to delete all ?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((res) => {
      if (res.value) {
        this.setState({ LoadPanelVisible: true });

        var config = {
          method: "delete",
          url: `${APIURl.URL}vendor`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
            "Content-Type": "application/json",
          },
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
        <Card title="Vender">
          <DataGrid
            id="grid-subject"
            ref={this.GridRef}
            dataSource={this.state.jVender}
            keyExpr="_id"
            showBorders={true}
            allowSearch={true}
            onRowInserting={this.onInitNewRow}
            onRowRemoved={this.onRowRemoved}
          >
            <Editing
              mode="form"
              useIcons={true}
              allowDeleting={true}
              allowAdding={true}
            >
              <MyForm colCount={2} formData={this.state.jFormData}>
                <Item dataField="country"></Item>
                <Item dataField="name"></Item>
                <Item dataField="profileImage">
                  <FileUploader
                    selectButtonText="Upload Image"
                    uploadMode="useForm"
                    allowCanceling={true}
                    allowedFileExtensions={[".jpg", ".jpeg", ".gif", ".png"]}
                    onValueChanged={this.onValueChanged}
                  />
                </Item>
              </MyForm>
            </Editing>
            <Column dataField="country" caption="Country" groupIndex={0} />
            <Column dataField="name" caption="Name">
              <RequiredRule />
            </Column>
            <Column
              defaultVisible={false}
              dataField="profileImage"
              setCellValue={this.setFileName}
            ></Column>
            <Column dataField="logo" cellRender={this.renderGridCell} />
          </DataGrid>

          <Navbar bg="" variant="light">
            <Button
              variant="danger"
              icon="feather icon-layers"
              onClick={this.OnClickDelete}
            >
              Delete All
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
      </Aux>
    );
  }
}

export default Vender;
