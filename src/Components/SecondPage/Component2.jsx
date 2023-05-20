import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Checkbox,
    FormControlLabel,
    Box,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


// data of departments and respective sub departments
const data = [
    {
        department: 'customer_service',
        sub_departments: ['support', 'customer_success'],
    },
    {
        department: 'design',
        sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
];

const Component2 = () => {
    // state to track which items are checked
    const [selectedItems, setSelectedItems] = useState([]);
    // state to track which departments are expanded
    const [expandedItems, setExpandedItems] = useState([]);


    // a function that handles the checking of departments and subdepartments
    const handleItemClick = (department, item, subDepartments) => {
        const isItemSelected = selectedItems.includes(item);
        let updatedSelectedItems;

        // if checked item is a department then this will run
        if (subDepartments.length !== 0) {
            if (isItemSelected) {
                // if a department is already selected and now it is clicked again then 
                // it means to uncheck so all subdepartments along with department will be unchecked.
                updatedSelectedItems = [];
            }
            else {
                // if department is unchecked and is clicked then all its subdepartments and department will be checked.
                updatedSelectedItems = [...subDepartments, item];
            }
        }
        // if a subdepartment is checked then this will run. 
        else {
            // if already checked then uncheck it
            if (isItemSelected) {
                updatedSelectedItems = selectedItems.filter((selectedItem) => {
                    return (selectedItem !== item && selectedItem !== department)
                });
            } else {
                // if not checked then check the subdepartment and check if all subdepartments are check and hence check department too.
                updatedSelectedItems = [...selectedItems, item];
                const req_dept = data.filter(x => x.department === department)[0]
                if (req_dept.sub_departments.length == updatedSelectedItems.length) {
                    updatedSelectedItems.push(department);
                }
            }
        }
        setSelectedItems(updatedSelectedItems);
    };

    // a function that handles the dropdown menu
    const handleDepartmentToggle = (department) => {
        const isExpanded = expandedItems.includes(department);
        let updatedExpandedItems;

        if (isExpanded) {
            updatedExpandedItems = expandedItems.filter((item) => item !== department);
        } else {
            updatedExpandedItems = [...expandedItems, department];
        }

        setExpandedItems(updatedExpandedItems);
    };

    // a function that return if a item is selected or not to display in UI
    const isItemSelected = (item) => {
        return selectedItems.includes(item);
    };
    // a function that return if a department is selected or not to display in UI
    const isDepartmentSelected = (department, subDepartments) => {
        const selectedSubDepartments = selectedItems.filter((item) =>
            subDepartments.includes(item)
        );

        return (
            isItemSelected(department) && selectedSubDepartments.length === subDepartments.length
        );
    };

    // a function that returns if a department is expanded or not
    const isDepartmentExpanded = (department) => {
        return expandedItems.includes(department);
    };

    return (
        <Box>
            {data.map((department) => {
                const subDepartments = department.sub_departments;

                return (
                    <Box key={department.department}>
                        <ListItem dense>
                            <IconButton
                                size="small"
                                onClick={() => handleDepartmentToggle(department.department)}
                            >
                                {isDepartmentExpanded(department.department) ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isDepartmentSelected(department.department, subDepartments)}
                                        onChange={() => handleItemClick(department.department, department.department, subDepartments)}
                                    />
                                }
                                label={department.department}
                            />
                        </ListItem>

                        <Collapse in={isDepartmentExpanded(department.department)}>
                            <List disablePadding>
                                {subDepartments.map((subDept) => {
                                    const isSubDepartmentSelected = isItemSelected(subDept);

                                    return (
                                        <ListItem
                                            key={subDept}
                                            dense
                                            button
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={isSubDepartmentSelected}
                                                onChange={() => handleItemClick(department.department, subDept, [])}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                            <ListItemText primary={subDept} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Component2;
