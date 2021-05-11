import React, { Component } from "react";
import Aux from "../../../hoc/_Aux";
import DataGrid, {
  Column,
  MasterDetail,
  Editing,
} from "devextreme-react/data-grid";
import * as overlay from "devextreme/ui/overlay";

import DetailTemplate from "./DetailTemplate.js";
import service from "./data.js";

const employees = service.getEmployees();

class Badges extends Component {
  render() {
    return (
      <Aux>
        <DataGrid
          id="grid-container"
          dataSource={employees}
          keyExpr="ID"
          showBorders={true}
        >
          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            useIcons={true}
          />
          <Column dataField="Prefix" width={70} caption="Title" />
          <Column dataField="FirstName" />
          <Column dataField="LastName" />
          <Column dataField="Position" width={170} />
          <Column dataField="State" width={125} />
          <Column dataField="BirthDate" dataType="date" />
          <MasterDetail enabled={true} component={DetailTemplate} />
        </DataGrid>
      </Aux>
    );
  }
}

export default Badges;
