import React from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { InterestPopulated } from '@/types/user.type';
import { SharedSelection } from '@nextui-org/react';

type SelectComponentProps = {
  specialties?: InterestPopulated[];
  creatorOrguest?: 'creator' | 'guest';
  time?: boolean;
  setSpecialty?: React.Dispatch<React.SetStateAction<string>>;
  setDuration?: React.Dispatch<
    React.SetStateAction<'' | 'One day' | 'Three days' | 'One week'>
  >;
};

type enumString = '' | 'One day' | 'Three days' | 'One week';

export default function SelectComponent({
  specialties,
  creatorOrguest,
  time,
  setSpecialty,
  setDuration,
}: SelectComponentProps) {
  const [value, setValue] = React.useState(new Set([]));
  const handleSelection = (key: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(key.target.value);

    if (setSpecialty) {
      setSpecialty(key.target.value);
    } else if (setDuration) {
      setDuration(key.target.value as enumString);
    }
  };
  if (!time)
    return (
      <Select
        items={specialties}
        label={
          creatorOrguest === 'creator'
            ? 'What do you want to teach?'
            : 'What do you want to learn?'
        }
        placeholder="Select an specialty"
        className="max-w-xs"
        onChange={(e) => handleSelection(e)}
      >
        {(specialty) => (
          <SelectItem key={specialty._id}>
            {specialty.specialtyId.name}
          </SelectItem>
        )}
      </Select>
    );
  return (
    <Select
      items={[
        { time: 'One day' },
        { time: 'Three days' },
        { time: 'One week' },
      ]}
      label={'How long will the operation take?'}
      placeholder="Select one option"
      className="max-w-xs"
      onChange={(e) => handleSelection(e)}
    >
      {(time) => <SelectItem key={time.time}>{time.time}</SelectItem>}
    </Select>
  );
}
