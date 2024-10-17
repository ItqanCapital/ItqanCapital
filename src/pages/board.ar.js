import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';

const Board = ({ pageContext, location }) => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocalization();
  const currentLocale = pageContext.locale || locale;

  useEffect(() => {
    const fetchDirectors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://itqan-strapi.softylus.com/api/board-of-directors?populate=profileImage&locale=ar`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c',
            },
          }
        );
        const data = await response.json();
        setDirectors(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectors();
  }, [currentLocale]);

  // Function to generate localized URLs
  const getLocalizedUrl = (path) => {
    const urlParts = location.pathname.split('/').filter(Boolean);
    urlParts[0] = currentLocale;
    return '/' + urlParts.join('/') + path;
  };

  return (
    <Layout>
      <Seo
        title={
          currentLocale === 'ar'
            ? "فريق إتقان - مجلس الإدارة - شركة إتقان كابيتال"
            : "Itqan Team - Board of Directors - Itqan Capital"
        }
        description={
          currentLocale === 'ar'
            ? "تعرف على أعضاء مجلس الإدارة في شركة إتقان كابيتال، بما في ذلك العضو المنتدب والرئيس التنفيذي بسام هاشم السيد، واستفد من الخبرات والتخصصات الفريدة التي يجلبها كل فرد إلى الشركة."
            : "Learn about the Board of Directors at Itqan Capital, including Managing Director and CEO Bassam Hashim Al-Sayed, and benefit from the unique expertise and specializations each individual brings to the company."
        }
      />
      <ScrollToTopButton />
      <section className="Board-hero-sec">
        <div className="Board-hero-container">
          <div className="Board-hero-title">
            <h1>
              <FormattedMessage id="boardTitle" />
            </h1>
            <p>
              <FormattedMessage id="boardaboutUs" />
            </p>
          </div>
        </div>
      </section>
      <section className="director-card-sec">
        <h3>
          <FormattedMessage id="boardOfDirectors" />
        </h3>
        <div className="director-card-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            directors.map((director) => {
              const profileImageUrl =
                director.attributes.profileImage?.data?.attributes?.formats
                  ?.small?.url ||
                '/default-profile.png';
              return (
                <Link
                  key={director.id}
                  to={getLocalizedUrl(`?id=${director.id}`)}
                  className="director-card"
                >
                  <img
                    src={`https://itqan-strapi.softylus.com${profileImageUrl}`}
                    alt={director.attributes.name}
                  />
                  <div className="director-card-info">
                    <h4>{director.attributes.name}</h4>
                    <p>{director.attributes.position}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Board;