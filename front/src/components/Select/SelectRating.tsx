'use client';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type SelectRatingProps = {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
};

const SelectRating = (props: SelectRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => props.setRating(currentRating)}
                style={{ display: 'none' }}
              />
              <FaStar
                className="star"
                size={30}
                color={
                  currentRating <= (hover || props.rating)
                    ? '#ffc107'
                    : '#e4e5e9'
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              />
            </label>
          );
        })}
      </div>
      <p>Your rate is {props.rating} stars</p>
    </>
  );
};

export default SelectRating;
