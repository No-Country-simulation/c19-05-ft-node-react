import React, { useState } from 'react';

const categories = [
    'Tecnología',
    'Ciencia',
    'Música',
    'Lenguajes',
    'Finanzas',
    'Ejercicio',
    'Sociales',
    'Arte'
];

interface FilterSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, toggleSidebar }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className={`filter-sidebar bg-gray-100 p-4 rounded ${isOpen ? '' : 'hidden'}`}>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                    {categories.map((category) => (
                        <div key={category} className="flex items-center mb-2">
                            <input
                                id={category}
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <label htmlFor={category} className="ml-2 text-sm text-gray-700">{category}</label>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default FilterSidebar;