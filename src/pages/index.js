import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { FormattedMessage } from 'react-intl';
import * as styles from '../components/style/index.module.css';
import '../components/style/index.css';
import ItqanC from '../components/ItqanC';
import Distinction from '../components/distinction';
import SecFooter from '../components/SecFooter';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useLocalization } from '../context/LocalizationContext';

const SecurityCard = ({ defaultContent, hoverContent, defaultImgSrc, hoverImgSrc }) => {
  const [content, setContent] = useState(defaultContent);
  const [imgSrc, setImgSrc] = useState(defaultImgSrc);

  const handleMouseEnter = () => {
    setContent(hoverContent);
    setImgSrc(hoverImgSrc);
  };

  // Revert to default content and image source when not hovered
  const handleMouseLeave = () => {
    setContent(defaultContent);
    setImgSrc(defaultImgSrc);
  };

  return (
    <div
      className="Reports-data-single-card security-single-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imgSrc} alt="" />
      <p>{content}</p>
    </div>
  );
};

const Index = () => {
  const { locale } = useLocalization();
  const [pageData, setPageData] = useState(null);
  
  useEffect(() => {
    fetch(`https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][Itqan_capital_products_button][populate]=*&populate=button_title_icon&locale=${locale}`, {
      headers: {
        Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
      }
    })
    .then(response => response.json())
    .then(data => setPageData(data.data[0].attributes))
    .catch(error => console.error('Error fetching data:', error));
  }, [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.products-single').forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const backgrounds = [
    'JeddahCORNICHE.jpg',
    'homeBg.png',
    'Rectangle%203-minn.png',
  ];

  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);
  const [opacity, setOpacity] = useState(1); // Start with full opacity

  useEffect(() => {
    const changeBackground = () => {
      setOpacity(0);

      setTimeout(() => {
        setCurrentBackground((prev) => {
          const index = backgrounds.indexOf(prev);
          return backgrounds[(index + 1) % backgrounds.length];
        });

        setOpacity(1);
      }, 500); // Adjust timing to match CSS transition time
    };

    const intervalId = setInterval(changeBackground, 6000);

    return () => clearInterval(intervalId);
  }, []);
  const products = pageData?.sections?.data[2]?.attributes?.section_content?.[0].Itqan_capital_products_button;
  console.log("products",products)
  return (
    <Layout>
      <Seo
      title={pageData ? pageData.meta_title : "Loading..."}
      description={pageData ? pageData.meta_description : "Loading..."}
    />
      <ScrollToTopButton />
      <section className="hero-homepage-sec" style={{ backgroundImage: `url(/${currentBackground})` }}>
        <div className="hero-homepage-container">
          <div className="hero-homepage-content">
            <span><img src="/Isolation_Mode.svg" /> {pageData && pageData.sections.data[0].attributes.section_content[0].hero_itqan_title_span}<img src="/Isolation_Mode.svg" /></span>
            <h1><img src="/Vector.svg" /> {pageData && pageData.sections.data[0].attributes.section_content[0].title}</h1>
            <p>{pageData && pageData.sections.data[0].attributes.section_content[0].subtitle}</p>
            <Link to={`/${locale}/Individuals-login`}>
              <div className="button-wrapper"><button> <img src="/Vector1.svg" /><div className='z-index'>{pageData && pageData.sections.data[0].attributes.section_content[0].button_text}</div></button> </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="products-sec">
        <div className="products-container">
          <h1>{pageData?.sections?.data[2]?.attributes?.section_content?.[0].title}</h1>
          <p>{pageData?.sections?.data[2]?.attributes?.section_content?.[0].subtitle}</p>
          <div className="products-content">
          {products?.map((product, index) => (
          <div className="products-single" key={index}>
            <Link to={`/${locale}/${product.button_link}`}>
              <button>
              <img src={`https://itqan-strapi.softylus.com${product.button_title_icon?.data?.attributes?.url}`} alt={product.button_title_icon?.data?.attributes?.name || ''} />
              <FormattedMessage id={product.button_title} />
              </button>
            </Link>
          </div>
        ))}
          </div>
          <ItqanC />
        </div>
      </section>
      <Distinction />
      <section className="exchange-rates-section">
        <div className="exchange-rates-container">
          <h2><FormattedMessage id="fund_performance" /></h2>
          <div className='exchange-rate-card' >
            <table>
              <thead>
                <tr>
                  <th><FormattedMessage id="annual_performance_average" />{pageData && pageData.sections.data[0].attributes.section_content[0].annual_performance_average}</th>
                  <th><FormattedMessage id="evaluation_days" />{pageData && pageData.sections.data[0].attributes.section_content[0].evaluation_days}</th>
                  <th><FormattedMessage id="evaluation_date" />{pageData && pageData.sections.data[0].attributes.section_content[0].evaluation_date}</th>
                  <th><FormattedMessage id="current_unit_price" />{pageData && pageData.sections.data[0].attributes.section_content[0].current_unit_price}</th>
                  <th><FormattedMessage id="fund_name" />{pageData && pageData.sections.data[0].attributes.section_content[0].fund_name}</th>
                </tr>
              </thead>
              <tbody>
              {pageData && pageData.sections.data[1].attributes.section_content.slice(1).map((item, index) => (
                <tr key={index}>
                  <td>{item.annual_performance_average}</td>
                  <td>{item.evaluation_days}</td>
                  <td>{item.evaluation_date}</td>
                  <td>{item.current_unit_price}</td>
                  <td className='box-name'>{item.fund_name} <img src='/Frame 1.png' /></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div className='space-homepage'></div>
      <SecFooter />
      <div className='sec-footer-background'></div>
    </Layout>
  );
};



export default Index;
