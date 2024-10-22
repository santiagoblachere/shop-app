
import styles from './Product.module.css'
function ProductDetail({product, handleCartClick, cart}) {
    return (
        <div className={styles.container} key={product.id}>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <button onClick={() => handleCartClick(product)}>ADD TO CART</button>
        </div>
    )

}

export default ProductDetail