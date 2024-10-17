import React, { useState, useEffect, useRef } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import AnnouncementsBox from '../components/AnnouncementsBox';
import "../components/style/Announcements.css";
import Seo from '../components/seo';
import { Player } from '@lottiefiles/react-lottie-player';
import loaderl from "../Json/loaderl.json";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';

const Announcements = () => {
  const { locale } = useLocalization();
  const [announcements, setAnnouncements] = useState([]);
  const [Data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][%24eq]=announcements&locale=${locale}&populate[sections][populate][section_content][populate][subtitle][populate]=*&populate=image`, {
          headers: {
            'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        const data = await response.json();
        console.log("daty",data.data[0].attributes)
        const Data =data.data[0].attributes;
        setData(Data);
        const announcementsData = data.data[0].attributes.sections.data[0].attributes.section_content[0].subtitle;
        setAnnouncements(announcementsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const renderAnnouncementContent = (content) => {
    return content.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index}>
            {block.children.map((child, idx) => {
              if (child.type === 'text') {
                return (
                  <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.text}
                  </span>
                );
              } else if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url}>
                    {child.children.map((linkChild, linkIdx) => (
                      <span key={linkIdx}>{linkChild.text}</span>
                    ))}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <Layout>
      <Seo
        title={Data.meta_title}
        description={Data.meta_description}
      />
      <ScrollToTopButton />
      <Hero title={Data.page_title} />
      <section className='Announcements-sec'>
        <div className='Announcements-container'>
          <div className='Announcements-content'>
            <h3>{Data.page_title}</h3>
            {loading ? (
              <div ref={loaderRef} style={{ height: '100px', margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
                <Player autoplay loop src={loaderl} style={{ height: '100px', width: '100px' }} />
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <AnnouncementsBox
                  key={index}
                  p1={renderAnnouncementContent(announcement.subtitle)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;