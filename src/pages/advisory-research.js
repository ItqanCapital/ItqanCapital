import React, { useState, useEffect } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import Seo from '../components/seo';
import "../components/style/ConservationServices.css";
import axios from 'axios';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const AdvisoryResearch = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  const fetchPageData = async () => {
    const baseUrl = 'https://itqan-strapi.softylus.com/api/pages/';
    const queryParams = `?filters[custom_slug][$eq]=advisory-research&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`;
    const token = '848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c';

    try {
      const response = await axios.get(baseUrl + queryParams, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data[0];
    } catch (error) {
      console.error('Error fetching page data:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPageData().then(data => setPageData(data));
  }, [locale]);

  if (!pageData) return <Loader/>;

  const { attributes } = pageData;
  const contentSection = attributes.sections.data[0].attributes.section_content[0];

  // Function to add line breaks
  const addLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <Seo
        title={attributes.meta_title}
        description={attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero title={attributes.page_title} />
      <div className='Contact-footer-section-wallpaper'>
        <section className='AdvisoryResearch-sec'>
          <div className='AdvisoryResearch-card-title'>
            {/* Title section, if any */}
          </div>
          <div className='AdvisoryResearch-container'>
            <div className='AdvisoryResarch-img'>
              <img src={`https://itqan-strapi.softylus.com${contentSection.image.data.attributes.url}`} alt={contentSection.title} />
            </div>
            <div className='AdvisoryResarch-info'>
              <h1>{contentSection.title}</h1>
              <p>{addLineBreaks(contentSection.subtitle)}</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdvisoryResearch;