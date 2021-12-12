import React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@material-ui/core/Button';

import TrueGrid from './TrueGrid.jsx';

export default function ShowTrueGridBlock(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>Show true grid</Button>
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <TrueGrid trueGridCells={props.trueGridCells} closingFunc={handleClose}/>
            </Popover>
        </div>
    );
}