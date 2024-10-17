import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import "../components/style/Directors.css";
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const ManagementTeam = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocalization();

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

  const heroSection = pageData.attributes.sections.data.find(section => 
    section.attributes.section_content.some(content => content.__component === "blocks.hero-section")
  );

  const managementTeamSection = pageData.attributes.sections.data.find(section => 
    section.attributes.section_content.some(content => content.__component === "blocks.itqan-capital-members")
  );

  const heroContent = heroSection?.attributes.section_content.find(content => content.__component === "blocks.hero-section");
  const managementTeamContent = managementTeamSection?.attributes.section_content.find(content => content.__component === "blocks.itqan-capital-members");

  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <section className='Board-hero-sec'>
        <div className='Board-hero-container'>
          <div className='Board-hero-title'>
            <h1>{heroContent?.title}</h1>
            <p>{heroContent?.subtitle}</p>
          </div>
        </div>
      </section>
      <section className='director-card-sec'>
        <h3>{managementTeamContent?.title}</h3>
        <div className='director-card-container'>
          {managementTeamContent?.Board_of_Directors_card.map((member) => {
            const profileImageUrl = member.image?.data?.attributes?.formats?.small?.url
              ? `https://itqan-strapi.softylus.com${member.image.data.attributes.formats.small.url}`
              : '/default-profile.png';

            return (
              <Link key={member.id} to={`../managementTeamTemplet?slug=${member.slug}`} className='director-card'>
                <img src={profileImageUrl} alt={member.name} />
                <div className='director-card-info'>
                  <h4>{member.name}</h4>
                  <p>{member.position}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default ManagementTeam;