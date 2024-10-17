import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout';
import ItqanC from '../components/ItqanC';
import Distinction from '../components/distinction';
import SecFooter from '../components/SecFooter';
import '../components/style/AboutUs.css';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import Seo from '../components/seo';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const AboutUS = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=about_us&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image`, {
          headers: {
            Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        setPageData(response.data.data[0].attributes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <Loader/>;
  }

  return (
    <Layout>
      <Seo
        title={pageData.meta_title}
        description={pageData.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={pageData.sections.data[0]?.attributes.section_content[0].title}
        subTitle={pageData.sections.data[0]?.attributes.section_content[0].subtitle}
      />
      <section className="who-are-we-sec">
        <div className="who-are-we-container">
          <div className="who-are-we-title">
            <h3>{pageData.sections.data[1]?.attributes.section_content[0].title}</h3>
            <p>
              {pageData.sections.data[1]?.attributes.section_content[0].subtitle.split('\n').map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <ItqanC />
        </div>
      </section>
      <Distinction />
      <SecFooter />
      <div className="sec-footer-background"></div>
    </Layout>
  );
};

export default AboutUS;
