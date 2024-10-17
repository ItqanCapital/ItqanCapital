import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/Team.css";
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const Team = ({ pageContext }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug');
    const { locale } = useLocalization();
    const currentLocale = pageContext.locale || locale;

    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=board&locale=${currentLocale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c',
                        },
                    }
                );
                const data = await response.json();
                setPageData(data.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentLocale]);

    if (loading) {
        return <Loader/>;
    }

    if (!pageData) {
        return <p><FormattedMessage id="notFoundMessage" /></p>;
    }

    const sections = pageData.attributes.sections.data;
    const heroSection = sections.find(section => section.attributes.section_content[0].__component === "blocks.hero-section");
    const boardSection = sections.find(section => section.attributes.section_content[0].__component === "blocks.itqan-capital-members");

    const teamMember = boardSection?.attributes.section_content[0].Board_of_Directors_card.find(member => member.slug === slug);

    if (!teamMember) {
        return <p><FormattedMessage id="notFoundMessage" /></p>;
    }

    const profileImageUrl = teamMember.image?.data?.attributes?.formats?.small?.url
        ? `https://itqan-strapi.softylus.com${teamMember.image.data.attributes.formats.small.url}`
        : '/default-profile.png';

    return (
        <Layout>
            <Seo
                title={`فريق إتقان - ${teamMember.name} - شركة إتقان كابيتال`}
                description={teamMember.subtitle}
            />
            <ScrollToTopButton />
            <Hero title={heroSection?.attributes.section_content[0].title} />
            <section className='Team-sec'>
                <div className='Team-container'>
                    <Link to={`/${currentLocale}/board`}><button><FormattedMessage id="backButton" /><img src='/RA.png' alt="RA" /></button></Link>
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

export default Team;