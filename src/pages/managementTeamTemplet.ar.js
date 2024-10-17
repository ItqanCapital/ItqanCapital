import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/Team.css"; // Ensure you have a CSS file for styling
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';

const ManagementTeamTemplate = () => {
  const location = useLocation(); // Get the location object
  const params = new URLSearchParams(location.search); // Parse the query parameters
  const id = params.get('id'); // Get the 'id' parameter
  const { locale, changeLocale } = useLocalization();

  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://itqan-strapi.softylus.com/api/management-teams/${id}?populate=profileImage`, {
          headers: {
            'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        const data = await response.json();
        setTeamMember(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team member:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!teamMember) {
    return <p><FormattedMessage id="teamMemberNotFound" defaultMessage="Team member not found" /></p>;
  }

  const { attributes } = teamMember;
  const profileImageUrl = attributes.profileImage?.data?.attributes?.url
    ? `https://itqan-strapi.softylus.com${attributes.profileImage.data.attributes.url}`
    : '/default-profile.png';

  return (
    <Layout>
      <Seo
        title={`فريق إتقان - ${attributes.name} - شركة إتقان كابيتال`}
        description={attributes.description}
      />
      <ScrollToTopButton />
      <Hero title={<FormattedMessage id="managementTeamTitle" values={{ name: attributes.name }} />} />
      <section className='Team-sec'>
        <div className='Team-container'>
          <Link to={`/${locale}/management-team`}><button><FormattedMessage id="backButtonText" defaultMessage="Back" /><img src='/RA.png'/></button></Link>
          <div className='Team-card'>
            <img src={profileImageUrl} alt={attributes.name} />
            <div className='Team-card-info'>
              <h4>{attributes.name}</h4>
              <p>{attributes.position}</p>
              <p>{attributes.description}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ManagementTeamTemplate;
