import TechnologySVG from '@/assets/categories/TechnologySVG';
import ArtSVG from '@/assets/categories/ArtSVG';
import ScienceSVG from '@/assets/categories/ScienceSVG';
import LanguageSVG from '@/assets/categories/LanguageSVG';
import SocialSVG from '@/assets/categories/SocialSVG';
import ExerciseSVG from '@/assets/categories/ExerciseSVG';
import FinanceSVG from '@/assets/categories/FinanceSVG';
import MusicSVG from '@/assets/categories/MusicSVG';

export interface Categories {
  name: string;
  image: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const categories: Categories[] = [
  {
    name: 'Technology',
    image: TechnologySVG,
  },
  {
    name: 'Art',
    image: ArtSVG,
  },
  {
    name: 'Science',
    image: ScienceSVG,
  },
  {
    name: 'Language',
    image: LanguageSVG,
  },
  {
    name: 'Social',
    image: SocialSVG,
  },
  {
    name: 'Music',
    image: MusicSVG,
  },
  {
    name: 'Finance',
    image: FinanceSVG,
  },
  {
    name: 'Exercise',
    image: ExerciseSVG,
  },
];

export type TradeStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Trade {
  id: number;
  personOne: {
    name: string;
    specialty: string;
  };
  personTwo: {
    name: string;
    specialty: string;
  };
  status: TradeStatus;
}

export const trades: Trade[] = [
  {
    id: 1,
    personOne: {
      name: 'Alice Johnson',
      specialty: 'Web Development',
    },
    personTwo: {
      name: 'Bob Smith',
      specialty: 'Graphic Design',
    },
    status: 'Pending',
  },
  {
    id: 2,
    personOne: {
      name: 'Charlie Brown',
      specialty: 'Graphic Design',
    },
    personTwo: {
      name: 'David Wilson',
      specialty: 'Digital Marketing',
    },
    status: 'In Progress',
  },
  {
    id: 3,
    personOne: {
      name: 'Eve Davis',
      specialty: 'Digital Marketing',
    },
    personTwo: {
      name: 'Frank White',
      specialty: 'Data Analysis',
    },
    status: 'Completed',
  },
  {
    id: 4,
    personOne: {
      name: 'Grace Lee',
      specialty: 'Data Analysis',
    },
    personTwo: {
      name: 'Henry Martin',
      specialty: 'Web Development',
    },
    status: 'Pending',
  },
  {
    id: 5,
    personOne: {
      name: 'Ivy Taylor',
      specialty: 'Mobile App Development',
    },
    personTwo: {
      name: 'Jack Clark',
      specialty: 'Cybersecurity',
    },
    status: 'In Progress',
  },
  {
    id: 6,
    personOne: {
      name: 'Kathy Harris',
      specialty: 'Cybersecurity',
    },
    personTwo: {
      name: 'Liam Lewis',
      specialty: 'Graphic Design',
    },
    status: 'Completed',
  },
  {
    id: 7,
    personOne: {
      name: 'Mike Anderson',
      specialty: 'Cloud Computing',
    },
    personTwo: {
      name: 'Nancy Turner',
      specialty: 'AI Development',
    },
    status: 'Pending',
  },
  {
    id: 8,
    personOne: {
      name: 'Olivia Parker',
      specialty: 'Machine Learning',
    },
    personTwo: {
      name: 'Paul Thompson',
      specialty: 'Blockchain Development',
    },
    status: 'In Progress',
  },
  {
    id: 9,
    personOne: {
      name: 'Quinn Baker',
      specialty: 'UI/UX Design',
    },
    personTwo: {
      name: 'Rachel Adams',
      specialty: 'Game Development',
    },
    status: 'Completed',
  },
  {
    id: 10,
    personOne: {
      name: 'Steven Hill',
      specialty: 'DevOps',
    },
    personTwo: {
      name: 'Tina Young',
      specialty: 'Network Security',
    },
    status: 'Pending',
  },
  {
    id: 11,
    personOne: {
      name: 'Ursula Knight',
      specialty: 'Robotics',
    },
    personTwo: {
      name: 'Victor Scott',
      specialty: 'IoT Development',
    },
    status: 'In Progress',
  },
];
