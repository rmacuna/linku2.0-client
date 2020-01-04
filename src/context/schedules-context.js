import React from 'react';

const SchedulesContext = React.createContext({
  matrixTemplate: [],
  schedules: [],
  currentSchedule: {},
  setCurrentSchedule: () => { },
  setMatrixTemplate: () => { }
});

export default SchedulesContext;