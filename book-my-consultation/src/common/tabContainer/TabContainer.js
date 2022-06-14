import React from 'react';
import { Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const TabContainer = function (props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span" variant="body2">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
