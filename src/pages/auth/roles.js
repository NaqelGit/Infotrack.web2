import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'devextreme/data/odata/store';
import notify from 'devextreme/ui/notify';
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
    Button as CommandButton,
    Editing, Popup, Form, IButtonProps
} from 'devextreme-react/data-grid';

import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportPDF } from 'devextreme/pdf_exporter';

import { useSelector, useDispatch } from 'react-redux'
import { loadRole, updateRole, addRole, deleteRole } from '../../store/auth/actions/role-actions';
import { loadApplicationType } from '../../store/auth/actions/consumer-actions';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import './auth.css'
const exportFormats = ['Pdf', 'Excel'];

// const onExporting = (e) => {

//     if (e.format === 'Excel') {
//         const workbook = new Workbook();
//         const worksheet = workbook.addWorksheet('Main sheet');
//         exportDataGrid({
//             component: e.component,
//             worksheet,
//             autoFilterEnabled: true,
//         }).then(() => {
//             workbook.xlsx.writeBuffer().then((buffer) => {
//                 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//             });
//         });
//     }
//     else if (e.format === 'Pdf') {
//         const doc = new jsPDF();
//         exportPDF({
//             jsPDFDocument: doc,
//             component: e.component,
//             indent: 5,
//         }).then(() => {
//             doc.save('Companies.pdf');
//         });
//     }
// };


export default function Roles() {
    const roles = useSelector((state) => state.role.data);
    const isLoading = useSelector((state) => state.role.isLoading);
    const isLoadingApplicationType = useSelector((state) => state.consumer.isLoadingApplicationType);
    const applicationTypes = useSelector((state) => state.consumer.applicationTypes);

    const errorRoleLoad = useSelector((state) => state.role.error);
    const errorApplicationType = useSelector((state) => state.role.errorApplicationType);
    const dataSourceStatus = [{ 'id': 1, 'name': 'Active' }, { 'id': 0, 'name': 'Inactive' }];
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('dispatch started');
        dispatch(loadApplicationType());
        dispatch(loadRole());

    }, []); // Empty dependency array, runs only once
    const dataGridRef = useRef(null);

    const onSaving = useCallback((e) => {
        //  e.cancel = true;
        console.log('saving')
        console.log(e)
        try {

            // dispatch(updateRole(e.changes[0].data))
            // e.cancel = true;
        }
        catch (e) {

        }

        // e.promise = ;

    }, []);

    const onRowInserting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRole(e.changes[0].data))
            console.log('onRowInserting')
            console.log(e)
            let payload = e.data;
            payload.roleDetails = [];
            payload.applicationTypeID = e.data.applicationType.id;
            dispatch(addRole(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, []);
    const onRowUpdating = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRole(e.changes[0].data))
            console.log('onRowUpdating')
            console.log(e)
            let payload = { ...e.oldData, ...e.newData };
            console.log(payload);
            dispatch(updateRole(payload));
            e.cancel = false;
        }
        catch (e) {

        }

        // e.promise = ;

    }, []);
    const onRowDeleting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRole(e.changes[0].data))
            console.log('onRowDeleting')
            console.log(e)
            let payload = e.data;
            dispatch(deleteRole(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, []);

    if (errorRoleLoad !== '') {
        notify(`Error while loading roles:${errorRoleLoad}`)
    }

    if (errorApplicationType != '') {
        notify(`Error while loading application types:${errorApplicationType}`)
    }
    if (isLoading) {
        return <div style={{ textAlign: "center", marginTop: "10%" }}>
            <LoadIndicator
                id="medium-indicator"
                height={100}
                width={100}
                align="center"
            />
        </div>

    }
    else {
        return (
            <>
                <div id="main">
                    <h3>Roles</h3>
                    {/* <Drawer size={'45rem'} open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Body>
                        <Profile selectedRowData={selectedRowData} currentGridRef={dataGridRef} func={setOpenWithHeader} />
                    </Drawer.Body>
                </Drawer> */}
                    <DataGrid
                        ref={dataGridRef}
                        keyExpr="id"
                        className={'wide-card'}
                        style={{ "marginRight": "0.20em" }}
                        dataSource={roles}
                        // remoteOperations={true}
                        showBorders={true}
                        focusedRowEnabled={true}
                        // defaultFocusedRowIndex={0}
                        // columnAutoWidth={true}
                        // columnHidingEnabled={true}
                        // onExporting={onExporting}
                        // onSelectionChanged={onSelectionChanged}
                        // onFocusedRowChanged={onFocusedRowChanged}
                        //onSaving={onSaving}
                        onRowUpdating={onRowUpdating}
                        onRowRemoving={onRowDeleting}
                        onRowInserting={onRowInserting}

                    >
                        <ColumnChooser enabled={false} />
                        <Selection mode="multiple" />
                        <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />
                        <SearchPanel
                            visible={true}
                            highlightCaseSensitive={true}
                        />
                        <Paging defaultPageSize={8} />
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowAdding={true}
                            allowDeleting={true}
                        // newRowPosition={newRowPosition}
                        // changes={changes}
                        // onChangesChange={setChanges}
                        // editRowKey={editRowKey}
                        // onEditRowKeyChange={setEditRowKey}
                        >
                            <Popup
                                title="Employee Info"
                                showTitle={true}
                                width={700}
                                height={525}
                            />
                            <Form>
                                <Item
                                    itemType="group"
                                    colCount={2}
                                    colSpan={2}
                                    allowAdding={false}
                                >
                                    <Item dataField="id" />
                                    <Item dataField="name" />
                                    <Item dataField="applicationType.id" />
                                    <Item dataField="status" />
                                    <Item dataField="createdDate" />
                                </Item>
                            </Form>
                        </Editing>
                        <Pager showPageSizeSelector={true} showInfo={true} />
                        <FilterRow visible={false} />
                        <Column dataField={'id'}
                            allowEditing={false}
                            width={'10%'}
                            hidingPriority={2} />
                        <Column
                            dataField={'name'}
                            // width={'30%'}
                            caption={'Name'}
                            hidingPriority={8}
                        />
                        <Column
                            dataField={'applicationType.id'}
                            // width={'30%'}
                            caption={'Application Type'}
                            hidingPriority={6}
                        >
                            <Lookup dataSource={applicationTypes} valueExpr="id" displayExpr="name"></Lookup>
                        </Column>
                        <Column
                            dataField={'status'}
                            // width={'10%'}
                            caption={'Status'}
                            hidingPriority={5}
                        >
                            <Lookup dataSource={dataSourceStatus} valueExpr="id" displayExpr="name"></Lookup>
                        </Column>
                        <Column
                            dataField={'createdDate'}
                            // width={'10%'}
                            caption={'Created Date'}
                            hidingPriority={5}
                        >
                        </Column>

                        <Column type="buttons">
                            {/* <Button
                            icon="add"
                            
                            visible={isAddButtonVisible}
                        /> */}
                            {/* <Button name="delete" />
          <Button name="save" />
          <Button name="cancel" /> */}
                        </Column>

                        {/* <Column type="buttons">
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
        </Column> */}
                    </DataGrid>
                </div>
                <div></div>
            </>

        )


    }

}
