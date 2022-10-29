import React,{useEffect,useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavBarLayout from '../layouts/SideNavBarLayout'
import CartModal from '../component/CartModal';
import Rating from '../component/Rating'
function POSPage() {
const[products,setProducts]=useState([])
const[isLoading,setIsLoading]=useState(false) 
const[cart,setCart]=useState([])
const[totalAmount,setTotalAmount]=useState(0)




const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

const fetchProducts = async() => {
    setIsLoading(true);
    const result = await axios.get('products');
    setProducts(await result.data);
    setIsLoading(false);
  }

    useEffect(() => {
        fetchProducts()
    },[])


   
    const addProductToCart = async(product) =>{
        // check if the adding product exist -- inside the cart--
        let findProductInCart = await cart.find(i=>{
          //i  is the product im adding
          return i.id === product.id
        });
    
        if(findProductInCart){
          let newCart = [];
          let newItem;
    
          cart.forEach(cartItem => {
            if(cartItem.id === product.id){
              newItem = {
                ...cartItem,
                quantity:cartItem.quantity + 1,
                total: cartItem.price * (cartItem.quantity + 1)
              }
              newCart.push(newItem);
            }else{
              newCart.push(cartItem);
            }
          });
    
          setCart(newCart);
          toast(`Added ${newItem.name} to cart`,toastOptions)
    
        }else{
          let addingProduct = {
            // we pass same product (name +price )plus new extintion like(qty and total) 
            ...product,
            quantity: 1,
            total: product.price,//as item added for the first time to the cart the price = total
          }

          setCart([...cart, addingProduct]);
          toast(`Added ${product.name} to cart`, toastOptions)
        }
    
      }


      const removeProduct=async(product)=>{
       const newCart=cart.filter(cartItem=> cartItem.id !== product.id)
       setCart(newCart)
       toast(`remove ${product.name} from cart`, toastOptions)
      }


      //evry time the item in the cart change were going to calculate total amount
      useEffect(() => {
        let newTotalAmount=0;
        cart.forEach(itmeInCart=>{
            newTotalAmount=newTotalAmount+ parseInt(itmeInCart.total)
        })
        setTotalAmount(newTotalAmount)
    },[cart])



const decCart=async(product)=>{
   let findProductInCart = await cart.find(i=>{
    return i.id === product.id
  });

  if(findProductInCart){
    let newCart = [];
    let newItem;

    cart.forEach(cartItem => {
      if(cartItem.id === product.id){
      
        newItem = {
          ...cartItem,
          quantity:cartItem.quantity - 1,
          total: cartItem.price * (cartItem.quantity - 1)
        }
       
        newCart.push(newItem);
      }else{
        newCart.push(cartItem);
      }
    });

    setCart(newCart);
    toast(`Added ${newItem.name} to cart`,toastOptions)
  }else{
    let addingProduct = {
      ...product,
      quantity: 1,
      total: product.price,
    }
    setCart([...cart, addingProduct]);
    toast(`Added ${product.name} to cart`, toastOptions)
  }


}

 const filterResult=(catItem)=>{
 const result=products.filter((currdata)=>{
  return currdata.category ===catItem
 }
 )

 setProducts(result)

//  setProducts(products)
 }



  
    
  return (
    <MainLayout>
      <SideNavBarLayout />
      <CartModal  totalAmount={totalAmount}  removeProduct={removeProduct} decCart={decCart} cart={cart} addProductToCart={addProductToCart}/>
    <div className='row'>
    <div className="filters" class="text-center d-flex">
     <button class="btn btn-info m-3" onClick={()=>filterResult('Drinks')} >Drinks</button>
     <button class="btn btn-info m-3" onClick={()=>filterResult('Fruits')}>Fruits</button>
     <button class="btn btn-info m-3" onClick={()=>filterResult('Vegitabels')}>Vegitabels</button>
     <button class="btn btn-info m-3" onClick={()=>filterResult('Bakary')}>Bakary</button>
     <button class="btn btn-info m-3" onClick={()=>setProducts(products)}>ALL</button>
    </div>
      <div className='col-lg-8'>
        {isLoading ? 'Loading' : 
        <div className='row'>
            {products.map((product, key) =>
              <div key={key} className='col-lg-3 mb-4'>
                <div className='pos-item  text-center border' >
                    <h4>{product.name}</h4>
                    <img src={product.image} className="img-fluid" alt={product.name} />
                    <p>${product.price}</p>
                    <Rating  />
                    <button className='btn btn-primary mb-2' onClick={()=> addProductToCart(product)} ><i class="fa-solid fa-plus"></i>{""} Add To Cart</button>
                </div>

              </div>
            )}
          </div>}
     
      </div>
   
       </div>
    
    </MainLayout>
  )
}

export default POSPage