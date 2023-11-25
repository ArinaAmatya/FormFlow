import React, { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResultsRack from './ResultsRack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import SearchHistory from './SearchHistory.js';
import FilterInput from './FilterInput.js';

/**
 * Represents the essential data of a filter chip.
 * 
 * @typedef {Object} ChipData
 * @property {number} id - The unique ID of the chip.
 * @property {string} type - The type the chip will filter for.
 * @property {number} value - The value that will be filtered for.
 */

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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

/**
 * A React component that represents the search bar and the filters & history
 * drawer and their functionality.
 * 
 * @returns {React.ReactElement} - Search component.
 */
function Search() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [addFiltersButtonVisible, setAddFiltersButtonVisible] = React.useState(true)
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
    const [chips, setChips] = useState([]);
    const [prevSearches, setPrevSearches] = useState([]);
    const [searchFlag, setSearchFlag] = useState(false);

    /**
     * Handles deletion of a filter chip with ID idNum.
     * 
     * @param {number} idNum
     * 
     * @function
     */
    const handleDelete = (idNum) => {
        setChips(prev => prev.filter(c => c.id !== idNum));
    }

    /**
     * Returns -1, 0, or 1 depending on which chip is alphabetically greater.
     * Used for sorting of chips array alphabetically.
     * 
     * @param {ChipData} chip1
     * @param {ChipData} chip2
     * @returns {number} - -1 if chip2 is greater, 0 if neither is greater, 1 if chip1 is greater.
     * 
     * @function
     */
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

    /**
     * Adds a chip for the type of filter specified. If the type is "all",
     * all filter types will attempt to be added.
     * 
     * @param {string} filterType - The type of filter that will be added.
     * 
     * @function
     */
    const addChip = (filterType) => {
        let filters = [];
        let chipsToAdd = [];

        if (filterType === "all") {
            for (const [type, value] of Object.entries(inputs)) {
                filters.push(type);
            }
        } else {
            filters.push(filterType);
        }
        
        filters.forEach(filter => {
                if (inputs[filter] !== "" && !chips.some(c => c.type === filter && c.value === inputs[filter])) {
                chipsToAdd.push({
                    id: idInc++,
                    type: filter,
                    value: inputs[filter]
                });
            }
        });

        setChips(prev => prev.concat(chipsToAdd));
    }

    /**
     * Builds a MUI Chip component using an input ChipData object.
     * 
     * @param {ChipData} c - The data that is necessary to build the chip.
     * @returns {React.ReactElement} - A Chip component.
     * 
     * @function
     */
    const generateChip = (c) => {
        return (<Chip className="ml-[5px] mr-[5px] mt-[2px] bg-theme-logo-blue text-white"
            key={c.id}
            label={c.type + ": " + c.value}
            onDelete={() => handleDelete(c.id)}
        />);
    }

    useEffect(() => {
        if (chips.length === 0) {
            setAddFiltersButtonVisible(true);
        } else {
            setAddFiltersButtonVisible(false);
        }

        if (searchFlag) {
            setSearchFlag(prev => false);
            search();
        }
    }, [chips]);

    /**
     * Calls to the backend to search the database using the current filters
     * and displays the results.
     * 
     * @function
     */
    const search = () => {
        setPrevSearches(prev => chips.length > 0 ? [chips].concat(prev) : prev);
    }

    /**
     * Sets the search flag to true to indicate that a search is due after
     * the filters have been added, then adds all filter chips from the
     * current filter inputs.
     * 
     * @function
     */
    const filterAndSearch = () => {
        setSearchFlag(prev => true);
        addChip("all");
    }

    /**
     * Opens the filters & history drawer if it is closed, otherwise it adds
     * all filter chips from the current filter inputs.
     * 
     * @function
     */
    const handleAddFiltersButton = () => {
        if (!open) {
            setOpen(true);
        } else {
            addChip("all");
        }
    }

    return (
        <Box className="flex">
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
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
                                    onClick={handleAddFiltersButton}
                                >Add Filters</Button>
                                {chips.sort(chipSort).map((c) => generateChip(c))}
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
                <DrawerHeader>
                <img className="max-w-[250px] ml-auto mr-auto mt-[10px] mb-[10px]"
                    src={"/logo.png"}
                    alt="FormFlow Logo"
                />
                <IconButton onClick={() => setOpen(false)}>
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
                    <FilterInput
                        label = "File Name"
                        type = "fileName"
                        input = {inputs.fileName}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "File Type"
                        type = "fileType"
                        input = {inputs.fileType}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Customer Name"
                        type = "customerName"
                        input = {inputs.customerName}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Project Name"
                        type = "projectName"
                        input = {inputs.projectName}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Proposal Name"
                        type = "proposalName"
                        input = {inputs.proposalName}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Resource Name"
                        type = "resourceName"
                        input = {inputs.resourceName}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Auction ID"
                        type = "auctionID"
                        input = {inputs.auctionID}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "Begin Date"
                        type = "dateBegin"
                        input = {inputs.dateBegin}
                        date
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
                    <FilterInput
                        label = "End Date"
                        type = "dateEnd"
                        date
                        input = {inputs.dateEnd}
                        setInputs = {setInputs}
                        addChip = {addChip}
                    />
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
                <SearchHistory
                    history={prevSearches}
                />
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <ResultsRack />
            </Main>
        </Box>
    );
}

export default Search;