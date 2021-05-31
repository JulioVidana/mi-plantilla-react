import React, { useState } from 'react'
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    Fab,
    Box,
    Container,
    Card,
    Avatar,
    Grid,
    Typography,
    colors,
    Slide
} from '@material-ui/core'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import Tabla from 'src/components/Tabla'
import Controls from 'src/components/controls/Controls'
import { Search as SearchIcon } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Registro from './Registro'
import Notificacion from 'src/components/Notification'
import Popup from 'src/components/Popup'
import data from './data'
import getInitials from 'src/utils/getInitials'


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
    },
    avatar: {
        marginRight: theme.spacing(2),
        color: theme.palette.getContrastText(colors.deepOrange[500]),
        backgroundColor: colors.deepOrange[500],
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

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
            <Titulo title="Usuarios" btnType='no' />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>
                        <Box p={2}>
                            <Grid
                                container
                                spacing={2}
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Controls.Input
                                        fullWidth
                                        placeholder="Buscar Usuario"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleSearch}
                                    />
                                </Grid>
                                <Grid>

                                </Grid>

                            </Grid>
                        </Box>

                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} >
                                                <TableCell>
                                                    <Box
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            src={item.img}
                                                        >
                                                            {getInitials(item.nombre)}
                                                        </Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                        >
                                                            {item.nombre}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
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
                Transition={Transition}
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
