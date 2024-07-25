import { Select, SelectItem } from '@nextui-org/select';

const rating = ['1 ⭐', '2 ⭐', '3 ⭐', '4 ⭐', '5 ⭐'];

type SelectRatingProps = {
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

export default function SelectRating({ setRating }: SelectRatingProps) {
  const handleSelection = (key: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(parseInt(key.target.value));

    setRating(parseInt(key.target.value));
  };
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Select rating"
        className="max-w-xs"
        onChange={(e) => handleSelection(e)}
      >
        {rating.map((rat, index) => (
          <SelectItem key={index}>{rat}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
