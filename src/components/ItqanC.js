import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import "./style/ItqanC.css";
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const ItqanC = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      const token = '848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c';
      const baseUrl = `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][points][populate]=*&locale=${locale}&populate=title_icon`;
      
      try {
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPageData(data.data[0]); // Assuming you only expect one page of data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <Loader/>;
  }

  const section = pageData.attributes.sections.data[3];
  console.log("test",section.attributes.section_content[0].points)
  const points = section.attributes.section_content[0].points || []; // Ensure points is defined

  return (
    <section className='itqan-c-section'>
      <div className='itqan-c-container'>
        <div className='itqan-c-content'>
          <h2>{section.attributes.section_content[0].title}</h2>
          <div className='itqan-c-line'></div>
          <p>{section.attributes.section_content[0].subtitle}</p>
          {points.map((point) => (
            <div key={point.id} className='itqan-c-text'>
              <h6><img src={`https://itqan-strapi.softylus.com${point.title_icon.data.attributes.url}`} alt={point.title_icon.data.attributes.name} /><FormattedMessage id={point.title} /></h6>
              {point.subtitle.map((sub, index) => (
                <div key={index}>
                  {sub.type === 'paragraph' && (
                    <p>{sub.children.map((child, idx) => (
                      <React.Fragment key={idx}>{child.text}</React.Fragment>
                    ))}</p>
                  )}
                    <ul>
                    {sub.type === 'list' && (
                      <>
                        {sub.children.map((item, idx) => (
                          <li key={idx}>
                            <p>
                              {item.children.map((child, cIdx) => (
                                <React.Fragment key={cIdx}>{child.text}</React.Fragment>
                              ))}
                            </p>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                      </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItqanC;
