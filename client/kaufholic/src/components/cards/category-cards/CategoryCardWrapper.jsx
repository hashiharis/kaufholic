import menCategory from '../../../assets/images/men-category.png'
import womenCategory from '../../../assets/images/women-category.png'
import bagCategory from '../../../assets/images/bag.png'
import styles from './categorywrapper.module.css'
import { CategoryCard } from './CategoryCard'


export const CategoryCardWrapper=()=>{
    const categoryDetails=[
        {
            id:1,
            categoryImage:menCategory,
            categoryTitle:"Men"
        },
        {
            id:2,
            categoryImage:womenCategory,
            categoryTitle:"Women"
        },
        {
            id:1,
            categoryImage:bagCategory,
            categoryTitle:"Bags"
        }

    ]
    
    return(
        <div className={styles.categorySection} >
            {
                categoryDetails.map((card,index)=>
                 <CategoryCard key={index} categories={card}/>
                )
            }
              
        </div>
    )

}