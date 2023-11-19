import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export default function SearchHistory({history = []}) {
    const generateChip = (c) => {
        return (<Chip className="ml-[5px] mr-[5px] mt-[2px] bg-theme-logo-blue text-white"
            key={c.id}
            label={c.type + ": " + c.value}
        />);
    }

    return (
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
                <Typography>Search History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {history.map((snap, k) => {
                    return (
                        <div className="max-w-[347px] border-2 bg-theme-contrast-blue-dark rounded-3xl p-0.5 pb-1" key={k+1}>
                            {snap.map((c) => generateChip(c))}
                        </div>
                    )
                })}
            </AccordionDetails>
        </Accordion>
    );
}