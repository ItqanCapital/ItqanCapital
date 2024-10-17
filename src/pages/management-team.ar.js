import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/Directors.css";
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';

const ManagementTeam = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale, changeLocale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://itqan-strapi.softylus.com/api/management-teams?populate=profileImage&locale=ar`, {
          headers: {
            'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        const data = await response.json();
        setDirectors(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching directors:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Seo
        title="فريق إتقان - مجلس الإدارة - شركة إتقان كابيتال"
        description="تعرف على أعضاء مجلس الإدارة في شركة إتقان كابيتال، بما في ذلك العضو المنتدب والرئيس التنفيذي بسام هاشم السيد، واستفد من الخبرات والتخصصات الفريدة التي يجلبها كل فرد إلى الشركة."
      />
      <ScrollToTopButton />
      <section className='Board-hero-sec'>
        <div className='Board-hero-container'>
          <div className='Board-hero-title'>
            <h1><FormattedMessage id="managementTeamHeading" /></h1>
            <p><FormattedMessage id="managementTeamSubtitle" /></p>
          </div>
        </div>
      </section>
      <section className='director-card-sec'>
        <h3><FormattedMessage id="managementTeamSectionTitle" /></h3>
        <div className='director-card-container'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            directors.map((director) => {
              const profileImageUrl = director.attributes.profileImage?.data?.attributes?.formats?.small?.url
                ? `https://itqan-strapi.softylus.com${director.attributes.profileImage.data.attributes.formats.small.url}`
                : '/default-profile.png'; // Use a default image if profile image is not available

              return (
                <Link key={director.id} to={`/managementTeamTemplet?id=${director.id}`} className='director-card'>
                  <img src={profileImageUrl} alt={director.attributes.name} />
                  <div className='director-card-info'>
                    <h4>{director.attributes.name}</h4>
                    <p>{director.attributes.position}</p>
                    {/* <p>{director.attributes.description}</p> */}
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

export default ManagementTeam;
