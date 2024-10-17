import React, { useState, useEffect, useRef } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import AnnouncementsBox from '../components/AnnouncementsBox';
import AnnouncementsData from "../Json/AnnouncementsData.json";
import "../components/style/Announcements.css";
import Seo from '../components/seo';
import { Player } from '@lottiefiles/react-lottie-player';
import loaderl from "../Json/loaderl.json";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';

const Announcements = () => {
  const { locale, changeLocale } = useLocalization();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://itqan-strapi.softylus.com/api/announcements?locale=${locale}`, {
          headers: {
            'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
          }
        });
        const data = await response.json();
        setAnnouncements(data.data); // Adjust according to the structure of your response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
        title="إعلانات صندوق إتقان  للمرابحات والصكوك - إتاحة البيان ربع سنوي للفترة المنتهية في 31/12/2023م"
        description="اطّلع على إعلانات شركة إتقان كابيتال بشأن صندوق إتقان  للمرابحات والصكوك، بما في ذلك إتاحة البيان الربع سنوي للفترة المنتهية في 31 ديسمبر 2023م، واحصل على نسخة من البيان من خلال الضغط هنا."
      />
      <ScrollToTopButton />
      <Hero title={<FormattedMessage id= "announcements" />} />
      <section className='Announcements-sec'>
        <div className='Announcements-container'>
          <div className='Announcements-content'>
            <h3><FormattedMessage id="announcements" /></h3>
            {loading ? (
              <div ref={loaderRef} style={{ height: '100px', margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
                <Player autoplay loop src={loaderl} style={{ height: '100px', width: '100px' }} />
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <AnnouncementsBox
                  key={index}
                  p1={renderAnnouncementContent(announcement.attributes.announcements)}
                />
              ))
            )}

            {/* {loading && (
              <div ref={loaderRef} style={{ height: '100px', margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
                <Player autoplay loop src={loaderl} style={{ height: '100px', width: '100px' }} />
              </div>
            )} */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;
