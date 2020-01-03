import React from 'react';

const SchedulesContext = React.createContext({
  schedules: [],
  currentSchedule: {},
  setCurrentSchedule: () => { },
});

export default SchedulesContext;