import React from 'react';

const SchedulesContext = React.createContext({
  currentSchedule: {},
  setCurrentSchedule: () => { },
});

export default SchedulesContext;