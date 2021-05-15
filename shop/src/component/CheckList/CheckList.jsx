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
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
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

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MasterCategoryID: 0,
      jlCheckList: [],
      jMasterCategory: [],
      LoadPanelVisible: false,
      ListViewing: false,
      returnToLogin: false,
    };

    this.FormRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      jlCheckList: this.props.data.cart,
    });
  }

  get FormLayout() {
    return this.FormRef.current.instance;
  }

  OnClickSave = () => {
    Swal.fire({
      type: "info",
      showCancelButton: true,
      text: "Do you want to chek out list ?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((res) => {
      if (res.value) {
     
        
        if (this.props.data.user.length != 0) {
          if (this.props.data.user.data.accessToken != null) {
            this.setState({
              LoadPanelVisible: true,
            });
            let productCart = [];
            let total = 0;
            let discount = 0;

            this.state.jlCheckList.map((item) => {
              productCart.push({
                productId: item._id,
                qty: item.qty,
              });
              discount = discount + item.discount;
              total = total + item.price;
            });
            total = total - discount;

            console.log("productCart", productCart);
            var data = JSON.stringify({
              user: this.props.data.user.data.accessToken.id,
              cart: productCart,
              total: total,
              status: 0,
            });

            var config = {
              method: "post",
              url: "" + APIURl.URL + "order",
              headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("accessToken") + "",
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then((response) => {
                console.log("respones", response.data);
                if (response.data.success) {
                  console.log("ok", response.data);
                  this.onLoadPanelHiding(response.data.message, "success");

                  this.OnClearForm();
                } else {
                  console.log("elese", response.data);
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

                this.onLoadPanelHiding("Error", "error");
              });
          }
        } else {
          this.setState({ returnToLogin: true });
        }
      } else if (res.dismiss == "cancel") {
      } else if (res.dismiss == "esc") {
      }
    });
  };

  OnClearForm = () => {
    localStorage.setItem("cart", null);
    this.setState({
      jRegistration: {},
      jlCheckList: [],
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

  onRowRemoved = (e) => {
    let oldData = JSON.parse(localStorage.getItem("cart"));
    let removedList = [];
    if (oldData.length > 0) {
      oldData.map((items) => {
        if (items._id != e.key) {
          removedList.push(items);
        }
      });
    }
    localStorage.setItem("cart", JSON.stringify(removedList));
    console.log("log", removedList);

    console.log("key", e.key);
    console.log("key", e);
    this.componentDidMount();
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

  calculateSelectedRow(options) {
    if (options.name === "SelectedRowsSummary") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value._id)) {
          options.totalValue = options.totalValue + options.value.price;
        }
      }
    }
  }

  ReturnToLogin = () => {
    return (
      <Aux>
        return <Redirect to={"/register"} />;
      </Aux>
    );
  };

  render() {
    return (
      <>
        {this.state.returnToLogin == true ? (
          <Redirect to={"/login"} />
        ) : (
          <Aux>
            <Card title="Check List">
              <DataGrid
                id="grid-subject"
                ref={this.GridRef}
                dataSource={this.state.jlCheckList}
                keyExpr="_id"
                showBorders={true}
                allowSearch={true}
                onRowInserting={this.onInitNewRow}
                onRowRemoved={this.onRowRemoved}
              >
                <Editing mode="popup" useIcons={true} allowDeleting={true}>
                  <Popup title="Add Main Category" showTitle={true}></Popup>
                </Editing>
                <Column
                  dataField="image"
                  width={150}
                  cellRender={this.renderGridCell}
                />
                <Column dataField="name" caption="Item Name"></Column>
                <Column dataField="qty" caption="Quantity"></Column>
                <Column dataField="discount" caption="Discount"></Column>
                <Column dataField="price" caption="Price"></Column>

                <Summary recalculateWhileEditing={true}>
                  <TotalItem column="image" summaryType="count" />
                  <TotalItem column="price" summaryType="sum" />
                  <TotalItem column="discount" summaryType="sum" />
                  <TotalItem column="qty" summaryType="sum" />
                </Summary>
              </DataGrid>

              <Navbar bg="" variant="light">
                <Button
                  variant="success"
                  icon="feather icon-layers"
                  onClick={this.OnClickSave}
                >
                  Check Out
                </Button>
                <Button variant="warning" icon="feather icon-layers">
                  Clear
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
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(CheckList);
