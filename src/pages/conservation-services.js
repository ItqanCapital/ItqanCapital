import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Hero from '../components/Hero';
import Layout from "../components/layout";
import "../components/style/ConservationServices.css";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Seo from '../components/seo';
import axios from 'axios';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const ConservationServices = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  const fetchPageData = async () => {
    const baseUrl = 'https://itqan-strapi.softylus.com/api/pages/';
    const queryParams = `?filters[custom_slug][$eq]=conservation-services&locale=${locale}&populate[sections][populate][section_content][populate][subtitle][populate]=*`;
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
  const heroSection = attributes.sections.data.find(section => section.attributes.custom_slug === "conservation-services" && section.attributes.section_content[0].__component === "blocks.hero-section");
  const contentSection = attributes.sections.data.find(section => section.attributes.custom_slug === "conservation-services" && section.attributes.section_content[0].__component === "blocks.subtitle");

  return (
    <Layout>
      <Seo
        title={attributes.meta_title}
        description={attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={heroSection.attributes.section_content[0].title}
        subTitle={heroSection.attributes.section_content[0].subtitle}
      />
      <section className='Conservation-Services-card-sec'>
        <div className='Conservation-Services-card-container'>
          <div className='Conservation-Services-card-title'>
            <p>{contentSection.attributes.section_content[0].subtitle}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConservationServices;