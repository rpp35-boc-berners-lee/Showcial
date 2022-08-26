import React from 'react';
import './WatchProviders.scss';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const WatchProviders = () => {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'Netflix' },
    { key: 1, label: 'Hulu' },
    { key: 2, label: 'Disney+' },
    { key: 3, label: 'HBO Max' },
    { key: 4, label: 'Prime Video' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    console.log('chipToDelete: ', chipToDelete);
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    console.log(chipData);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        // let icon;

        // if (data.label === 'React') {
        //   icon = <TagFacesIcon />;
        // }
        console.log(data);
        return (
          <ListItem key={data.key}>
            <Chip
              // icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};
