import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import styles from './Shopping.module.css'
import { useParams } from "react-router-dom"
function Shop() {
const [products, setProducts] = useState([])
const [productDetail, setProducDetail] = useState(null)
const [loading, setLoading] = useState(true)
const { id } = useParams()
function handleCartClick(product) {
    console.log(product)
}

useEffect(() => {
    const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products')
            try{
                const data = await response.json()
                setProducts(data)
            }catch(error){
                console.log(error)                  
            }            
    }
    fetchProducts()
    setLoading(false)
}, [])


    return (
        loading ? <h1>Loading...</h1> :
        <div>
        <h1>hola a todos, soy el shop</h1>
        <Link to="/">GO BACK. THIS IS SHIT</Link>
        <div id="container"className={styles.container}>
        {id === undefined ? 
        products.map(product => {
            return (
                <div className={styles.card}key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <h3>${product.price}</h3>
                    <button onClick={() => handleCartClick(product)}>ADD TO CART</button>
                    <Link to={`/shop/${product.id}`}>DETAILS</Link>
                </div>
            )
        })      
        : products.map(product => {
            if(product.id !== Number(id)) return
            return (
                <div className={styles.card}key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <button onClick={() => handleCartClick(product)}>ADD TO CART</button>
                </div>
            )
        })}
        {}
        </div>

        </div>
    )
}

export default Shop