import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const Board = ({ pageContext, location }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocalization();
  const currentLocale = pageContext.locale || locale;

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=board&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c',
            },
          }
        );
        const data = await response.json();
        setPageData(data.data[0]);
        console.log("aaaaaa",data.data[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [currentLocale]);

  // Function to generate localized URLs
  const getLocalizedUrl = (path) => {
    const urlParts = location.pathname.split('/').filter(Boolean);
    urlParts[0] = currentLocale;
    return '/' + urlParts.join('/') + path;
  };

  if (loading) {
    return <Loader/>;
  }

  if (!pageData) {
    return <p>No data available</p>;
  }

  const sections = pageData.attributes.sections.data;
  const heroSection = sections.find(section => section.attributes.custom_slug === "board" && section.attributes.section_content[0].__component === "blocks.hero-section");
  const boardSection = sections.find(section => section.attributes.custom_slug === "board" && section.attributes.section_content[0].__component === "blocks.itqan-capital-members");

  const directors = boardSection?.attributes.section_content[0].Board_of_Directors_card || [];

  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <section className="Board-hero-sec">
        <div className="Board-hero-container">
          <div className="Board-hero-title">
            <h1>{heroSection?.attributes.section_content[0].title}</h1>
            <p>{heroSection?.attributes.section_content[0].subtitle}</p>
          </div>
        </div>
      </section>
      <section className="director-card-sec">
        <h3>{boardSection?.attributes.section_content[0].title}</h3>
        <div className="director-card-container">
          {directors.map((director) => {
            const profileImageUrl = director.image?.data?.attributes?.formats?.small?.url || '/default-profile.png';
            return (
              <Link
              key={director.id}
              to={`../team?slug=${director.slug}`}
              className="director-card"
            >
                <img
                  src={`https://itqan-strapi.softylus.com${profileImageUrl}`}
                  alt={director.name}
                />
                <div className="director-card-info">
                  <h4>{director.name}</h4>
                  <p>{director.position}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Board;