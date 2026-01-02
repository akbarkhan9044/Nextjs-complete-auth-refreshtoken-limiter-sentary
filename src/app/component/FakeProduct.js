import React from 'react'
import { fetchAllProduct } from '../lib/request';
import { ProductCard } from './ProductCard';
import styles from "@/styles/Product.module.css";
export default async function FakeProduct() {

    const products=await fetchAllProduct();
    const hasProducts = Array.isArray(products) && products.length > 0;

    // 2. Handle the "Error" or "Empty" state
    if (!hasProducts) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2>Our <span className={styles.yellowText}>Collection</span></h2>
                </header>
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    {/* If it's the JWS error object, show the detail, otherwise show 'No Products' */}
                    <h3>{products?.detail || "No products found in the collection."}</h3>
                    <p>Please check your database connection or authentication token.</p>
                </div>
            </div>
        );
    }
  return (
<div className={styles.container}>
      <header className={styles.header}>
        <h2>Our <span className={styles.yellowText}>Collection</span></h2>
      </header>
      
      {products && (
      <div className={styles.grid}>
        {products.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      )}
    </div>
  )
}
