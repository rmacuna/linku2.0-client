import React from 'react';

const SubjectsContext = React.createContext({
  subjects: [],
  addSubject: () => { },
  removeSubject: () => { },
  updateGroupStatus: () => { },
});

export default SubjectsContext;