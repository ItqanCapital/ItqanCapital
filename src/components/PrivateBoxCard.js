import React from 'react'
import "./style/PrivateBoxCard.css"
import { Link } from "gatsby"
import { useLocalization } from '../context/LocalizationContext';

const PrivateBoxCard = ({title,imgSrc,subtitle,Button,size,backgroundColor,spaceP,link,hidebutton}) => {
  const { locale } = useLocalization();

  return (
    <div className='PrivateBoxCard-sec'>
    <div className={`PrivateBoxCard-container ${backgroundColor}`}>
          <div className='PrivateBoxCard-image'>
            <img src={imgSrc}/>
          </div>
          <div className='PrivateBoxCard-title'>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <p style={{paddingTop:spaceP}}>{size}</p>
            <Link to={`/${locale}/${link}`}> <button style={{ display: hidebutton ? 'none' : 'inline-block' }}>
              {Button}
            </button></Link>
            </div>
        </div>
    </div>
  )
}

export default PrivateBoxCard
