import React, { useCallback, useState, useEffect } from 'react'
import List, { ListTypes } from 'devextreme-react/list';
import SelectBox from 'devextreme-react/select-box';
import { TextBox, Button } from 'devextreme-react';
import './assign-unassign.scss'
const name = () => "fajar"

const searchModes = ['contains', 'startsWith', 'equals'];
export const searchModeLabel = { 'aria-label': 'Search Mode' };

function ItemTemplate(data) {
    return <div>{data.name}</div>;
}
export const AssignUnassign = (props) => {

    //states
    const [unAssignedItems, setUnAssignedItems] = useState([]);
    const [assignedItems, setAssignedItems] = useState([]);

    const [selectByClick, setSelectByClick] = useState(false);
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);

    const [selectAssignedByClick, setSelectAssignedByClick] = useState(false);
    const [selectedAssignedItemKeys, setSelectedAssignedItemKeys] = useState([]);

    const [selectionMode, setSelectionMode] = useState('all');
    //<ListTypes.Properties['selectionMode']> 
    const [selectAllMode, setSelectAllMode] = useState('page');

    const [searchMode, setSearchMode] = useState('contains');
    const [searchModeAssigned, setSearchModeAssigned] = useState('contains');

    useEffect(() => {
        setUnAssignedItems(props.unAssigned);
        setAssignedItems(props.assigned);
        console.log(unAssignedItems)
        console.log(assignedItems)
    }, []); // Empty dependency array, runs only once
    //callbacks
    const onSearchModeChange = useCallback(
        (args) => {
            setSearchMode(args.value);
        },
        [setSearchMode],
    );
    const onSearchModeChangeAssigned = useCallback(
        (args) => {
            setSearchModeAssigned(args.value);
        },
        [setSearchModeAssigned],
    );
    const onSelectedItemKeysChange = useCallback(({ name, value }) => {
        if (name === 'selectedItemKeys') {
            if (selectionMode !== 'none' || selectedItemKeys.length !== 0) {
                setSelectedItemKeys(value);
            }
        }
    }, [selectionMode, selectedItemKeys, setSelectedItemKeys]);

    const onSelectedAssignedItemKeysChange = useCallback(({ name, value }) => {
        console.log(name)
        if (name === 'selectedItemKeys') {
            if (selectionMode !== 'none' || selectedAssignedItemKeys.length !== 0) {
                setSelectedAssignedItemKeys(value);
            }
        }
    }, [selectionMode, selectedAssignedItemKeys, setSelectedAssignedItemKeys]);

    const right = useCallback(() => {
        if (selectedItemKeys.length == 0) {
            return
        }
        let filteredProduct = unAssignedItems.filter(function (el) {
            return !selectedItemKeys.includes(el);
        });
        setUnAssignedItems(filteredProduct);

        let filteredProductsAssigned = [...assignedItems, ...selectedItemKeys]
        setAssignedItems(filteredProductsAssigned);
        setSelectedItemKeys([]);
    }, [selectionMode, selectedItemKeys, setSelectedItemKeys])
    const left = useCallback(() => {
        if (selectedAssignedItemKeys.length == 0) {
            return
        }
        let filteredProduct = assignedItems.filter(function (el) {
            return !selectedAssignedItemKeys.includes(el);
        });
        setAssignedItems(filteredProduct);

        let filteredProducts = [...unAssignedItems, ...selectedAssignedItemKeys]
        setUnAssignedItems(filteredProducts);
        setSelectedAssignedItemKeys([]);
    }, [selectionMode, selectedAssignedItemKeys, setSelectedAssignedItemKeys])
    return (
        <>
            <div style={{ padding: "2%", position: "relative" }}>
                <div style={{ border: "1px solid grey", width: '40%', float: 'left' }}>
                    <div className="list-container">
                        <List
                            className={'wide-card'}
                            dataSource={unAssignedItems}
                            height={400}
                            itemRender={ItemTemplate}
                            searchExpr="name"
                            searchEnabled={true}
                            searchMode={searchMode}

                            showSelectionControls={true}
                            selectionMode={selectionMode}
                            selectAllMode={selectAllMode}
                            selectedItemKeys={selectedItemKeys}
                            selectByClick={selectByClick}
                            onOptionChanged={onSelectedItemKeysChange}
                        />
                    </div>
                    <div className="options" style={{ textAlign: 'center' }}>
                        <div className="option">
                            <span>Search mode </span>
                            <SelectBox
                                items={searchModes}
                                inputAttr={searchModeLabel}
                                value={searchMode}
                                onValueChanged={onSearchModeChange}

                            />
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center", width: "20%", float: 'left', marginTop: "10%", padding: "2%" }}>
                    <input type='button' value="Right" onClick={right} style={{ width: '100%', marginTop: '1%' }} />
                    <br />
                    <input type='button' value="Left" onClick={left} style={{ width: '100%', marginTop: '5%' }} />

                </div>
                <div style={{ border: "1px solid grey", width: '40%', float: 'left' }}>
                    <div className="list-container">
                        <List
                            className={'wide-card'}
                            dataSource={assignedItems}
                            height={400}
                            itemRender={ItemTemplate}
                            searchExpr="name"
                            searchEnabled={true}
                            searchMode={searchMode}
                            showSelectionControls={true}
                            selectionMode={selectionMode}
                            selectAllMode={selectAllMode}
                            selectedItemKeys={selectedAssignedItemKeys}
                            selectByClick={selectAssignedByClick}
                            onOptionChanged={onSelectedAssignedItemKeysChange}
                        />

                    </div>
                    <div className="options" style={{ textAlign: 'center' }}>
                        <div className="option">
                            <span>Search mode </span>
                            <SelectBox
                                items={searchModes}
                                inputAttr={searchModeLabel}
                                value={searchModeAssigned}
                                onValueChanged={onSearchModeChangeAssigned}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div style={{ textAlign: "center", clear: "both", marginTop: "5%" }}>
                    <Button width={100} onClick={
                        () => {
                            let e = { 'unAssignedItems': unAssignedItems, 'assignedItems': assignedItems }
                            props.onSave(e)
                        }} >
                        Save
                    </Button></div>
            </div>


        </>


    )
}
