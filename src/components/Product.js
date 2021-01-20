import React from 'react';
import './Product.css';

function Product(props) {

    const handleCartButton = ()=>{
        //passing data from child to parent
        props.handleParentCall(props.productData.id);
    }

    return (
        <div className='product'>
            <div className="productInner">
                <img src={props.productData.image} alt="product_img" />
                 <div className="join">
                     <h3 style={props.productNameStyle} 
                        className="productName">{props.productData.productName}
                     </h3>
                    <p style={props.productPriceStyle}
                       className="price">${props.productData.price} {props.productData.qty>1 &&
                                                `| ${props.productData.qty} Items in Cart`} </p>
                 </div>
                {props.addCartButton && <button onClick={handleCartButton}>Add to Cart</button>}
                
            </div>
        </div>
    )
}

export default Product