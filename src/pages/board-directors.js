import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../components/layout";
import Hero from '../components/Hero';
import "../components/style/index.css";
import { FormattedMessage } from 'react-intl';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Seo from '../components/seo';
import { useLocalization } from '../context/LocalizationContext';

const BoardDirectors = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [data, setdata] = useState('');
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=board-directors&populate[sections][populate][section_content][populate]=*&locale=${locale}&populate=image`,
          {
            headers: {
              Authorization: `Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c`
            }
          }
        );
        console.log("aaaa",response.data.data[0].attributes)
        const sections = response.data.data[0].attributes.sections.data;
        setdata(response.data.data[0].attributes)
        if (sections.length > 0) {
          const imageData = sections[0].attributes.section_content[0].image.data.attributes.url;
          setImageUrl(`https://itqan-strapi.softylus.com${imageData}`);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <Layout>
      <Seo
        title={data.meta_title}
        description={data.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={data.page_title}
      />
      <section className='BoardDirectors-sec'>
        {imageUrl ? <img src={imageUrl} alt="Organizational Structure" /> : <p>Loading...</p>}
      </section>
    </Layout>
  );
}

export default BoardDirectors;
