// import React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';

// const ValueContext = React.createContext();
// const ValueUpdateContext = React.createContext();

// export const useValue = () => {
//   return React.useContext(ValueContext);
// }

// export const useValueUpdate = () => {
//   return React.useContext(ValueUpdateContext);
// }


  
// export const ValueProvider = ({ children: any }) => {
//   const [value, setValue] = React.useState(1);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     console.log('value: ', value);
//     setValue(newValue);
//     console.log('in handleChange');
//     console.log('new value: ', newValue);
//   };
  
//   return (
//     <ValueContext.Provider value={value}>
//       <ValueUpdateContext.Provider handleChange={handleChange}>
//         { children: any }
//       </ValueUpdateContext.Provider>
//     </ValueContext.Provider>
    
//   );
// }