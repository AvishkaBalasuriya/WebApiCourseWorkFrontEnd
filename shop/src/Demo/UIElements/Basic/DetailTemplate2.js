import React from "react";
import { DataGrid, Editing, Column } from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import service from "./data.js";

const test = service.getTest();

class DetailTemplate2 extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = getTest(props.data.key);
  }
  render() {
    return (
      <React.Fragment>
        <DataGrid
          dataSource={this.dataSource}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <Column dataField="Subject" />
        </DataGrid>
      </React.Fragment>
    );
  }
  completedValue(rowData) {
    return rowData.Status === "Completed";
  }
}

function getTest(key) {
  return new DataSource({
    store: new ArrayStore({
      data: test,
      key: "ID",
    }),
    filter: ["TaskID", "=", key],
  });
}

export default DetailTemplate2;
