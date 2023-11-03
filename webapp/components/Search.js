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

const drawerWidth = 380;

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
  const [chips, setChips] = useState([]);
  const [inputs, setInputs] = useState({
    file: "",
    extension: "",
    customer: "",
    project: "",
    proposal: "",
    resource: "",
    auction: "",
    begin: "",
    end: ""
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDelete = (evt, type) => {
        // TODO: delete bubbles
  }

  let idInc = 0;
  const updateChipDisplay = (filter) => {
    if (filter === "all") {
      let chipComponents = [];

      for (const [type, value] of Object.entries(inputs)) {
        if (value !== "") {
          chipComponents.push(<Chip className="ml-[10px] bg-theme-contrast-blue-dark"
            key={idInc++}
            label={type + ":" + value}
            onDelete={evt => handleDelete(evt, type)} 
          />);
        }
      }

      setChips(chipComponents);
    } else {
      if (inputs[filter] !== "") {
        let chip = [(<Chip className="ml-[10px] bg-theme-contrast-blue-dark"
          key={idInc++}
          label={filter + ":" + inputs[filter]}
          onDelete={evt => handleDelete(evt, filter)} 
        />)];

        setChips(prev => prev.concat(chip));
      }
    }
  }

  const filterUpdateHandler = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  const search = () => {
    updateChipDisplay("all");
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
            <div className="rounded-l-xl bg-theme-contrast-blue-dark p-[10px] w-[500px]">
                <TextField
                    fullWidth
                    size="small"
                    label="File search"
                    id="searchbar"
                />
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
            <div className="mt-auto mb-auto">
                {chips}
            </div>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Accordion disableGutters elevation={0} className="bg-theme-grey-light">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Advanced Search</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="file"
                label="File Name/ID"
                type="search"
                variant="filled"
                value={inputs.file}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("file")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="extension"
                label="File Type"
                type="search"
                variant="filled"
                value={inputs.extension}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("extension")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="customer"
                label="Customer Name/ID"
                type="search"
                variant="filled"
                value={inputs.customer}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("customer")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="project"
                label="Project Name/ID"
                type="search"
                variant="filled"
                value={inputs.project}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("project")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="proposal"
                label="Proposal Name/ID"
                type="search"
                variant="filled"
                value={inputs.proposal}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("proposal")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="resource"
                label="Resource Type/ID"
                type="search"
                variant="filled"
                value={inputs.resource}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("resource")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="auction"
                label="Auction ID"
                type="search"
                variant="filled"
                value={inputs.auction}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("auction")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="begin"
                label="Begin Date"
                type="search"
                variant="filled"
                value={inputs.begin}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("begin")}
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
            <div className="h-[56px] w-[347px] flex">
              <TextField className="w-[320px]"
                id="end"
                label="End Date"
                type="search"
                variant="filled"
                value={inputs.end}
                onChange={filterUpdateHandler}
              />
              <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                  variant="outlined"
                  onClick={() => updateChipDisplay("end")}
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
