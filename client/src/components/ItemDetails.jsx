import React from 'react';
import "../styles/itemDetails.css"

export default function ItemDetails(props) {
    
    
    if(!props.display){
        return null;
    }
    const {name, description, image, category, quantity, address, id_user} = props.item
    return (
        <div className="info-card_container">
            <a className="close-link" onClick={props.handleClose}>Close</a>
            <div className="round_image">
                <img src={image} alt="Item"/>
            </div>
            <h2 className="info-card_title">{name}</h2>
            <div className="info-card_info">
                <span>Quantity: {quantity} | {category}</span>
            </div>
            <p>{description}</p>
            <p>{address}</p>
            <div className="user_info">
                <div className="round_image_user">
                    <img src={id_user.profileImg} alt="User"/>
                </div>
                <span>Given away by {id_user.firstName}</span>
            </div>
            <div className="contact_information">
                Contact {id_user.firstName} at <b>{id_user.email}</b>
            </div>
        </div>
    )
}
