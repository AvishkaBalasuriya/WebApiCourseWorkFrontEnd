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
import List from "../../DataLists/ItemList";
import Gallery from "devextreme-react/gallery";
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
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ItemID: 0,
      jItems: {},
      jlItem: [],
      LoadPanelVisible: false,
      ListViewing: false,
      jMasterCategory: [],
      jSubCategory: [],
      jVender: [],
      File: [],
      jlImageView: [],
      jlImageId: [],
      jlRemovedImage: [],
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

          if (this.state.File.length != 0) {
            this.state.File.forEach((element) => {
              data.append("images", element);
            });
          } else {
            data.append("images", []);
          }

          if (this.state.ItemID == 0) {
            var config = {
              method: "post",
              url: `${APIURl.URL}product`,
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("accessToken") + "",
                "Content-Type": "application/json",
              },
              data: data,
            };
          } else {
            console.log("deleteimages", this.state.jlRemovedImage);
            data.append("productId", this.state.jItems.productId);
            data.append(
              "deletedImages",
              JSON.stringify(this.state.jlRemovedImage)
            );
            var config = {
              method: "put",
              url: `${APIURl.URL}product`,
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("accessToken") + "",
                "Content-Type": "application/json",
              },
              data: data,
            };
          }

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
    console.log("clear");
    this.setState({
      ItemID: 0,
      jItems: {},
      jlItem: [],
      LoadPanelVisible: false,
      ListViewing: false,
      jMasterCategory: [],
      jSubCategory: [],
      jVender: [],
      File: [],
      jlImageView: [],
      jlImageId: [],
      jlRemovedImage: [],
    });
    this.componentDidMount();
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
    this.setState({ File: e.value });
    console.log("++++++++++", this.state);
  };

  OnListClickEvent = (SelectID) => {
    console.log("+++++++++", SelectID);
    this.setState({ ListViewing: !this.state.ListViewing }, () => {
      if (this.state.ListViewing) {
        //Open

        var config = {
          method: "get",
          url: `${APIURl.URL}product`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
            "Content-Type": "application/json",
          },
        };

        this.serverRequest = axios(config)
          .then((response) => {
            if (response.data.success) {
              this.setState({ jlItem: response.data.data });
              console.log("-----------------------", this.state);
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
      if (!this.state.ListViewing && SelectID != 0) {
        //Close
        this.setState({ ItemID: SelectID }, () => this.OnLoadData());
      }
    });
  };

  renderGridCell(cellData) {
    console.log("celldate", cellData.value);
    return (
      <div>
        <img
          style={{ width: "100px", height: "100px", padding: "10px" }}
          src={cellData.value}
        ></img>
      </div>
    );
  }

  OnLoadData() {
    let filterDate = [];
    let filterImage = [];
    let filterImageID = [];
    this.state.jlItem.map((value) => {
      if (value._id == this.state.ItemID) {
        filterDate.push({
          vendorId: value.vendor,
          masterCategoryId: value.masterCategory,
          subCategoryId: value.subCategory,
          name: value.name,
          description: value.description,
          price: value.price,
          discount: value.discount,
          isAvailable: value.isAvailable,
          status: value.status,
          productId: value._id,
        });

        console.log("value.images", this.state.jlItem);
        for (const val of value.images) {
          console.log(val);
          filterImage.push(val.imageUrl);
          filterImageID.push(val);
        }
      }
    });

    console.log("filterDate", filterDate);
    console.log("filterDate", filterImageID);

    this.setState({
      jItems: filterDate[0],
      jlImageView: filterImage,
      jlImageId: filterImageID,
    });
  }

  onRowRemoved = (e) => {
    this.state.jlRemovedImage.push(e.key);
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
              editorType="dxNumberBox"
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
              editorType="dxNumberBox"
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

            <Item
              dataField="FileUpload"
              editorType="dxFileUploader"
              editorOptions={{
                multiple: true,
                uploadMode: "useForm",
                allowCanceling: true,
                allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],
                onValueChanged: this.onValueChanged,
              }}
            >
            
            </Item>
          </Form>

          {/* <div className="main-block">
            <div className="file-uploader-block">
              <FileUploader
                multiple={true}
                uploadMode="useForm"
                allowCanceling={true}
                allowedFileExtensions={[".jpg", ".jpeg", ".gif", ".png"]}
                onValueChanged={this.onValueChanged}
              />
              <span className="note">
                {"Allowed file extensions: "}
                <span>.jpg, .jpeg, .gif, .png</span>.
              </span>
            </div>
          </div> */}

          <DataGrid
            id="grid-subject"
            ref={this.GridRef}
            dataSource={this.state.jlImageId}
            keyExpr="_id"
            showBorders={true}
            allowSearch={true}
            onRowRemoved={this.onRowRemoved}
          >
            <Editing mode="popup" useIcons={true} allowDeleting={true}>
              <Popup title="Add Main Category" showTitle={true}></Popup>
            </Editing>
            <Column dataField="imageUrl" cellRender={this.renderGridCell} />
          </DataGrid>

          <div className="widget-container">
            <Gallery
              id="gallery"
              dataSource={this.state.jlImageView}
              height={300}
              slideshowDelay={true ? 2000 : 0}
              loop={true}
              showNavButtons={true}
              showIndicator={true}
            />
          </div>

          <Navbar bg="" variant="light">
            <Button
              variant="success"
              icon="feather icon-layers"
              onClick={this.OnClickSave}
            >
              Save
            </Button>
            <Button
              variant="warning"
              icon="feather icon-layers"
              onClick={this.OnClearForm}
            >
              Clear
            </Button>

            <Button
              variant="primary"
              icon="feather icon-layers"
              onClick={this.OnListClickEvent}
            >
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

        <List
          Show={this.state.ListViewing}
          OnHide={this.OnListClickEvent}
          ItemList={this.state.jlItem}
        ></List>
      </Aux>
    );
  }
}

export default Items;
