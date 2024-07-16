import Technology from "@/assets/CategoriesImages/Technology.svg"
import Art from "@/assets/CategoriesImages/Art.svg"
import Science from "@/assets/CategoriesImages/Science.svg"
import Language from "@/assets/CategoriesImages/Language.svg"
import Social from "@/assets/CategoriesImages/Social.svg"
import Exercise from "@/assets/CategoriesImages/Exercise.svg"
import Finance from "@/assets/CategoriesImages/Finance.svg"
import Music from "@/assets/CategoriesImages/Music.svg"

export interface Categories {
    name: string;
    image: string;
}

export const categories : Categories[] = [
    {
        name: 'Technology',
        image: Technology
    },
    {
        name: 'Art',
        image: Art
    },
    {
        name: 'Science',
        image: Science
    },
    {
        name: 'Language',
        image: Language
    },
    {
        name: 'Social',
        image: Social
    },
    {
        name: 'Music',
        image: Music
    },
    {
        name: 'Finance',
        image: Finance
    },
    {
        name: 'Exercise',
        image: Exercise
    },
]