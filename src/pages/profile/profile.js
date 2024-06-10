import React, { useCallback, useState } from 'react';
import { createStore } from 'devextreme-aspnet-data-nojquery';
//mport Form from 'devextreme-react/form';
import Form, { Item, SimpleItem, GroupItem, Label,ButtonItem } from 'devextreme-react/form';
import { CheckBox, CheckBoxTypes } from 'devextreme-react/check-box';
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';
import notify from 'devextreme/ui/notify'
import ScrollView from 'devextreme-react/scroll-view';
import CustomStore from 'devextreme/data/custom_store';

import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Summary,
  TotalItem
} from 'devextreme-react/data-grid';
import { DropDownBox } from 'devextreme-react/drop-down-box';
import DataSource from 'devextreme/data/data_source';

const url = 'https://localhost:44397/Region';
  const countrysData = createStore({
    key: 'Value',
    loadUrl: 'https://localhost:44397/Country/CountryLookup',
    onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.xhrFields = { withCredentials: false };
    },
  });



function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    
    return  response;
}

const customDataSource = new CustomStore({
  key: 'Id',
  loadMode: "raw",
  insert:async (values) => {
      try {
      const response = await fetch("https://localhost:44397/Region/InsertRegion", {
        
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      return handleErrors(response);
    } catch {
      throw 'Network error';
    }
  },
  
});


export default function Profile({ selectedRowData, func, currentGridRef }) {

  const submit = () => {

  }

  const chkReplacementTruck = { 'aria-label': 'Checked' };
  // const internaldelivery = { 'aria-label': 'Checked' }; 
  //const gridColumns = ['CompanyName', 'City', 'Phone'];

  const onButtonClick = useCallback((e) => {
    console.log(selectedRowData["Task_Subject"]);
    customDataSource.insert(regiondata);
    
    notify("Data inserted successfully",'success', 600);
    func(false);
  }, []);


  
  const submitButtonOptions = {
    text: "Submit the Form",
    useSubmitBehavior: true
};


  const regiondata = {
    Name_en: '',
    Name_ar: '',
    Code: '',
    CountryID: ''
  };
 
  return (
    <React.Fragment>
      <Drawer.Header>
        <Drawer.Title>Add Region</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => func(false)} appearance="default">Cancel</Button>
          <Button buttonOptions={submitButtonOptions} onClick={(e) => onButtonClick(e)} appearance="primary">
            Submit
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <div className={'content-block dx-card responsive-paddings'}>
      <form action="/InsertRegion">
        <Form
          id={'form'}
          searchEnabled={true}
          formData={regiondata}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}>
          <Item dataField='Name_en'></Item>
          <Item dataField='Name_ar'></Item>
          <Item dataField='Code'></Item>
          <Item
            dataField="CountryID"
            editorType="dxLookup"
            editorOptions={{
              dataSource: countrysData,
              valueExpr: "Value",
              displayExpr: "Text",

            }}
          />
          
        </Form>
</form>

        {/* <span>{notes}</span> */}


      </div>

      <ScrollView height={'48%'} width={'98%'} className={'with-footer  bg-blueclr'}>
        <div className={'content-block '}>


        </div>
      </ScrollView>


    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};

const dataSource = {
  store: {
    version: 2,
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];

