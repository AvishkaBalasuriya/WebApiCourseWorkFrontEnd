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
  Summary,
  GroupItem,
} from "devextreme-react/data-grid";

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jlOrder: [],
    };

    this.status = [
      {
        id: 0,
        value: "Pending",
      },
      {
        id: 1,
        value: "Accept",
      },
      {
        id: 3,
        value: "Processing",
      },
      {
        id: 4,
        value: "Shipping",
      },
      {
        id: 5,
        value: "Deliverd",
      },
    ];
    this.FormRef = React.createRef();
  }

  componentDidMount() {
    var config = {
      method: "get",
      url: `${APIURl.URL}order`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
        "Content-Type": "application/json",
      },
    };

    this.serverRequest = axios(config)
      .then((response) => {
        if (response.data.success) {
          let ReCreateOrder = [];

          console.log("this.response.data.data", response.data);
          response.data.data.map((order) => {
            order.cart.items.map((cartItem) => {
              console.log(cartItem.product.images);
              ReCreateOrder.push({
                createdAt: order.createdAt,
                name: cartItem.product.name,
                description: cartItem.product.description,
                price: cartItem.product.price,
                discount: cartItem.product.discount,
                qty: cartItem.qty,
                image:
                  cartItem.product.images.length > 0
                    ? cartItem.product.images[0].imageUrl
                    : "",
                _id: order._id,
                status: order.status,
              });
            });
          });

          console.log("222222222", ReCreateOrder);
          this.setState({ jlOrder: ReCreateOrder });
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

  onRowUpdated = (e) => {
    console.log("e", e);

    Swal.fire({
      type: "info",
      showCancelButton: true,
      text: "Do you want to update ?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((res) => {
      if (res.value) {
        this.setState({ LoadPanelVisible: true });

        var data = JSON.stringify({
          order: e.key,
          status: e.data.status,
        });
        var config = {
          method: "put",
          url: "" + APIURl.URL + "order",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken") + "",
            "Content-Type": "application/json",
          },

          data: data,
        };

        axios(config)
          .then((response) => {
            if (response.data.success) {
              this.componentDidMount();
              this.onLoadPanelHiding(
                response.data.error == null
                  ? response.data.message
                  : response.data.error,
                "success"
              );
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
        <Card title="Order Status">
          <DataGrid
            id="grid-subject"
            ref={this.GridRef}
            dataSource={this.state.jlOrder}
            keyExpr="_id"
            showBorders={true}
            allowSearch={true}
            onRowUpdated={this.onRowUpdated}
          >
            <Editing mode="popup" useIcons={true} allowUpdating={true}>
              <Popup title="Add Main Category" showTitle={true}></Popup>
            </Editing>
            <Column
              dataField="createdAt"
              caption="Create Date"
              editorType={{
                dataType: "date",
              }}
              groupIndex={0}
            ></Column>
            <Column
              dataField="image"
              width={100}
              cellRender={this.renderGridCell}
            />
            <Column dataField="name" caption="Item Name"></Column>
            <Column dataField="description" caption="Item Description"></Column>
            <Column
              dataField="qty"
              caption="Item Qty"
              editorOptions={{
                dataType: "number",
                maxLength: 50,
                format: "#,##0.00",
              }}
            ></Column>
            <Column
              dataField="discount"
              caption="Discount"
              editorOptions={{
                dataType: "number",
                maxLength: 50,
                format: "#,##0.00",
              }}
            ></Column>
            <Column
              dataField="price"
              caption="Price"
              editorOptions={{
                dataType: "number",
                maxLength: 50,
                format: "#,##0.00",
              }}
            ></Column>
            <Column dataField="status" caption="Order Status">
              <Lookup
                dataSource={this.status}
                valueExpr="id"
                displayExpr="value"
              />
            </Column>

            <Summary>
              <GroupItem
                column="price"
                summaryType="sum"
                displayFormat="Total: {0}"
                showInGroupFooter={true}
              />
            </Summary>
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

export default Order;
