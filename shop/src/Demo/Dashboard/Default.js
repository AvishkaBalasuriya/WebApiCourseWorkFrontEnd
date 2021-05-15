import React, { Component } from "react";
import { Row, Col, Card, Button, Carousel, Modal,Badge } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import NVD3Chart from "react-nvd3";
import { connect } from "react-redux";
import ScrollView from "devextreme-react/scroll-view";
import ArrayStore from "devextreme/data/array_store";
import ListData from "../../data/ItemViewList";
import notify from "devextreme/ui/notify";
import APIURl from "../../APIConfig";
import { addToCart } from "../../store/logginActions";
import NavContent from "../../App/layout/AdminLayout/Navigation/NavContent/index";
import PerfectScrollbar from "react-perfect-scrollbar";
import { LoadPanel } from "devextreme-react/load-panel";
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jlItem: [],
      jItems: {},
      jlImageView: {},
      LoadPanelVisible: false,
      ListViewing: false,
      show: false,
      setShow: false,
      searchString: this.props.windowWidth < 992 ? "90px" : "",
      jlCategory: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onClickShearch = (msearch) => {
    this.setState({
      LoadPanelVisible: true,
    });
    console.log("msearch", msearch);
    console.log("msearch", this.state);
    var config = {
      method: "get",
      url: "" + APIURl.URL + 'product?keyword="' + msearch + '"',
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          this.setState({
            jlItem: response.data.data,
          });
        }
        this.setState({
          LoadPanelVisible: false,
        });
      })
      .catch((error) => {
        this.setState({
          LoadPanelVisible: false,
        });
        console.log(error);
      });
  };

  OnListClickEvent = (item) => {
    console.log("e", item);
    this.setState(
      { ListViewing: !this.state.ListViewing, jItems: [], jlImageView: {} },
      () => {
        if (this.state.ListViewing) {
          let filterDate = [];
          let filterImage = [];
          this.state.jlItem.map((value) => {
            if (value._id == item._id) {
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
              });

              console.log("value.images", value.images);
              for (const val of value.images) {
                console.log(val);
                filterImage.push(val.imageUrl);
              }
            }
          });

          console.log("filterDate", filterDate);
          console.log("filterDate", filterImage);

          this.setState({
            jItems: filterDate[0],
            jlImageView: filterImage,
          });
        }
      }
    );
  };

  handleShow = (e) => {
    console.log("e", e);
    this.setState({ show: true, setShow: true });
  };

  handleClose = (e) => {
    this.setState({ show: false, setShow: false });
  };

  componentDidMount() {
    this.setState({
      LoadPanelVisible: true,
    });
    console.log("componentDidMount");

    var config2 = {
      method: "get",
      url: "" + APIURl.URL + "category",
      headers: {},
    };

    this.serverRequest = axios(config2)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            jlCategory: response.data.data,
          });
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
        this.setState({
          LoadPanelVisible: false,
        });
      })
      .catch((error) => {
        this.setState({
          LoadPanelVisible: false,
        });
        this.onLoadPanelHiding("Error", "error");
        console.log(error);
      });

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
          console.log("componentDidMount", response.data.data);
        } else {
          this.onLoadPanelHiding(
            response.data.error == null
              ? response.data.message
              : response.data.error,
            "error"
          );
        }
        this.setState({
          LoadPanelVisible: false,
        });
      })
      .catch((error) => {
        this.setState({
          LoadPanelVisible: false,
        });
        this.onLoadPanelHiding("Error", "error");
        console.log(error);
      });
  }

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

  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
    console.log("category--", e);
  };

  OnClickSubCategory = (category) => {
    console.log("category", category);

    this.setState({
      LoadPanelVisible: true,
    });
    console.log("msearch", category);
    console.log("msearch", this.state);
    var config = {
      method: "get",
      url: "" + APIURl.URL + "product/?subCategory=" + category + "",
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log("respones", JSON.stringify(response.data));
        if (response.data.success) {
          this.setState({
            jlItem: response.data.data,
          });
        }
        this.setState({
          LoadPanelVisible: false,
        });
      })
      .catch((error) => {
        this.setState({
          LoadPanelVisible: false,
        });
        console.log(error);
      });
  };
  render() {
    console.log(this.state.jlCategory.length);
    return (
      <Aux>
        <Row>
          <Col md={2} xl={2}>
            {this.state.jlCategory.length == 0 ? (
              <div></div>
            ) : (
              <div>
                {this.state.jlCategory.map((list) => {
                  console.log(list);
                  return (
                    <List
                      key={list._id}
                      subheader={<ListSubheader>{list.name}</ListSubheader>}
                    >
                      {list.subCategory.map((item) => {
                        return (
                          <div key={item._id}>
                            {item.subitems != null ? (
                              <div key={item._id}>
                                <ListItem
                                  button
                                  key={item._id}
                                  onClick={() =>
                                    this.OnClickSubCategory(item._id)
                                  }
                                >
                                  <ListItemText primary={item.name} />
                                  {this.state[item.name] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                                <Collapse
                                  key={list.items._id}
                                  component="li"
                                  in={this.state[item.name]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List disablePadding>
                                    {item.subitems.map((sitem) => {
                                      return (
                                        <ListItem
                                          button
                                          key={sitem._id}
                                          onClick={() =>
                                            this.OnClickSubCategory(
                                              this.sitem._id
                                            )
                                          }
                                        >
                                          <ListItemText
                                            key={sitem._id}
                                            primary={sitem.name}
                                          />
                                        </ListItem>
                                      );
                                    })}
                                  </List>
                                </Collapse>{" "}
                              </div>
                            ) : (
                              <ListItem
                                onClick={() =>
                                  this.OnClickSubCategory(item._id)
                                }
                                button
                                key={item.id}
                              >
                                <ListItemText primary={item.name} />
                              </ListItem>
                            )}
                          </div>
                        );
                      })}
                      <Divider key={list._id} absolute />
                    </List>
                  );
                })}
              </div>
            )}
          </Col>
          <Col md={10} xl={10}>
            <Row>
              <Col md={4} xl={4}></Col>
              <Col md={4} xl={4}>
                <div
                  className="input-group"
                  style={{ padding: "10px", marginBottom: "10px" }}
                >
                  <input
                    type="text"
                    id="msearch"
                    name="msearch"
                    className="form-control"
                    placeholder="Search . . ."
                    onChange={this.onChange}
                  />

                  <span
                    className="input-group-append search-btn btn btn-primary"
                    onClick={() => this.onClickShearch(this.state.msearch)}
                  >
                    <i className="feather icon-search" />
                  </span>
                </div>
              </Col>
              <Col md={4} xl={4}></Col>
            </Row>
            <Row>
              <Col md={4} xl={4}></Col>
              <Col md={4} xl={4}></Col>
              <Col md={4} xl={4}></Col>
            </Row>
            <Row>
              <Col md={4} xl={4}></Col>
              <Col md={4} xl={4}></Col>
            </Row>
            <Row>
              {this.state.jlItem.map((item) => (
                <Col md={3} xl={3}>
                  <Card style={{ width: "18rem" }}>
                    <Carousel onClick={() => this.OnListClickEvent(item)}>
                      {item.images.map((items) => (
                        <Carousel.Item
                          style={{ width: "18rem", height: "20rem" }}
                        >
                          <img
                            className="d-block w-100 h-100"
                            src={items.imageUrl}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Price: {item.price}</Card.Text>
                      {item.discount != 0 ? (
                        <Card.Text>
                          <Badge pill variant="danger">
                            Discount: {item.discount}
                          </Badge>
                        </Card.Text>
                      ) : (
                        <div></div>
                      )}

                      <Button
                        variant="primary"
                        onClick={() => this.props.addToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => this.OnListClickEvent(item)}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

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

        <ListData
          Show={this.state.ListViewing}
          OnHide={this.OnListClickEvent}
          jItems={this.state.jItems}
          jlImageView={this.state.jlImageView}
        ></ListData>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
