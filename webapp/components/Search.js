import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ResultsRack from './ResultsRack';
import DataGridDemo from '../components/Datatable.js';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const drawerWidth = 380;

let idInc = 0;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Search() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [addFiltersButtonVisible, setAddFiltersButtonVisible] = React.useState(true)
    const [chips, setChips] = useState([]);
    const [inputs, setInputs] = useState({
        fileName: "",
        fileID: "",
        fileType: "",
        customerName: "",
        customerID: "",
        projectName: "",
        projectID: "",
        proposalName: "",
        proposalID: "",
        resourceName: "",
        resourceID: "",
        auctionID: "",
        dateBegin: "",
        dateEnd: ""
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDelete = (idNum) => {
        setChips(prev => prev.filter(c => c.id !== idNum));
    }

    const chipSort = (chip1, chip2) => {
        if (chip1.type < chip2.type) {
            return -1;
        } else if (chip1.type > chip2.type) {
            return 1;
        }

        if (chip1.value < chip2.value) {
            return -1;
        } else if (chip1.value > chip2.value) {
            return 1;
        }

        return 0;
    }

    const addChip = (filter) => {
        if (filter === "all") {
            for (const [type, value] of Object.entries(inputs)) {
                addChip(type);
            }
        } else if (inputs[filter] !== "" && !chips.some(c => c.type === filter && c.value === inputs[filter])) {
            let chip = {
                id: idInc++,
                type: filter,
                value: inputs[filter]
            };

            setChips(prev => prev.concat(chip));
        }
    }

    useEffect(() => {
        if (chips.length === 0) {
            setAddFiltersButtonVisible(true);
        } else {
            setAddFiltersButtonVisible(false);
        }
    }, [chips])

    const filterUpdateHandler = (e, type) => {
        let value;
        if (type === "dateBegin" || type === "dateEnd") {
            let date = dayjs(e).format();
            value = date.slice(0, date.indexOf("T"));
        } else {
            value = e.target.value;
        }

        setInputs(prev => ({
            ...prev,
            [type]: value,
        }));
    }

    const keyHandler = (e, type) => {
        if (e.key === 'Enter') {
            addChip(type);
        }
    }

    const search = () => {
        
    }

    const filterAndSearch = () => {
        addChip("all");
        search();
    }

    return (
        <Box className="flex">
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="flex">
                        <div className="rounded-l-xl bg-theme-contrast-blue-dark p-[10px] min-h-[56px] min-w-[320px]">
                            <div>
                                <Button className={addFiltersButtonVisible ? "bg-theme-logo-blue w-[300px]" : "hidden"}
                                    variant="contained"
                                    onClick={handleDrawerOpen}
                                >Add Filters</Button>
                                {chips.sort(chipSort).map(c =>
                                    <Chip className="ml-[5px] mr-[5px] mt-[2px] bg-theme-logo-blue text-white"
                                        key={c.id}
                                        label={c.type + ": " + c.value}
                                        onDelete={() => handleDelete(c.id)}
                                    />
                                )}
                            </div>
                        </div>
                        <Button className="rounded-r-xl rounded-l-none border-none bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={search}
                        >
                            <svg className="h-[32px] w-[32px] fill-theme-logo-blue"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer className={"flex w-[" + drawerWidth + "] shrink-0 [&_.MuiDrawer-paper]:" + drawerWidth + " [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:bg-theme-grey-light"}
                sx={{ width: drawerWidth }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>FORMFLOW LOGO HERE
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <Accordion className="bg-theme-grey-light"
                    disableGutters
                    elevation={0}
                    defaultExpanded
                >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="fileName"
                            label="File Name"
                            type="search"
                            variant="filled"
                            value={inputs.file}
                            onChange={e => filterUpdateHandler(e, "fileName")}
                            onKeyDown={(e) => keyHandler(e, "fileName")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("fileName")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="fileType"
                            label="File Type"
                            type="search"
                            variant="filled"
                            value={inputs.extension}
                            onChange={e => filterUpdateHandler(e, "fileType")}
                            onKeyDown={(e) => keyHandler(e, "fileType")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("fileType")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="customerName"
                            label="Customer Name"
                            type="search"
                            variant="filled"
                            value={inputs.customer}
                            onChange={e => filterUpdateHandler(e, "customerName")}
                            onKeyDown={(e) => keyHandler(e, "customerName")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("customerName")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="projectName"
                            label="Project Name"
                            type="search"
                            variant="filled"
                            value={inputs.project}
                            onChange={e => filterUpdateHandler(e, "projectName")}
                            onKeyDown={(e) => keyHandler(e, "projectName")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("projectName")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="proposalName"
                            label="Proposal Name"
                            type="search"
                            variant="filled"
                            value={inputs.proposal}
                            onChange={e => filterUpdateHandler(e, "proposalName")}
                            onKeyDown={(e) => keyHandler(e, "proposalName")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("proposalName")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="resourceName"
                            label="Resource Type"
                            type="search"
                            variant="filled"
                            value={inputs.resource}
                            onChange={e => filterUpdateHandler(e, "resourceName")}
                            onKeyDown={(e) => keyHandler(e, "resourceName")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("resourceName")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id="auctionID"
                            label="Auction ID"
                            type="search"
                            variant="filled"
                            value={inputs.auction}
                            onChange={e => filterUpdateHandler(e, "auctionID")}
                            onKeyDown={(e) => keyHandler(e, "auctionID")}
                        />
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("auctionID")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="w-[320px]"
                                label="Begin Date"
                                value={inputs.end}
                                onChange={v => filterUpdateHandler(v, "dateBegin")}
                                onKeyDown={(e) => keyHandler(e, "dateBegin")}
                                slotProps={{ textField: { variant: 'filled' } }}
                            />
                        </LocalizationProvider>
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("dateBegin")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className="w-[320px]"
                                label="End Date"
                                value={inputs.end}
                                onChange={v => filterUpdateHandler(v, "dateEnd")}
                                onKeyDown={(e) => keyHandler(e, "dateEnd")}
                                slotProps={{ textField: { variant: 'filled' } }}
                            />
                        </LocalizationProvider>
                        <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                            variant="outlined"
                            onClick={() => addChip("dateEnd")}
                        >
                            <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                            </svg>
                        </Button>
                    </div>
                    <Button className="h-[56px] w-[316px] mt-[5px] ml-[13px] shadow shadow-theme-logo-blue rounded-xl bg-theme-contrast-blue-light text-xl font-extrabold hover:bg-[#afc3da] hover:border-none"
                        onClick={filterAndSearch}
                    >
                        <svg className="h-[32px] w-[32px] fill-theme-logo-blue mr-[20px]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        >
                            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                        </svg>
                        Filter & Search
                    </Button>
                </AccordionDetails>
                </Accordion>
                <Divider />
                <List>
                <ListItem key="Search History" disablePadding>
                    <ListItemButton>
                    <ListItemText primary="Search History" />
                    </ListItemButton>
                </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <ResultsRack />
                <br/>
                <DataGridDemo />
            </Main>
        </Box>
    );
}
