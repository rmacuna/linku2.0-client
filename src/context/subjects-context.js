import React from 'react';

const SubjectsContext = React.createContext({
  subjects: [],
  addSubject: () => { },
  updateGroupStatus: () => { }
});

export default SubjectsContext;