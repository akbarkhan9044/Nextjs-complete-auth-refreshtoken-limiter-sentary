// ProductDetail.jsx
import { Logger } from "../lib/logger";
import Image from "next/image";
import styles from "@/styles/ProductDetail.module.css"
import { getDataProductFromId } from "../lib/data";
export default  async function ProductDetail( {params} ) {
    const { id } = await params;
    Logger.debug("Detail Page");
  const product = await getDataProductFromId(id);
  return (
    <div className={styles.container}>
      {/* Left: Image */}
      <div className={styles.imageSection}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </div>

      {/* Right: Details */}
      <div className={styles.infoSection}>
        <span className={styles.categoryBadge}>{product.category}</span>
        
        <h1 className={styles.title}>{product.title}</h1>

        <div className={styles.priceRatingRow}>
          <span className={styles.price}>${product.price}</span>
          <div className={styles.rating}>
            <span>⭐ {product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>
        </div>

        <h3 className={styles.descriptionTitle}>Description</h3>
        <p className={styles.descriptionText}>{product.description}</p>

        <button className={styles.addToCartBtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}