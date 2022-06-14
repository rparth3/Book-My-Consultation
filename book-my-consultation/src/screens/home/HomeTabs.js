
import React from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import DoctorList from '../doctorList/DoctorList';
import TabContainer from '../../common/tabContainer/TabContainer';
import Appointment from '../appointment/Appointment';

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  TabContainer.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="DOCTOR" {...a11yProps(0)} />
          <Tab label="APPOINTMENT" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabContainer value={value} index={0}>
        <DoctorList />
      </TabContainer>
      <TabContainer value={value} index={1}>
        <Appointment />
      </TabContainer>
    </Box>
  );
}
