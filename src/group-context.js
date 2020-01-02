import React from 'react';

export const GroupContext = React.createContext({
  groups: [{
    nrc: "12147",
    subject: {
      name: "TOXICOLOGiA",
    },
    quota: {
      free: 1,
    }
  }],
  setGroups: () => { }
});