import React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@material-ui/core/Button';
import ImageSelectionScrollingElement from "./ImageSelectionScrollingElement.jsx";


export default function PopoverBlockForImageSelection(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    return (
    <div className="item-bar__content-container_select">
      <Button onClick={handleClick}>Select image</Button>
      <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{width: "300px"}}>
          <ImageSelectionScrollingElement cellId={props.cellId} closingFunc={handleClose}/>
        </Popover>
    </div>
    );
  }