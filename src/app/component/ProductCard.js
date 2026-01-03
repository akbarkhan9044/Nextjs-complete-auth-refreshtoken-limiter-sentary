"use client"
import styles from "@/styles/Product.module.css";
import { useRouter } from "next/navigation";
export const ProductCard = ({ product }) => {
    const router=useRouter();
  return (
    <div className={styles.card} onClick={()=>{router.push(`/detail/${product._id}`)}}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <span className={styles.badge}>{product.category}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.ratingRow}>
          <span className={styles.rateNumber}>★ {product.rating.rate}</span>
          <span className={styles.count}>({product.rating.count})</span>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <div>
            <span className={styles.priceLabel}>Price</span>
            <span className={styles.price}>
              <span className={styles.yellowText}>$</span>
              {product.price}
            </span>
          </div>
          
          <button className={styles.cartButton}>
            {/* You can use an SVG icon here */}
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};