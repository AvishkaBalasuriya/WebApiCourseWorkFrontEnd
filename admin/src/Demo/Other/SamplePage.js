import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import Form, { SimpleItem, Item, EmptyItem } from "devextreme-react/form";
import TextArea from "devextreme-react/text-area";
import SelectBox from "devextreme-react/select-box";
import validationEngine from "devextreme/ui/validation_engine";

const renderPicture = (data) => <img src={data.editorOptions.value} />;

class SamplePage extends Component {
  constructor(props) {
    super(props);

    this.rules = { X: /[02-9]/ };
  }

  state = {
    employee: {
      name: "",
      combo: "",
      picture:
        "https://js.devexpress.com/Content/images/doc/20_1/PhoneJS/person2.png",
      notes:
        "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.",
    },
  };

  setNotes = (e) => {
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        notes: e.value,
      },
    }));
  };

  renderNotes = (data) => {
    return (
      <TextArea
        value={this.state.employee.notes}
        onValueChanged={this.setNotes}
      />
    );
  };

  valuechange = (e) => {
    alert("dxForm is invalid");
  };

  validateClick = (e) => {
    alert(this.state.employee.notes);
  };
  render() {
    const employee = {
      ID: 1,
      FirstName: "John",
      LastName: "Heart",
      Position: "CEO",
      BirthDate: "1964/03/16",
      HireDate: "1995/01/15",
      Notes:
        "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
      Address: "351 S Hill St., Los Angeles, CA",
      Phone: "360-684-1334",
      Email: "jheart@dx-email.com",
    };

    const positions = [
      "HR Manager",
      "IT Manager",
      "CEO",
      "Controller",
      "Sales Manager",
      "Support Manager",
      "Shipping Manager",
    ];

    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Card>
          </Col>
        </Row>

        <Form formData={this.state.employee} colCount={2}>
          <Item
            dataField="name"
            editorOptions={{ mask: "+1 (X00) 000-0000", maskRules: this.rules }}
          />
          <EmptyItem />
          <Item
            colSpan={2}
            dataField="combo"
            editorType="dxSelectBox"
            editorOptions={{
              items: positions,
              searchEnabled: true,
              value: "",
            }}
          />
          <Item dataField="notes" />
          <Item dataField="picture" render={renderPicture} />
          <Item
            itemType="button"
            horizontalAlignment="left"
            editorOptions={{
              text: "Validate",
              type: "success",
              onClick: this.validateClick,
            }}
          />
        </Form>
      </Aux>
    );
  }
}

export default SamplePage;
