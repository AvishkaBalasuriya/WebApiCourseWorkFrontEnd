import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DataGrid, {
  Column,
  SearchPanel,
  GroupPanel,
  Paging,
} from "devextreme-react/data-grid";
import axios from "axios";
import APIURl from "../APIConfig";
import Gallery from "devextreme-react/gallery";
import notify from "devextreme/ui/notify";

import Form, { Label, Item, RequiredRule } from "devextreme-react/form";

export class ItemViewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SelectID: 0,
      jList: [],
      jMasterCategory: [],
      jSubCategory: [],
      jVender: [],
    };
  }

  componentDidMount() {
    console.log("User", this.props);
    var config = {
      method: "get",
      url: `${APIURl.URL}category`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
    };

    // var config2 = {
    //   method: "get",
    //   url: `${APIURl.URL}vendor`,
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
    //     "Content-Type": "application/json",
    //   },
    // };

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

    //     this.serverRequest = axios(config2)
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.setState({
    //             jVender: response.data.data,
    //           });
    //         } else {
    //           this.onLoadPanelHiding(
    //             response.data.error == null
    //               ? response.data.message
    //               : response.data.error,
    //             "error"
    //           );
    //         }
    //       })
    //       .catch((error) => {
    //         this.onLoadPanelHiding("Error", "error");
    //         console.log(error);
    //       });
  }

  onSelectionChanged = (e) => {
    this.setState({ SelectID: e.selectedRowsData[0]._id });
  };

  onSelectClick = (e) => {
    this.props.OnHide(this.state.SelectID);
  };

  onCloseClick = (e) => {
    this.props.OnHide(0);
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
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this.FormRef} colCount={2} formData={this.props.jItems}>
              <Item
                dataField="name"
                editorOptions={{
                  maxLength: 100,
                  readOnly: true,
                }}
              >
                <Label text="Item Name" />
                <RequiredRule message="Item Name is required" />
              </Item>

              {/* <Item
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
              </Item> */}

              <Item
                dataField="masterCategoryId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jMasterCategory,
                  valueExpr: "_id",
                  displayExpr: "name",
                  readOnly: true,
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
                  readOnly: true,
                }}
              >
                <Label text="Sub Category" />
                <RequiredRule />
              </Item>

              <Item
                colSpan={2}
                dataField="description"
                editorType="dxTextArea"
                editorOptions={{ readOnly: true }}
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
                  readOnly: true,
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
                  readOnly: true,
                }}
              >
                <Label text="Discount" />
              </Item>
            </Form>
            <div className="widget-container">
              <Gallery
                id="gallery"
                dataSource={this.props.jlImageView}
                height={300}
                slideshowDelay={true ? 2000 : 0}
                loop={true}
                showNavButtons={true}
                showIndicator={true}
              />
            </div>
            <br></br>
            <br></br>

            <Button variant="secondary">Add to Cart</Button>
            <Button
              variant="secondary"
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

export default ItemViewList;
