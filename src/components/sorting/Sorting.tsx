import { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SortingType } from '@/types/sortingType';

interface ISelectsProps {
  setSortingType: React.Dispatch<React.SetStateAction<SortingType>>;
  sortingType: SortingType;
  isDisabled: boolean;
}

function Sorting({ setSortingType, sortingType, isDisabled }: ISelectsProps) {
  return (
    <FormControl disabled={isDisabled}>
      <InputLabel id="sorting-label">Sorting</InputLabel>

      <Select
        labelId="sorting-label"
        value={sortingType}
        label="Sorting"
        onChange={e => {
          setSortingType(e.target.value as SortingType);
        }}>
        <MenuItem value={SortingType.All}>All</MenuItem>
        <MenuItem value={SortingType.Active}>Active</MenuItem>
        <MenuItem value={SortingType.Completed}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
}

export default memo(Sorting);
