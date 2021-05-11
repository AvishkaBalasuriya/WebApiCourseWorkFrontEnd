import React, { Component } from "react";
import Aux from "../hoc/_Aux";
import Form, { SimpleItem, GroupItem, Label } from "devextreme-react/form";
import "devextreme-react/text-area";
import Card from "../App/components/MainCard";
import { Button, Navbar, Dropdown, DropdownButton } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Aux>
        <Card title="Profile">
          <Form formData={this.state.user}>
            <GroupItem cssClass="first-group" colCount={4}>
              <SimpleItem render={avatarRender}></SimpleItem>
              <GroupItem colSpan={3}>
                <SimpleItem dataField="FirstName" />
                <SimpleItem dataField="LastName" />
                <SimpleItem
                  dataField="BirthDate"
                  editorType="dxDateBox"
                  editorOptions={this.birthDateOptions}
                />
              </GroupItem>
            </GroupItem>
            <GroupItem cssClass="second-group" colCount={2}>
              <GroupItem>
                <SimpleItem dataField="Address" />
                <SimpleItem dataField="City" />
                <SimpleItem
                  dataField="Position"
                  editorType="dxSelectBox"
                  editorOptions={this.positionOptions}
                />
              </GroupItem>
              <GroupItem>
                <SimpleItem
                  dataField="State"
                  editorType="dxSelectBox"
                  editorOptions={this.stateOptions}
                />
                <SimpleItem dataField="ZipCode" />
                <SimpleItem
                  dataField="Mobile"
                  editorOptions={this.phoneOptions}
                >
                  <Label text="Phone" />
                </SimpleItem>
              </GroupItem>
              <SimpleItem
                colSpan={2}
                dataField="Notes"
                editorType="dxTextArea"
                editorOptions={this.notesOptions}
              />
            </GroupItem>
          </Form>

          <Navbar bg="" variant="light">
            <Button variant="success" icon="feather icon-layers">
              Save
            </Button>
            <Button variant="warning" icon="feather icon-layers">
              Clear
            </Button>
          </Navbar>
        </Card>
      </Aux>
    );
  }
}
function avatarRender() {
  return <div className="form-avatar"></div>;
}
export default Profile;
