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
import { Drawer } from 'rsuite';
import { Button } from 'devextreme-react';

import { useSelector, useDispatch } from 'react-redux'
import { loadRoleGroup, updateRoleGroup, addRoleGroup, deleteRoleGroup } from '../../store/auth/actions/role-group-actions';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { AssignUnassign } from './components/assign-unassign/assign-unassign';
import { loadRole } from '../../store/auth/actions/role-actions';
import './auth.css'
const exportFormats = ['Pdf', 'Excel'];

export default function RoleGroups() {
    //redux selectors
    const roles = useSelector((state) => state.role.data);
    const roleGroups = useSelector((state) => state.roleGroup.data);
    const isLoading = useSelector((state) => state.roleGroup.isLoading);
    const errorRoleGroupLoad = useSelector((state) => state.roleGroup.error);

    //component states
    const [openWithHeader, setOpenWithHeader] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [productsAssigned, setProductsAssigned] = useState([]);
    const [selectedRowRoleGroup, setSelectedRowRoleGroup] = useState({});
    const dataSourceStatus = [{ 'id': 1, 'name': 'Active' }, { 'id': 0, 'name': 'Inactive' }];

    //redux dispatch object
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('dispatch started');
        dispatch(loadRole());
        dispatch(loadRoleGroup());

    }, [dispatch]); // Empty dependency array, runs only once

    const dataGridRef = useRef(null);

    //callbacks
    const onRowInserting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRoleGroup(e.changes[0].data))
            console.log('onRowInserting')
            console.log(e)
            let payload = e.data;
            payload.RoleGroupDetails = [];
            dispatch(addRoleGroup(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, [dispatch]);
    const onRowUpdating = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRoleGroup(e.changes[0].data))
            console.log('onRowUpdating')
            console.log(e)
            let payload = { ...e.oldData, ...e.newData };
            payload.roleGroupDetails = payload.roleGroupDetails.map((item) => {
                return { 'roleID': item.role.id, 'status': 1 }
            })
            console.log(payload);
            dispatch(updateRoleGroup(payload));
            e.cancel = false;
        }
        catch (e) {

        }

        // e.promise = ;

    }, [dispatch]);
    const onRowDeleting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateRoleGroup(e.changes[0].data))
            console.log('onRowDeleting')
            console.log(e)
            let payload = e.data;
            dispatch(deleteRoleGroup(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, [dispatch]);
    const onRoleAssignSave = useCallback((e) => {
        let currRoleGroupObj = Object.assign({}, selectedRowRoleGroup);;
        let detail = e.assignedItems.map((item) => {
            return { 'roleID': item.id, 'status': 1 }
        })
        currRoleGroupObj.roleGroupDetails = detail;
        dispatch(updateRoleGroup(currRoleGroupObj));
        setOpenWithHeader(false);
    }, [selectedRowRoleGroup, dispatch]);

    //page render
    if (errorRoleGroupLoad !== '') {
        notify(`Error while loading RoleGroups:${errorRoleGroupLoad}`)
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
            <div id="main">
                <h3>Role Groups</h3>
                <Drawer size={'60rem'} open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Body>
                        {/* <Profile selectedRowData={selectedRowData} currentGridRef={dataGridRef} func={setOpenWithHeader} /> */}
                        <AssignUnassign assigned={productsAssigned} unAssigned={products} onSave={onRoleAssignSave} ></AssignUnassign>
                    </Drawer.Body>
                </Drawer>
                <DataGrid
                    ref={dataGridRef}
                    keyExpr="id"
                    className={'wide-card'}
                    style={{ "marginRight": "0.20em" }}
                    dataSource={roleGroups}
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
                        dataField={'status'}
                        // width={'10%'}
                        caption={'Status'}
                        hidingPriority={5}
                    >
                        <Lookup dataSource={dataSourceStatus} valueExpr="id" displayExpr="name"></Lookup>
                    </Column>
                    <Column
                        allowEditing={false}
                        dataField={'createdDate'}
                        // width={'10%'}
                        caption={'Created Date'}
                        hidingPriority={5}
                    >
                    </Column>
                    <Column cellRender={(row) => <input type='button' value="Assign" onClick={() => {
                        let assignedRoles = row.data.roleGroupDetails.map((item) => {
                            return item.role;
                        })
                        setProductsAssigned(assignedRoles);
                        let unAsignedRoles = roles.filter(function (el) {
                            // return !assignedRoles.includes(el);
                            return !assignedRoles.some(function (ar) {
                                return ar.id === el.id
                            })
                        });
                        setProducts(unAsignedRoles);
                        setSelectedRowRoleGroup(row.data);
                        console.log(selectedRowRoleGroup);
                        setOpenWithHeader(true);
                        console.log(openWithHeader);
                    }} />} >
                    </Column>
                </DataGrid>
            </div>
        )


    }

}
