import React, { useState, useEffect } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/ClientAwareness.css";
import { Link } from "gatsby";
import Seo from '../components/seo';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const SecurityCard = ({ title, hoverTitle, pdfLink, imageSrc, hoverImageSrc }) => {
  const [content, setContent] = useState(title);
  const [imgSrc, setImgSrc] = useState(imageSrc);
  const handleMouseEnter = () => {
    setContent(hoverTitle);
    setImgSrc(hoverImageSrc);
  };
  const handleMouseLeave = () => {
    setContent(title);
    setImgSrc(imageSrc);
  };
  return (
    <Link target="_blank" to={pdfLink}>
      <div 
        className='Reports-data-single-card security-single-card'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          <img src={imgSrc} alt="" />
          <p>{content}</p>
      </div>
    </Link>
  );
};
const ClientAwareness = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=client-awareness&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`,
          {
            headers: {
              Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
            }
          }
        );
        setPageData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  if (!pageData) {
    return <Loader/>;
  }
  const heroSection = pageData.attributes.sections.data.find(
    section => section.attributes.section_content[0].__component === 'blocks.hero-section'
  );
  const securityCards = pageData.attributes.sections.data.find(
    section => section.attributes.section_content[0].__component === 'blocks.security-card'
  );
  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={heroSection.attributes.section_content[0].title}
        subTitle={heroSection.attributes.section_content[0].subtitle}
      />
      <section className='Reports-data-sec'>
        <div className='Reports-data-container'>
          <div className='Reports-data-title'>
            {/* Add translated title here if needed */}
          </div>
          <div className='Reports-data-cards security-cards'>
            {securityCards.attributes.section_content.map((card, index) => (
              <SecurityCard
                key={index}
                title={card.title}
                hoverTitle={card.hover_title}
                pdfLink={card.Pdf_link}
                imageSrc={`https://itqan-strapi.softylus.com${card.image.data.attributes.url}`}
                hoverImageSrc={`https://itqan-strapi.softylus.com${card.hover_image.data.attributes.url}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ClientAwareness;