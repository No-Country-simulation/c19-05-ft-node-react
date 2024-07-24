import { useSpecialties } from '@/context/specialties/specialties';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/user/userContext';



interface FilterSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const { categories, getSpecialties } = useSpecialties();
  const {getUsers} = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  
  useEffect(() => {
    getUsers(selectedCategory);
  }, [selectedCategory]);

  return (
    <div
      className={`filter-sidebar border border-[#1FD68E] bg-gray-200 p-4 rounded  ${isOpen ? '' : 'hidden'} `}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Filters</h3>
        <button
          className="bg-[#1FD68E] text-white py-2 px-4 rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          Close
        </button>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="form-select bg-[#bef3dd] border rounded-lg block w-full mt-1"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id.toString()} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterSidebar;
