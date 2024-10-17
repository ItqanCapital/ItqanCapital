import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import ScrollToTopButton from '../components/ScrollToTopButton';
import "../components/style/Team.css";
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const ManagementTeamTemplate = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const { locale } = useLocalization();

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=management-team&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`, {
          headers: {
            'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        const data = await response.json();
        setPageData(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <Loader/>;
  }

  if (!pageData) {
    return <p>No data available</p>;
  }

  const managementTeamSection = pageData.attributes.sections.data.find(section => 
    section.attributes.section_content.some(content => content.__component === "blocks.itqan-capital-members")
  );

  const managementTeamContent = managementTeamSection?.attributes.section_content.find(content => content.__component === "blocks.itqan-capital-members");

    const teamMember = managementTeamContent?.Board_of_Directors_card.find(member => member.slug === slug);

  if (!teamMember) {
    return <p><FormattedMessage id="teamMemberNotFound" defaultMessage="Team member not found" /></p>;
  }

  const profileImageUrl = teamMember.image?.data?.attributes?.formats?.small?.url
    ? `https://itqan-strapi.softylus.com${teamMember.image.data.attributes.formats.small.url}`
    : '/default-profile.png';

  return (
    <Layout>
      <Seo
        title={`${pageData.attributes.meta_title} - ${teamMember.name}`}
        description={teamMember.subtitle}
      />
      <ScrollToTopButton />
      <section className='Board-hero-sec'>
        <div className='Board-hero-container'>
          <div className='Board-hero-title'>
            <h1>{teamMember.name}</h1>
            <p>{teamMember.position}</p>
          </div>
        </div>
      </section>
      <section className='Team-sec'>
        <div className='Team-container'>
          <Link to={`/${locale}/management-team`}>
            <button><FormattedMessage id="backButtonText" defaultMessage="Back" /><img src='/RA.png' alt="Back"/></button>
          </Link>
          <div className='Team-card'>
            <img src={profileImageUrl} alt={teamMember.name} />
            <div className='Team-card-info'>
              <h4>{teamMember.name}</h4>
              <p>{teamMember.position}</p>
              <p>{teamMember.subtitle}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ManagementTeamTemplate;