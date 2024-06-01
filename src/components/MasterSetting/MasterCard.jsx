import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import CustomTable from "../table/CustomTable";
// import { useGetBankQuery } from "../../redux/features/bank/bankApiSlice";
// import { useEffect } from "react";
// import axios from "axios";
// import { banks } from "routes/Routes";

const MasterCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  // const [rows, setRows] = useState([])

  // const { isError, isSuccess, data } = useGetBankQuery()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  const handleEditButton = (params) => {
    setEditModalData(params?.row);
    setOpenEditModal(true);
  };

  // const columns = [
  //     { field: 'id', headerName: 'ID', minWidth: 70, flex: 1, headerAlign: 'center', align: 'center' },
  //     // { field: 'firstName', headerName: 'First name', width: 130 },
  //     // { field: 'lastName', headerName: 'Last name', width: 130 },
  //     // {
  //     //     field: 'age',
  //     //     headerName: 'Age',
  //     //     type: 'number',
  //     //     width: 90,
  //     // },
  //     {
  //         field: 'fullName',
  //         headerName: 'Banks',
  //         description: 'This column has a value getter and is not sortable.',
  //         sortable: false,
  //         // minWidth: 250,
  //         flex: 1,
  //         valueGetter: (params) =>
  //             `${params.row.value || ''}`
  //     },
  //     {
  //         headerClassName: "themed--header",
  //         field: "actions",
  //         headerName: "Actions",
  //         // minWidth: 120,
  //         flex: 1,
  //         type: "actions",
  //         align: "center",
  //         headerAlign: "center",
  //         renderCell: (params) => {
  //             return (
  //                 <Stack direction="row" spacing={1}>

  //                     <IconButton
  //                         size="small"
  //                         color="warning"

  //                         onClick={() => handleEditButton(params)}
  //                     >
  //                         <LuEdit />
  //                     </IconButton>

  //                     <IconButton size="small" color="error">
  //                         <MdOutlineDelete fontSize="20px" />
  //                     </IconButton>

  //                 </Stack>
  //             );
  //         },
  //     },
  // ];

  const columns = [
    { field: "Report", hideable: false },
    { field: "Challan No", minWidth: 150 },
    { field: "Style No" },
    { field: "Line" },
    { field: "Created By", minWidth: 150 },
    { field: "Created Date", minWidth: 150 },
  ];

  const rows = [
    {
      id: 1,
      Report: "@MUI",
      "Challan No": 38,
      "Style No": "D-546",
      Line: "D-546",
      "Created By": "D-546",
      "Created Date": "D-546",
    },
    {
      id: 2,
      Report: "@MUI",
      "Challan No": 38,
      "Style No": "D-546",
      Line: "D-546",
      "Created By": "D-546",
      "Created Date": "D-546",
    },
  ];

  return (
    <>
      <div
        className="col-5 col-sm-3 col-md-3 col-lg-2 "
        onClick={handleClickOpen}
      >
        <div className="card w-100">
          {/* <img src="logo.png" alt="Logo" /> */}
          <span className="badge badge-success custom-badge">9+</span>

          {/* <i className="nav-icon fas fa-tachometer-alt icon-size"></i> */}
          {item.icon}
          <p className="card-text">{item.name}</p>
        </div>
      </div>

      {/* data modal */}
      <Dialog
        open={open}
        // onClose={handleClose}
        transitionDuration={800}
        maxWidth={"lg"}
        // sx={{ position: 'relative' }}
      >
        <Grid
          container
          alignItems={"center"}
          height={50}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            textAlign={"start"}
            sx={{ padding: "10px 25px" }}
            variant="h5"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {item.itemName}
          </DialogTitle>

          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 5, right: 12 }}
          >
            <CloseIcon color="error" />
          </IconButton>
        </Grid>

        <Grid container spacing={2} px={3} pt={2}>
          <Grid item xs={12} md={8}>
            <TextField fullWidth label={`Add ${item.itemName}`} size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ padding: "7px" }}
            >
              submit
            </Button>
          </Grid>
        </Grid>

        <DialogContent>
          <Table stickyHeader sx={{ minWidth: 800 }} size="small">
            <div style={{ height: 300, width: "100%" }}>
              <CustomTable columns={columns} rows={rows} />
              {/* <DataGrid
                                rows={rows}
                                columns={columns}
                                density="standard"
                                headerHeight={40}
                                components={{
                                    Toolbar: ToolBar
                                }}
                                header

                                sx={{
                                    "& .MuiDataGrid-columnHeaders": {
                                        borderRadius: 'none',
                                    }
                                }}


                                // columns={columns}

                                // sx={{ width: '30vw' }}
                                // initialState={{
                                //     pagination: {
                                //         paginationModel: { page: 0, pageSize: 5 },
                                //     },
                                // }}
                                // pageSizeOptions={[5, 10]}
                                checkboxSelection
                            

                            /> */}
            </div>

            {/* <Box sx={{ height: 520, width: '100%' }}>
            <DataGridPremium
                {...data}
                // apiRef={apiRef}
                loading={loading}
                disableRowSelectionOnClick
                initialState={initialState}
                slots={{ toolbar: GridToolbar }}
            />
        </Box> */}
          </Table>
        </DialogContent>
      </Dialog>

      {/* edit modat */}
      <Dialog
        open={openEditModal}
        onClose={handleCloseEdit}
        transitionDuration={300}
        maxWidth={"lg"}
        // sx={{ position: 'relative' }}
      >
        <DialogTitle
          id="alert-dialog-title"
          textAlign={"center"}
          variant="h5"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Update {item.itemName}
        </DialogTitle>

        <IconButton
          onClick={handleCloseEdit}
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <CloseIcon color="error" />
        </IconButton>
        <Grid
          container
          spacing={2}
          p={2}
          justifyContent={"center"}
          sx={{ minWidth: 450 }}
        >
          <Grid item xs={6} md={6}>
            <TextField
              defaultValue={editModalData.value}
              fullWidth
              label={`Add ${item.itemName}`}
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              sx={{ padding: "7px" }}
            >
              Update
            </Button>
          </Grid>
        </Grid>

        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};

export default MasterCard;

export const ToolBar = () => {
  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{ display: "flex", marginRight: "auto" }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput.split(",").map((value) => value.trim())
        }
        quickFilterFormatter={(quickFilterValues) =>
          quickFilterValues.join(", ")
        }
        debounceMs={500}
        sx={{ padding: "3px", paddingLeft: "10px" }}
      />
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport />
    </Stack>
  );
};
