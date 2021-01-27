import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    Toolbar,
    Fab,
    Box,
    Container,
    Card,
    CardContent
} from '@material-ui/core';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar'
import Tabla from 'src/components/Tabla';
import Controls from 'src/components/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Registro from './Registro'
import Notificacion from 'src/components/Notification'
import Popup from 'src/components/Popup';
import data from './data'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '60%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'email', label: 'Email' },
    { id: 'rol', label: 'Rol' },
    { id: 'empresa', label: 'Empresa' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];

const UsuariosView = () => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [recordForEdit, setRecordForEdit] = useState(null)
    const usuariosList = data;

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(usuariosList, headCells, filterFn);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.nombre.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <Page
            className={classes.root}
            title="Usuarios"
        >
            <Titulo title="Usuarios" />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Toolbar>
                                <Controls.Input
                                    label="Buscar Usuario"
                                    className={classes.searchInput}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>)
                                    }}
                                    onChange={handleSearch}
                                />
                                <Controls.Button
                                    text="Agregar"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    className={classes.newButton}
                                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                />
                            </Toolbar>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={3}>
                    <Card>
                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} >
                                                <TableCell>{item.nombre}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>
                                                    {
                                                        item.rol === 1 ? "Administrador" :
                                                            item.rol === 2 ? "Agente" : "Editor"
                                                    }
                                                </TableCell>
                                                <TableCell>{item.empresa}</TableCell>
                                                <TableCell>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                    /* onClick={() => { openInPopup(item) }} */
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                    /* onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Estas seguro de borrar el registro?',
                                                            subTitle: "No podrás deshacer esta acción",
                                                            onConfirm: () => { onDelete(item) }
                                                        })
                                                    }} */
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                </TableCell>
                                            </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                                <TblPagination />

                            </Box>
                        </PerfectScrollbar>

                    </Card>
                </Box>
                <Fab color="primary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                >
                    <AddIcon />
                </Fab>
            </Container>

            <Popup
                title="Formulario de Usuario"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Registro
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    recordForEdit={recordForEdit} />
            </Popup>
            <Notificacion
                notify={notify}
                setNotify={setNotify}
            />

        </Page>
    )
}

export default UsuariosView
