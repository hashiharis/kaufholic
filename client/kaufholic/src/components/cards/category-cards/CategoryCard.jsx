
import styles from './category.module.css'
export const CategoryCard=({categories})=>{

    const{categoryImage,categoryTitle}=categories
    console.log(categories)

    const backgroundImageStyles={
        backgroundImage:`url(${categoryImage})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        maxWidth:"100%",
        minHeight:"300px"
       
      
    }
    return(
         <div className={styles.categoryWrapper}>
                 <div  style={backgroundImageStyles} className={styles.categoryImg}>
                 <button className={styles.categoryBtn}>{categoryTitle}</button>
                 </div>   
         </div>
    )
}