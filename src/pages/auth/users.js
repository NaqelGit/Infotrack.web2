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
import { loadUser, updateUser, addUser, deleteUser } from '../../store/auth/actions/user-actions';
import { loadCountry } from '../../store/auth/actions/consumer-actions';
import { loadRoleGroup } from '../../store/auth/actions/role-group-actions';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { AssignUnassign } from './components/assign-unassign/assign-unassign';
import './auth.css'
const exportFormats = ['Pdf', 'Excel'];

export default function Users() {
    //redux selectors
    const roleGroups = useSelector((state) => state.roleGroup.data);
    const counties = useSelector((state) => state.consumer.countries);
    const users = useSelector((state) => state.user.data);
    const isLoading = useSelector((state) => state.user.isLoading);
    const errorUserLoad = useSelector((state) => state.user.error);

    //component states
    const [openWithHeader, setOpenWithHeader] = React.useState(false);
    const [currUserGroups, setCurrUserGroups] = useState([]);
    const [currUserGroupsAssigned, setCurrUserGroupsAssigned] = useState([]);
    const [selectedRowUser, setSelectedRowUser] = useState({});
    const dataSourceStatus = [{ 'id': 1, 'name': 'Active' }, { 'id': 0, 'name': 'Inactive' }];

    //redux dispatch object
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('dispatch started');
        dispatch(loadCountry());
        dispatch(loadRoleGroup());
        dispatch(loadUser());

    }, [dispatch]); // Empty dependency array, runs only once

    const dataGridRef = useRef(null);

    //callbacks
    const onRowInserting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateUser(e.changes[0].data))
            console.log('onRowInserting')
            console.log(e)
            let payload = e.data;
            payload.countryID = e.data.country.id;
            //payload.UserDetails = [];
            dispatch(addUser(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, [dispatch]);
    const onRowUpdating = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateUser(e.changes[0].data))
            console.log('onRowUpdating')
            console.log(e)
            let payload = { ...e.oldData, ...e.newData };
            payload.roleGroups = payload.roleGroups.map((item) => {
                return { 'roleGroupID': item.roleGroup.id }
            })
            console.log(payload);
            dispatch(updateUser(payload));
            e.cancel = false;
        }
        catch (e) {

        }

        // e.promise = ;

    }, [dispatch]);
    const onRowDeleting = useCallback((e) => {
        e.cancel = true;
        try {
            // dispatch(updateUser(e.changes[0].data))
            console.log('onRowDeleting')
            console.log(e)
            let payload = e.data;
            dispatch(deleteUser(payload));
            e.cancel = false;
        }
        catch (e) {

        }
    }, [dispatch]);
    const onUserGroupAssignSave = useCallback((e) => {
        let currUserObj = Object.assign({}, selectedRowUser);;
        let detail = e.assignedItems.map((item) => {
            return { 'roleGroupID': item.id }
        })
        currUserObj.roleGroups = detail;
        dispatch(updateUser(currUserObj));
        setOpenWithHeader(false);
    }, [selectedRowUser, dispatch]);

    //page render
    if (errorUserLoad !== '') {
        notify(`Error while loading Users:${errorUserLoad}`)
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
                <h3>Users</h3>
                <Drawer size={'60rem'} open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Body>
                        {/* <Profile selectedRowData={selectedRowData} currentGridRef={dataGridRef} func={setOpenWithHeader} /> */}
                        <AssignUnassign assigned={currUserGroupsAssigned} unAssigned={currUserGroups} onSave={onUserGroupAssignSave} ></AssignUnassign>
                    </Drawer.Body>
                </Drawer>
                <DataGrid
                    ref={dataGridRef}
                    keyExpr="id"
                    className={'wide-card'}
                    style={{ "marginRight": "0.20em" }}
                    dataSource={users}
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
                                <Item dataField="userID" />
                                <Item dataField="adUsername" />
                                <Item dataField="country.id" />
                                <Item dataField="mobileNumber" />
                                <Item dataField="password" />
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
                        dataField={'userID'}
                        // width={'30%'}
                        caption={'UserID'}
                        hidingPriority={8}
                    />
                    <Column
                        dataField={'adUsername'}
                        // width={'30%'}
                        caption={'AD Username'}
                        hidingPriority={8}
                    />
                    <Column
                        dataField={'country.id'}
                        // width={'30%'}
                        caption={'Country'}
                        hidingPriority={6}
                    >
                        <Lookup dataSource={counties} valueExpr="id" displayExpr="name"></Lookup>
                    </Column>
                    <Column
                        dataField={'mobileNumber'}
                        // width={'10%'}
                        caption={'Mobile Number'}
                        hidingPriority={5}
                    >
                    </Column>
                    <Column
                        dataField={'password'}
                        // width={'10%'}
                        caption={'Password'}
                        hidingPriority={5}
                    >
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
                        allowEditing={false}
                        dataField={'createdDate'}
                        // width={'10%'}
                        caption={'Created Date'}
                        hidingPriority={5}
                    >
                    </Column>
                    <Column cellRender={(row) => <input type='button' value="Assign" onClick={() => {
                        let assignedRoleGroups = row.data.roleGroups.map((item) => {
                            return item;
                        })
                        setCurrUserGroupsAssigned(assignedRoleGroups);
                        let unAsignedRoleGroups = roleGroups.filter(function (el) {
                            // return !assignedRoleGroups.includes(el);
                            return !assignedRoleGroups.some(function (ar) {
                                return ar.id === el.id
                            })
                        });
                        setCurrUserGroups(unAsignedRoleGroups);
                        setSelectedRowUser(row.data);
                        console.log(selectedRowUser);
                        setOpenWithHeader(true);
                        console.log(openWithHeader);
                    }} />} >
                    </Column>
                </DataGrid>
            </div>
        )


    }

}
