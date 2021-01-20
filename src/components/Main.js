import React, {useEffect, useState} from 'react';
import '../components/Main.css';
import Product from './Product';
import homeImage from './img/1.png';
import Three from './img/3.jpg'; 
import Four from './img/4.jpg'; 
import Five from './img/5.jpg'; 
import Eight from './img/8.jpg'; 
import logo from './img/r.svg';

import {faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Main(props) {
    const [cart, setCart] = useState({
        number: localStorage.getItem('cart') ? localStorage.getItem('cart') : 0,
        ids: localStorage.getItem('cartIds') ? JSON.parse(localStorage.getItem('cartIds')) : [],
    });
    const [isHome, setIsHome] = useState(true);
    const [isIconClicked, setIsIconClicked]= useState(false);
    const [clear, setClear] = useState(localStorage.getItem('clear') ? JSON.parse(localStorage.getItem('clear')): false);
    const [modalStyle, setModalStyle] = useState({display:'none'});

    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [msg, setMsg] = useState("");
    const [successfulTransaction, setSuccessfulTransaction] = useState(false);
    
    const handleUserName=(e)=>{
        setUserName(e.target.value);
    }
    const handleUserPhoneNumber=(e)=>{
        setUserPhoneNumber(e.target.value);
    }
    const handleUserAddress=(e)=>{
        setUserAddress(e.target.value);
    }
    const userFormIncorrect = !userName.length>0 || !userPhoneNumber.length>0 || !userAddress.length>0;
    
    const userDetailsFormSubmission=(e)=>{
        e.preventDefault();
        if(userFormIncorrect){return setMsg("Some field(s) are empty.") };
        return setMsg("Successful!, Now you can Pay.");
    }
    const userPay=()=>{
        if(!userFormIncorrect){
            setSuccessfulTransaction(true);
            return setModalStyle({display:'block'});
        }
        return  setMsg("All/Some field(s) are empty.");
    }
    useEffect(()=>{
        setTimeout(()=>{ setMsg("") },3000)
    },[msg]);

    const productLists = [
        {
            id:1,
            productName: 'CANALETTO',
            price: 35,
            image: Five,
            qty:1
        },
        {
            id:2,
            productName: 'ICONA',
            price: 430,
            image: Eight,
            qty:1
        },
        {
            id:3,
            productName: 'FLEURS',
            price: 120,
            image: Three,
            qty:1
        },
        {
            id:4,
            productName: 'PALACIO DE MENADI',
            price: 30,
            image: Four,
            qty:1
        }
    ]
    const mainStyle= {
        display: 'flex',
        flexDirection: 'column',
        flexWrap:'wrap',
    }
    const productsStyle= {
        display: 'flex',
        justifyContent:'center',
        flexWrap:'wrap',
    } 

    function showShopPage(){
        setIsHome(!isHome);
    }
    useEffect(()=>{
        if(cart.ids.length >0){localStorage.setItem('cartIds', JSON.stringify(cart.ids)); }
    }, [cart.ids]);

    function parentCall(productId){
        localStorage.setItem('clear', false);
        localStorage.setItem('cart', parseInt(cart.number)+1);
        const isEmpty = checkIfEmpty(productId);
        if(!isEmpty){
            if(checkIfDuplicate(productId)){ return addPriceOfDuplicateProduct(productId); }
            let individualProduct = productLists.find(item=>{return item.id=== productId});
            return setCart({
                number: localStorage.getItem('cart'),
                ids: [...cart.ids, individualProduct]
            });
        }
        let individualProduct = productLists.find(item=>{return item.id=== productId});
        setCart({
            number: localStorage.getItem('cart'),
            ids: [...cart.ids, individualProduct]
        });
    }  
   const getList = productLists.map((product, index)=>{
       return (<Product key={index} productData={product}
                handleParentCall={parentCall} addCartButton={true}/>)
   });
   function checkIfEmpty(){
            const cartItems = cart.ids;
            if(cartItems.length === 0){return true;}
            return false;
    }
   function checkIfDuplicate(id){
        const cartItems = cart.ids;
        const isDuplicate = cartItems.some(item=>{ return item.id === id;})
        if(isDuplicate){return true;}
        return false;
   }
   function addPriceOfDuplicateProduct(productId){
        const cartItems = cart.ids;
        const canFindItem = cartItems.some((item)=>{return item.id === productId});
        if(canFindItem){
            let getSingleItem = cartItems.find(item=>{return item.id=== parseInt(productId)});
            getSingleItem.price *= 2;
            getSingleItem.qty +=1;
            //make a copy of the array, using slice
            const createCopy= cartItems.slice();
            //update the item 
            const getIndex =createCopy.findIndex((item)=>{return item.id ===getSingleItem.id});
            createCopy[getIndex] = getSingleItem;
            setCart({
                number: localStorage.getItem('cart'),
                ids: createCopy
            }) 
        } 
   }
   const handleOnclickCart=()=>{
       if(!cart.number>0){return alert("No Product Added to Cart.")}
        //display checkout page
        setIsIconClicked(!isIconClicked);
   }

   useEffect(()=>{
       if(!localStorage.getItem('clear')){
            localStorage.removeItem('cartIds');
            localStorage.removeItem('cart');
            setCart({ ids:[], number:0 });
       }
   },[clear]);

   const clearCart=()=>{
       localStorage.removeItem('clear');
       setClear(!clear);
       setIsIconClicked(false);
   }

   const productNameStyle = {
       fontSize:'17px'
   }
   const productPriceStyle ={
       fontSize:'13px',
       fontWeight:'bolder',
       marginTop: '18px'
   }

   const totalPrice = cart.ids.reduce((currentTotal,item)=>{return (item.price + currentTotal)},0);
  const formattedAmount=totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const closeModal=()=>{setModalStyle({display:'none'}); clearCart(); }
        
    return (
        <>
        <div className="outerNav">
           <div className="nav" >
                    <img onClick={showShopPage} src={logo} alt="wine glass" />
                    <p onClick={handleOnclickCart}>
                        <span>{cart.number}</span><FontAwesomeIcon icon={faShoppingBag} />
                    </p>
            </div>
        </div>
        
        {isHome ? <div  className="homePage">
                    
                    <div  className="homePageInner">
                        <div className='homeImage'>
                            <img src={homeImage} alt="wine bottle" />
                        </div>
                        <div className="desc">
                        <h1>Luxury Wines</h1>
                            <p>We sell wines made with perfection, and tastes like Heaven.
                                we would like you to experience this Heaven now.
                            </p>
                        </div>
                        
                        <button className="gotoshop" onClick={ showShopPage}>SHOP NOW!</button>
                    </div>
                </div> :
            isIconClicked 
                ?
                    <div className="checkOutPage">
                        {successfulTransaction && 
                              <div className="modal-successful"
                                 style={modalStyle}><div className="modal-content">
                                                        <p>
                                                            <span className="close" onClick={closeModal}>&times;</span>
                                                            {userName}, your transaction is Successful,<br/>
                                                            Your purchased items will be sent to the address at {userAddress}.
                                                            <br/>We'll also reach out to you on this line, {userPhoneNumber}, just in case.
                                                        </p>
                                                    </div>
                              </div>}
                        <div className="inner">
                            {JSON.parse(localStorage.getItem('cartIds')).map((item, index)=>{

                                return (<div key={index} style={{width: '150px'}}>
                                        <Product  
                                         productData={item}
                                         addCartButton={false}
                                         productNameStyle={productNameStyle}
                                         productPriceStyle={productPriceStyle}  />
                                    </div>)
                            })}
                        </div>
                        <div className="side">
                            <div className="side-inner">
                                <h1 className="total">TOTAL AMOUNT: ${formattedAmount}</h1>
                                <form onSubmit={userDetailsFormSubmission}>
                                {msg !=="" && <p className="Notification">{msg} </p>}
                                    <input type="text" 
                                      name="name" 
                                      value={userName} 
                                      placeholder="Your Full Name"
                                      onChange={handleUserName} />

                                    <input type="text"
                                      name="phoneNumber"
                                      value={userPhoneNumber}
                                      placeholder="Your Phone Number"
                                      onChange={handleUserPhoneNumber} />

                                    <input type="textarea"
                                      name="address" 
                                      value={userAddress}
                                      placeholder="Your Address"
                                      onChange={handleUserAddress} />

                                    <button type="submit">Add Details</button>
                                </form>
                                <button className="pay" onClick={userPay}>Pay for Items</button>
                                <button className="clearcart" onClick={clearCart}>Clear Cart</button>
                            </div>
                        </div>
                    </div>
                :
                    <div  className="Main" style={mainStyle}>
                        <div className='products' style={productsStyle}>
                            {getList}
                        </div>
                    </div>
        }
        </>
    )
}
export default Main
