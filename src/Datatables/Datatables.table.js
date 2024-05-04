
import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {lighten, makeStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import {Card, CardContent, Divider} from "@material-ui/core";
import PageBox from "../components/PageBox/PageBox.component";

const createData = (name, calories, fat, carbs, protein) => {
    return {name, calories, fat, carbs, protein};
};

const rows = [
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0),
];

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const getSorting = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
};

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)",
    },
    {id: "calories", numeric: true, disablePadding: false, label: "Calories"},
    {id: "fat", numeric: true, disablePadding: false, label: "Fat (g)"},
    {id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)"},
    {id: "protein", numeric: true, disablePadding: false, label: "Protein (g)"},
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        columns,
        allRowSelected,
        showSelection,
        hidePagination,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell, index) => {
                    if (index == 0 && showSelection) {
                        return (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={allRowSelected}
                                    onChange={onSelectAllClick}
                                    inputProps={{"aria-label": "select all desserts"}}
                                />
                                {headCell.sortable ? (
                                    <TableSortLabel
                                        active={orderBy === headCell.key}
                                        direction={order}
                                        onClick={createSortHandler(headCell.key)}
                                    >
                                        {headCell.label}
                                        {orderBy === headCell.key ? (
                                            <span className={classes.visuallyHidden}>
                        {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                      </span>
                                        ) : null}
                                    </TableSortLabel>
                                ) : (
                                    headCell.label
                                )}
                            </TableCell>
                        );
                    }
                    return (
                        <TableCell
                            key={headCell.key}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === headCell.key ? order : false}
                        >
                            {headCell.sortable ? (
                                <TableSortLabel
                                    active={orderBy === headCell.key}
                                    direction={order}
                                    onClick={createSortHandler(headCell.key)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.key ? (
                                        <span className={classes.visuallyHidden}>
                      {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                    </span>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                headCell.label
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: "1 1 100%",
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            //[classes.highlight]: numSelected > 0,
            className={classNames(classes.root)}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({
    root: {
        width: "100%",
        overflowX: "auto",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        fontSize: "10px",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    mobileCard: {
        marginTop: theme.spacing(2),
    },
    mobileCardContent: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)
    },
    pageBox: {
        marginTop: '10px'
    }
});

const EnhancedTable = (props) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const {classes} = {...props};

    const {columns, data, page, rowsPerPageOptions, rowsPerPage, count, allRowSelected,hidePagination, showSelection, mobileRender} = props;
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
        props.onSortOrderChange(orderBy, order);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        props.onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        props.onRowSizeChange(event.target.value);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const renderTableCells = (row, indexPr) => {
        return props.columns.map((val, index) => (
            <TableCell
                style={"style" in val ? val.style : {}}
                key={val.key}
                align={val.numeric ? "right" : "left"}
            >
                {val.render(row[val.key], row, indexPr)}
            </TableCell>
        ));
    };

    const renderCardContent = () => {
        const {data, classes} = props;

        if (data.length > 0) {
            return (
                <>
                    {renderTableBodyMobile()}
                </>
            )
        } else {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6">No Results Found</Typography>
                        <Typography variant="subtitle1">
                            No matching entries available in our record
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    };

    const OccasionRender = (data) => {
        if (data === "OCCASION_LEAVE") {
            return "OCCASION LEAVE";
        }
        if (data === "BEREAVEMENT_LEAVE") {
            return "BEREAVEMENT LEAVE";
        }
        if (data === "FACILITATION_LEAVE") {
            return "FACILITATION LEAVE";
        } else {
            return "PATERNITY LEAVE";
        }
    };


    const renderTableCellsMobile = (row, indexPr) => {
        const filteredColumns = props.columns.filter(column => (column.is_mobile !== false ));
        return filteredColumns.map((val, index) => (
            <div className={'dtMobCell'}>
                {!val?.hide_label && (<div className={'dtMobCellLabel'}>
                    {val?.label}
                </div>)}
                <div className={'dtMobCellValue'}>
                    {val?.mobileRender ? val.mobileRender(row[val.key], row, indexPr) : val.render(row[val.key], row, indexPr)}
                </div>
            </div>
        ));
    };

    const renderTableBodyMobile = () => {
        const {data, classes, columns} = props;
        const {rowsPerPage, page, order, orderBy, selected, dense} = {...props};
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const isSelected = (name) => selected && selected.indexOf(name) !== -1;

        if (data.length > 0) {
            return data.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                if (mobileRender) {
                    const Entity = mobileRender;
                    return (<Entity data={row} index={index} />);
                }
                return (
                    <div>
                        <Card key={row.id + "" + Math.random()} className={classNames(classes.mobileCard, 'dtMobCard')}>
                            <CardContent className={classes.mobileCardContent}>{renderTableCellsMobile(row, index)}</CardContent>
                        </Card>
                    </div>
                );
            });
        } else {
            return (
                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                    <TableCell
                        colSpan={props.columns.length}
                        classes={{root: classes.centerText}}
                    >
                        <img
                            src={require("../assets/img/ic_search_empty@2x.png")}
                            height={140}
                            style={{marginTop: "25px"}}
                        />
                        <div>
                            <b>No Results Found</b>
                        </div>
                        <div style={{fontSize: "0.7rem", fontWeight: "500"}}>
                            No matching entries available in our record
                        </div>
                    </TableCell>
                </TableRow>
            );
        }
    };


    const renderTableBody = () => {
        const {data, classes} = props;
        const {rowsPerPage, page, order, orderBy, selected, dense} = {...props};
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const isSelected = (name) => selected && selected.indexOf(name) !== -1;



        if (data.length > 0) {
            return data.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        onClick={(event) => {
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id + "" + Math.random()}
                        selected={isItemSelected}
                    >
                        {renderTableCells(row, index)}
                    </TableRow>
                );
            });
        } else {
            return (
                <TableRow style={{height: (dense ? 33 : 53) * 1}}>
                    <TableCell
                        colSpan={props.columns.length}
                        classes={{root: classes.centerText}}
                        style={{textAlign:"center"}}
                    >
                        <img
                            src={require("../assets/img/ic_search_empty@2x.png")}
                            height={140}
                            style={{marginTop: "25px"}}
                        />
                        <div>
                            <b>No Results Found</b>
                        </div>
                        <div style={{fontSize: "0.7rem", fontWeight: "500"}}>
                            No matching entries available in our record
                        </div>
                    </TableCell>
                </TableRow>
            );
        }
    };

    return innerWidth > 769 ? (
        <PageBox classStyles={classes.pageBox}>
            <div className={classes.root}>
                <div className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                columns={columns}
                                allRowSelected={allRowSelected}
                                showSelection={showSelection}
                            />
                            <TableBody>{renderTableBody()}</TableBody>
                        </Table>
                    </div>
                    {props.hidePagination ? (
                        <></>
                    ) : (
                        <TablePagination
                            rowsPerPageOptions={props.rowsPerPageOptions}
                            component="div"
                            count={props.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                </div>
            </div>
        </PageBox>

    ) : (
        <div className={classes.paper}>
            {renderCardContent()}
            <div className={props?.MobilePagination ? '' : 'dTMobilePagination'}>
                <TablePagination
                    rowsPerPageOptions={props.rowsPerPageOptions}
                    component="div"
                    count={props.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /></div>
        </div>
    );
};

EnhancedTable.propTypes = {
    showSelection: PropTypes.bool,
};

EnhancedTable.defaultProps = {
    showSelection: false,
};

export default withStyles(useStyles)(EnhancedTable);

