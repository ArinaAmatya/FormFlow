import React, { useState, useEffect } from 'react';
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
import SearchHistory from './SearchHistory.js';
import SearchBar from './SearchBar.js';
import Filters from './Filters.js';

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
    const [addFiltersButtonVisible, setAddFiltersButtonVisible] = React.useState(true);
    const [data, setData] = useState([]);
    const [chips, setChips] = useState([]);
    const [inputs, setInputs] = useState({
        fileName: "",
        fileType: "",
        customerName: "",
        customerID: "",
        projectName: "",
        projectID: "",
        proposalName: "",
        proposalID: "",
        resourceName: "",
        resourceID: "",
        dateBegin: "",
        dateEnd: ""
    });
    const dataMap = new Map(); 
    let url = "";
    const [prevSearches, setPrevSearches] = useState([]);
    const [searchFlags, setSearchFlags] = useState([]);

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

    useEffect(() => {
        if (chips.length === 0) {
            setAddFiltersButtonVisible(true);
        } else {
            setAddFiltersButtonVisible(false);
        }

        if (searchFlags.length > 0) {
            setSearchFlags(prev => []);
            search(searchFlags);
        }
    }, [chips]);

    /**
     * Searches dataMap for a given chip.
     * 
     * @param {ChipData} c - Chip to search for. 
     */
    const chipsSearch = (c) => {
        if (!dataMap.has(c.type)){
            dataMap.set(c.type, [c.value]);
        } else{
            dataMap.get(c.type).push(c.value);
        }
    }
    
    /**
     * Calls to the backend to search the database using the current filters
     * and displays the results.
     * 
     * @function
     */
    const search = (options) => {
        url = "http://localhost:8080/getFileMetadata/"
        chips.map(c => chipsSearch(c));
        for (const [key, value] of dataMap) {
            url += key + "=";
            for (let i = 0; i < value.length - 1; i++){
              url += value[i] + ",";
            }
            url += value[value.length-1] + "&";
          }
          url = url.substring(0, url.length-1);
          url = url.replaceAll(" ", "%20");
          console.log(url);
        if (chips.length !== 0){
            fetch(url)
            .then((res) => {
                if (res.ok){
                    return res.json();
                }else{
                    throw new Error("Status code error: " + res.status);
                }})
            .then((data) => {
                setData(data)
            })
            .catch((err) => console.log(err));
        }else{
            setData([]);
        }

        if (!options.includes("no-history")) {
            setPrevSearches(prev => chips.length > 0 ? [chips].concat(prev) : prev);
        }
    }

    /**
     * Sets the search flag to true to indicate that a search is due after
     * the filters have been added, then adds all filter chips from the
     * current filter inputs.
     * 
     * @function
     */
    const filterAndSearch = () => {
        setSearchFlags(prev => ["search"]);
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

    /**
     * Removes all filters from the search bar.
     * 
     * @function
     */
    const handleDeleteFiltersButton = () => {
        setChips(prev => []);
    }

    /**
     * Restores a snapshot of a previous search to be the
     * current filters and searches again.
     * 
     * @param {ChipData[]} snapshot - Snapshot of previous search. 
     */
    const handleRestoreSearch = (snapshot) => {
        setSearchFlags(prev => ["search", "no-history"]);
        setChips(prev => snapshot);
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
                    <SearchBar
                        chips={chips}
                        handleDelete={handleDelete}
                        handleAddAllButton={handleAddFiltersButton}
                        handleDeleteAllButton={handleDeleteFiltersButton}
                        buttonVisible={addFiltersButtonVisible}
                        handleSearch={() => search(["search"])}
                    />
                </Toolbar>
            </AppBar>
            <Drawer className={"flex w-[" + drawerWidth + "] shrink-0 [&_.MuiDrawer-paper]:" + drawerWidth + " [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:bg-theme-grey-light"}
                sx={{ width: drawerWidth }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <img className="max-w-[225px] m-auto"
                    src={"/logo.png"}
                    alt="FormFlow Logo"
                />
                <IconButton onClick={() => setOpen(false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <Filters
                    inputs={inputs}
                    setInputs={setInputs}
                    addChip={addChip}
                    handleFilterAndSearchButton={filterAndSearch}
                />
                <Divider />
                <SearchHistory
                    history={prevSearches}
                    handleRestoreSearch={handleRestoreSearch}
                />
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <ResultsRack files={data} />
            </Main>
        </Box>
    );
}

export default Search;