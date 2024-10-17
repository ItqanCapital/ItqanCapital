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
    'Rectangle%201-min.png',
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

    const intervalId = setInterval(changeBackground, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <ScrollToTopButton />
      <section className="hero-homepage-sec" style={{ backgroundImage: `url(../../static/${currentBackground})` }}>
        <div className="hero-homepage-container">
          <div className="hero-homepage-content">
            <span><img src="/Isolation_Mode.svg" /> <FormattedMessage id="itqan_capital" /><img src="/Isolation_Mode.svg" /></span>
            <h1><img src="/Vector.svg" /> <FormattedMessage id="trusted_investment_leaders" /></h1>
            <p><FormattedMessage id="itqan_description" /></p>
            <Link to="/Individuals-login">
              <div className="button-wrapper"><button> <img src="/Vector1.svg" /><div className='z-index'><FormattedMessage id="create_new_account" /></div></button> </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="products-sec">
        <div className="products-container">
          <h1><FormattedMessage id="itqan_products" /></h1>
          <p><FormattedMessage id="financial_services" /></p>
          <div className="products-content">
            <div className="products-single">
              <Link to="/asset-management"><button><img src="/Control Panel Icon.png" /><FormattedMessage id="asset_management" /></button></Link>
            </div>
            <div className="products-single">
              <Link to="/Investment-banking"><button><img src="/Consultation.png" /><FormattedMessage id="investment_banking_services" /></button></Link>
            </div>
            <div className="products-single">
              <Link to="/conservation-services"><button><img src="/Examination.png" /><FormattedMessage id="conservation_services" /></button></Link>
            </div>
            <div className="products-single">
              <Link to="/advisory-research"> <button><img src="/Reporting.png" /><FormattedMessage id="wealth_management" /></button></Link>
            </div>
            <div className="products-single">
              <Link to='/Individuals-login'> <button><img src="/New Account.png" /><FormattedMessage id="open_new_account" /></button></Link>
            </div>
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
                  <th><FormattedMessage id="annual_performance_average" /></th>
                  <th><FormattedMessage id="evaluation_days" /></th>
                  <th><FormattedMessage id="evaluation_date" /></th>
                  <th><FormattedMessage id="current_unit_price" /></th>
                  <th><FormattedMessage id="fund_name" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3.81</td>
                  <td><FormattedMessage id="daily" /></td>
                  <td>10/01/2024</td>
                  <td>SAR 13.9661</td>
                  <td className='box-name'><FormattedMessage id="murabaha_sukuk_fund" /> <img src='/Frame 1.png' /></td>
                </tr>
                <tr>
                  <td>1.93</td>
                  <td><FormattedMessage id="monday_wednesday" /></td>
                  <td>10/01/2024</td>
                  <td>SAR 16.7911</td>
                  <td className='box-name'><FormattedMessage id="saudi_equity_fund" /> <img src='/Frame 1.png' /></td>
                </tr>
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

export const Head = () => (
  <Seo
    title="إتقان كابيتال - رواد الاستثمار الإسلامي في السوق المالي السعودي"
    description="استكشف خدمات إتقان كابيتال المتوافقة مع الشريعة الإسلامية، بما في ذلك إدارة الأصول، الخدمات المصرفية الاستثمارية، وخدمات الحفظ. انضم إلينا لتحقيق التميز في استثماراتك بالسوق المالي السعودي ودول مجلس التعاون الخليجي."
  />
);

export default Index;
