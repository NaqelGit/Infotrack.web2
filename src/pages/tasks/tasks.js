import React,{useCallback, useRef ,useMemo,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, ButtonToolbar, Placeholder } from 'rsuite';
import Box, { Item as BoxItem} from 'devextreme-react/box';
import  {TextBox,Button } from 'devextreme-react';
import 'devextreme/data/odata/store';
import notify from 'devextreme/ui/notify';
import DropDownButton from 'devextreme-react/drop-down-button';
import DateBox from 'devextreme-react/date-box';

import './tasks.css';
  
import DataGrid, {
  Column,
  Pager,
  Paging,
  Export,
  Selection,
  FilterRow,
  Lookup,
  Toolbar,
  Item,
  ColumnChooser,
  SearchPanel,
  Button as CommandButton
} from 'devextreme-react/data-grid';
 
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportPDF } from 'devextreme/pdf_exporter';
import {createStore} from 'devextreme-aspnet-data-nojquery';
import Profile from '../profile/profile';


const exportFormats = ['Pdf','Excel'];

const onExporting = (e) => {

  if(e.format === 'Excel')
  {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
          component: e.component,
          worksheet,
          autoFilterEnabled: true,
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
          });
        });
  }
  else if(e.format === 'Pdf'){
        const doc = new jsPDF();
        exportPDF({
          jsPDFDocument: doc,
          component: e.component,
          indent: 5,
        }).then(() => {
          doc.save('Companies.pdf');
        });
  }
};

const dateLabel = { 'aria-label': 'Date' };

const buttonDropDownOptions = { width: 230 };
const profileSettings = [
  { id: 1, name: 'Profile', icon: 'user' },
  {
    id: 4,
    name: 'Messages',
    icon: 'email',
    badge: '5',
  },
  { id: 2, name: 'Friends', icon: 'group' },
  { id: 3, name: 'Exit', icon: 'runner' },
];


//const url='https://localhost:44397';

const dataSource=createStore({
  //key:'Id',
  loadUrl: 'https://localhost:44397/Region/Regions',
  onBeforeSend:(method,ajaxOptions)=>{
    ajaxOptions.xhrFields={withCredentials: false};
  },
});

export default function Task(props) {
  const navigate = useNavigate();
  const [openWithHeader, setOpenWithHeader] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = useState('');
  const [focusedRowKey, setFocusedRowKey] = useState(-1);

  const now = new Date();
  const dataGridRef = useRef(null);


  const refreshDataGrid = useCallback(() => {
    dataGridRef.current.instance.refresh();
  }, []);

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);  
  

  const onSelectionChanged = useCallback(({ selectedRowsData }) => {
    const data = selectedRowsData[0];
    setSelectedRowData(data)
  }, []);
  const onFocusedRowChanged = useCallback((e) => {
    const data = e.row.data;
    setSelectedRowData(data);
    setFocusedRowKey(e.component.option('focusedRowKey'));
  }, []);
 

const addButtonOptions = {
  icon:"plus",
  text:"Add",
  stylingMode:"solid",
  type:"default",
  onClick: (e) => {
    OpenDetailScreen(e);
    notify('Add button has been clicked!');
  },
};

const deleteButtonOptions = {
  icon: 'trash',
  text: ' ',
  stylingMode:"solid",
  type:"danger",
  onClick: () => {
    notify('Delete button has been clicked!');
  },
};


  const onButtonClick = useCallback((e) => {
    notify(`Go to ${e.component.option('text')}'s profile`, 'success', 600);
  }, []);


  const onItemClick = useCallback((e) => {
    OpenDetailScreen(e);
  }, []);
  

const OpenDetailScreen = useCallback((e) => {


    setOpenWithHeader(true)
},[]);

 
 

  return (
    
    <React.Fragment>
        
      <Drawer size={'80rem'} open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
       
        <Drawer.Body>
          <Profile selectedRowData={selectedRowData} currentGridRef={dataGridRef} func={setOpenWithHeader}/>
        </Drawer.Body>
      </Drawer>
   
      <DataGrid
        ref={dataGridRef}
        keyExpr="Id"
        className={'wide-card'}
        style={{ "margin-right":"0.20em"}}
        dataSource={dataSource}
        remoteOperations={true}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onExporting={onExporting}
        onSelectionChanged={onSelectionChanged}
        onFocusedRowChanged={onFocusedRowChanged}
      >
        <ColumnChooser enabled={false}/>
        <Selection mode="multiple" />
        <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />
        <SearchPanel
        visible={true}
        highlightCaseSensitive={true}
      />
        <Toolbar>
        <Item locateInMenu='auto' location="before">
      
        
          <h2 style={{marginLeft:20+'px',}} >
            <i class="dx-icon-email" style={{fontSize: 28+'px'}}></i>
            Delivery Sheet 
            <Button 
            type="primary"
            stylingMode="text"
            style={{marginLeft:10+'px'}} icon="refresh"

                            onClick={refreshDataGrid}
            />
          </h2>
        
         
        </Item>
        <Item locateInMenu='auto' location="before">
            <Box  direction='row' height={40}>
                  <BoxItem   ratio={1}>
                    
                  <Button icon='plus'
                            
                            width={100}
                            type="default"
                            stylingMode="contained"
                            text='Add' onClick={OpenDetailScreen}></Button>
                        
                          
                          
                        
                      
                  </BoxItem>
                  <BoxItem  ratio={2}>
                  <div className="dx-field-value">
                  <Button 
                                width={100}
                                icon='trash'
                                type="danger"
                                stylingMode="contained"
                                text='Delete'
                                onClick={deleteButtonOptions}
                                />
                              </div>
                  </BoxItem>
                
            </Box>

            <Box  direction="row" height={55}>
                <BoxItem  ratio={'2'}>  
                  
                          
                            <DateBox
                            label="From Date :"
                            labelMode={'static'}
                            width={150}
                              defaultValue={now}
                              inputAttr={dateLabel}
                              type="date"
                            />
                          
                </BoxItem>
                <BoxItem  ratio={'2'}>  
                          
                            <DateBox
                              label="To Date :"
                              width={150}
                              labelMode={'static'}
                              defaultValue={now}
                              inputAttr={dateLabel}
                              type="date"
                            />
                        
                </BoxItem>
              
              
            </Box>
        </Item>
        <Item locateInMenu='auto' location='before'>

          <Box  direction="row" height={40}>
                <BoxItem   ratio={1}>
                      <DropDownButton
                      splitButton={false}
                      useSelectMode={false}
                      type='success'
                      text="Dispatch Actions"
                      icon="preferences"
                      items={profileSettings}
                      displayExpr="name"
                      keyExpr="id"
                      onButtonClick={onButtonClick}
                      onItemClick={onItemClick}
                    />
                </BoxItem>
          </Box>
          <Box  direction="row" height={55}>
              <BoxItem  ratio={'1'}>         
                            
                                  <TextBox
                                    width={150}
                                    placeholder=" Search Waybill No"
                                    label="WayBill No"
                                    labelMode='float'
                                    defaultValue=""
                                    inputAttr={""}
                                    showClearButton={true}
                                  />
                                
                  </BoxItem>
              <BoxItem  ratio={'1'}>                
                  <div className="dx-field-value" style={{marginTop:6+'px'}}>            
                              <Button icon='search'
                              width={150}
                              stylingMode='outlined'
                              type="standard" 
                              text='Search' 
                              onClick={OpenDetailScreen}>

                              </Button>
                  </div>         
                  
                </BoxItem>
          </Box>
        </Item>
        
 
        <Item name="searchPanel"
        locateInMenu='auto'
        location='after'/>
        <Item name="exportButton"
        locateInMenu='auto'
        location='after'
         />
      </Toolbar>
         
         
       
        

        <Paging defaultPageSize={8} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={false} />

        <Column dataField={'Id'} width={90} hidingPriority={2} />
        <Column
          dataField={'Name_en'}
          width={190}
          caption={'Name English'}
          hidingPriority={8}
        />
        <Column 
          dataField={'Name_ar'}
          caption={'Name Arabic'}
          hidingPriority={6}
        />
        <Column
          dataField={'Code'}
          caption={'Code'}
          hidingPriority={5}
        >
        </Column>
       
         <Column type="buttons">
                    <CommandButton
                        text="My Command"
                        icon="edit"
                        hint="My Command"
                        onClick={OpenDetailScreen}
                    />
                </Column>
                 <Column type="buttons">
                    <CommandButton
                        text="My Command"
                        icon="trash"
                        hint="My Command"
                        onClick={OpenDetailScreen}
                    />
                </Column>
      </DataGrid>
      
      
    
    </React.Fragment>
)}
 
 
const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
