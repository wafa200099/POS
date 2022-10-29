import React,{useEffect,useRef,useState} from 'react'
import { useReactToPrint } from 'react-to-print';
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ComponentToPrint} from '../component/componentToPrint'
import SideNavBarLayout from '../layouts/SideNavBarLayout'

function POSPage() {
const[products,setProducts]=useState([])
const[isLoading,setIsLoading]=useState(false) 
const[cart,setCart]=useState([])
const[totalAmount,setTotalAmount]=useState(0)
const componentRef = useRef();

const handleReactToPrint = useReactToPrint({
  content: () => componentRef.current,
});

const handlePrint = () => {
  handleReactToPrint();
}

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
      // we pass same product (name +price )plus new extintion like(qty and total) 
      ...product,
      quantity: 1,
      total: product.price,//as item added for the first time to the cart the price = total
    }

    setCart([...cart, addingProduct]);
    toast(`Added ${product.name} to cart`, toastOptions)
  }


}

// const filterDrinks=(products)=>{
//   filterDrinks


// }
// onClick={filterDrinks}

  
    
  return (
    <MainLayout>
      <SideNavBarLayout />
    
    <div className='row'>
    <div className="filters" class="text-center d-flex">
     <button class="btn btn-info m-3" >Drinks</button>
     <button class="btn btn-info m-3">Fruits</button>
     <button class="btn btn-info m-3">Vegitabels</button>
     <button class="btn btn-info m-3">Bakary</button>
    </div>
      <div className='col-lg-8'>
        {isLoading ? 'Loading' : 
        <div className='row'>
            {products.map((product, key) =>
              <div key={key} className='col-lg-4 mb-4'>
                <div className='pos-item px-3 text-center border' >
                    <p>{product.name}</p>
                    <img src={product.image} className="img-fluid" alt={product.name} />
                    <p>${product.price}</p>
                    <button className='btn btn-primary mb-2' onClick={()=> addProductToCart(product)} ><i class="fa-solid fa-plus"></i></button>
                </div>

              </div>
            )}
          </div>}
     
      </div>
        <div className="col-lg-4">
        <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div> 
        <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) =>
                       
                      <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>${cartProduct.price}</td>
                      <td>
                        <button className='btn btn-light btn-sm'onClick={()=>addProductToCart(cartProduct)} >+</button>
                        <div className='d-inline'>  {cartProduct.quantity} </div>
                        {cartProduct.quantity >1 ? 
                        <button className='btn btn-light btn-sm' onClick={()=>decCart(cartProduct)}>-</button>
                        :
                        <button className='btn btn-light btn-sm' >-</button>
                         }
                      </td>
                      <td>{cartProduct.total}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)} >Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                
                <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
                </div>
                <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>

        </div>
       </div>
    
    </MainLayout>
  )
}

export default POSPage