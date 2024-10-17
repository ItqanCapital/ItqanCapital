import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import "./style/distinction.css";
import { useLocalization } from '../context/LocalizationContext';

const Distinction = () => {
  const [cardsData, setCardsData] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image`, {
          headers: {
            Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c',
          },
        });
        // Assuming response structure matches the provided API format
        console.log("API Response:", response.data);

        const pageData = response.data?.data[0].attributes;
        console.log("title sec:",response.data.data[0].attributes.sections.data[4].attributes.section_content[0].title)
        setPageTitle(response.data.data[0].attributes.sections.data[4].attributes.section_content[0].title);

        // Extracting single card data from sections
        const singleCardData = pageData.sections.data.find(section => section.attributes.custom_slug === 'Company_Values_Spotlight');
        if (singleCardData) {
          const cards = singleCardData.attributes.section_content[0].single_card;
          setCardsData(cards);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='distinguishes-sec'>
      <div className='distinguishes-container'>
        <div className='distinguishes-title'>
          <h1>{pageTitle}</h1>
        </div>
        <div className='distinguishes-card'>
        {cardsData.map((card, index) => {
            console.log("Card Data:", card); // <-- Console log added here
            return (
              <div className='distinguishes-single-card' key={index}>
                <img src={`https://itqan-strapi.softylus.com${card.image.data.attributes.url}`} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Distinction;
