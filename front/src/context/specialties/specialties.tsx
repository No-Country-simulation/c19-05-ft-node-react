import api, { errorHandler } from '@/lib/axios';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


type Specialty = {
  _id: number;
  name: string;
  categoryId:string;
  status: boolean;
};

type payload = {
specialties: Specialty[]; 
categories: Category[];
}

type Category = {
  _id: number;
  name: string;
  customId:number;
  status:boolean;
};

type SpecialtiesContextType = {
  specialties: Specialty[];
  categories: Category[];
  getSpecialties: () => Promise<void>;
};


const SpecialtiesContext = createContext<SpecialtiesContextType | undefined>(undefined);

export const useSpecialties = () => {
  const context = useContext(SpecialtiesContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};


type SpecialtiesProviderProps = {
  children: ReactNode;
};

const SpecialtiesProvider: React.FC<SpecialtiesProviderProps> = ({ children }) => {
  
  
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [categories , setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getSpecialties();
  }, []);

  const getSpecialties = async () => {
    try {
      const { data } = await api<{payload:payload}>('/api/specialties');
      setSpecialties(data.payload.specialties);
      setCategories(data.payload.categories);
    } catch (error) {
      errorHandler(error);
    }
  };


  const contextValue: SpecialtiesContextType = {
    specialties,
    categories,
    getSpecialties,
  };

 
  return (
    <SpecialtiesContext.Provider value={contextValue}>
      {children}
    </SpecialtiesContext.Provider>
  );
};

export {SpecialtiesContext, SpecialtiesProvider};