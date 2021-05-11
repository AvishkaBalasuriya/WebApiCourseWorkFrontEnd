import React from "react";
import Aux from "../../../hoc/_Aux";
import Form, { SimpleItem, Item, EmptyItem } from "devextreme-react/form";
import { Button } from "devextreme-react/button";
import Data from "../../../Data/DataOnlineApp";
import DataGrid, {
  Column,
  FormItem,
  Editing,
  Paging,
  Lookup,
} from "devextreme-react/data-grid";

const renderTitleHeader = (data) => {
  return <p style={{ height: "20px" }}>{data.column.caption}</p>;
};

class BasicButton extends React.Component {
  constructor(props) {
    super(props);
    this.FieldNames = Data.GetOnlineAppFieldNames();
    this.Fields = Data.GetOnlineAppFields();
    this.GridData = Data.GetOnlineAppGridData();

    this.FormDataFields = {
      positions: [
        "HR Manager",
        "IT Manager",
        "CEO",
        "Controller",
        "Sales Manager",
        "Support Manager",
        "Shipping Manager",
      ],
    };
  }

  validateClick = (e) => {
    alert(this.FormDataFields.Fields.LastName);
  };

  renderNotes = (data) => {
    return console.log(data);
  };

  customizeItem = (item) => {
    if (item.itemType == "simple") {
      /*item.label = {
        location: "top",
      };*/

      if (item.dataField === "LastName") {
        item.editorType = "dxSelectBox";
        item.editorOptions = {
          items: this.FormDataFields.positions,
          searchEnabled: true,
          value: "",
        };
      }
    }
  };

  onRowPrepared(e) {
    e.rowElement.style.height = "50px";
  }

  render() {
    return (
      <Aux>
        <Form
          formData={this.FormDataFields.Fields}
          customizeItem={this.customizeItem}
        >
          <Item
            itemType="group"
            colCount={2}
            caption="Personal Information"
            items={this.FieldNames.Personal}
          />

          <Item
            itemType="group"
            colCount={2}
            caption="Contact Details"
            items={this.FieldNames.Contact}
          />
        </Form>

        <DataGrid
          dataSource={this.GridData}
          keyExpr="ID"
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
        >
          <Paging enabled={true} />
          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />

          <Column dataField="Prefix" caption="Title" width={70} />
          <Column dataField="FirstName" />
          <Column dataField="LastName" />
          <Column dataField="Position" width={170} />
          <Column dataField="StateID" caption="State" width={125}></Column>
          <Column dataField="BirthDate" dataType="date" />
          <Column dataField="Notes" visible={false}>
            <FormItem
              colSpan={2}
              editorType="dxTextArea"
              editorOptions={{ height: 100 }}
            />
          </Column>
        </DataGrid>
        <br></br>
        <Button
          width={120}
          text="Contained"
          type="success"
          stylingMode="contained"
          onClick={this.validateClick}
        />
      </Aux>
    );
  }
}

export default BasicButton;
