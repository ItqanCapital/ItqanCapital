import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/style/AssetManagement.css"
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import InfoPanel from '../components/InfoPanel';
import AccordionsV2 from '../components/AccordionV2';
import PrivateBox from '../components/PrivateBoxCard';
import PrivateBoxData from "../Json/PrivateBoxData.json"
import PrivateBoxDataen from "../Json/PrivateBoxDataen.json"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Seo from '../components/seo';
import { useLocalization } from '../context/LocalizationContext';
import { FormattedMessage } from 'react-intl';
import Loader from '../components/loader';

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="btn-sliider">
      <button onClick={() => swiper.slidePrev()} style={{ transform: "rotate(180deg)" }}>
        <img src='/arrow-circle-right.png' alt="Previous Slide" />
      </button>
      <button onClick={() => swiper.slideNext()} className=''>
        <img src='/arrow-circle-right.png' alt="Next Slide" />
      </button>
    </div>
  )
}

const AssetManagement = () => {
  const [activeButton, setActiveButton] = useState("stock");
  const { locale } = useLocalization();
  const [pageData, setPageData] = useState(null);
  const [content, setContent] = useState(<div>Loading...</div>);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://itqan-strapi.softylus.com/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
          {
            headers: {
              Authorization: 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c'
            }
          }
        );
        setPageData(response.data.data[0].attributes);
        setIsDataReady(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setContent(<div>Error loading data. Please try again later.</div>);
      }
    };

    fetchData();
  }, [locale]);

  useEffect(() => {
    if (isDataReady) {
      handleStockFundsClick();
    }
  }, [isDataReady]);

  const setInitialContent = (data) => {
    const sections = data?.sections?.data || [];
    const relevantSection = sections.find(section => 
      section.attributes?.section_content?.[0]?.Content?.[0] &&
      section.attributes?.section_content?.[0]?.accordion_link
    );

    if (!relevantSection) {
      console.error('No relevant section found');
      return null;
    }

    const sectionContent = relevantSection.attributes.section_content[0];
    const murabahaContent = sectionContent.Content[0];
    const imageUrl = murabahaContent?.image?.data?.attributes?.url
      ? `https://itqan-strapi.softylus.com${murabahaContent.image.data.attributes.url}`
      : "/Frame 136.png";
    const paragraphContent = murabahaContent?.subtitle
      ? murabahaContent.subtitle.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && (
              <>
                <br />
                <span></span>
              </>
            )}
          </React.Fragment>
        ))
      : null;
    const accordionItems = sectionContent.accordion_link || [];

    return { murabahaContent, imageUrl, paragraphContent, accordionItems };
  };

  const setContentFromData = ({ murabahaContent, imageUrl, paragraphContent, accordionItems }) => {
    setContent(
      <>
        <div className="buttons-container buttons-container-private">
          <button
            
            onClick={handlePortfolioSaudiEquityFund}
          >
            <FormattedMessage id="private_equity_fund" defaultMessage="Private Equity Fund" />
          </button>
          <button
            className={activeButton === "portfolio" ? "active" : "active"}
            onClick={handlePortfolioMurabahaandSukukFund}
          >
            <FormattedMessage id="murabaha_sukuk_fund" defaultMessage="Murabaha and Sukuk Fund" />
          </button>
        </div>
        <InfoPanel
          title={murabahaContent?.title || <FormattedMessage id="fund_title" defaultMessage="Murabaha and Sukuk Fund" />}
          paragraph={paragraphContent}
          none="none"
          button={<FormattedMessage id="fund_button" defaultMessage="Invest Smartly with Fund" />}
          image={imageUrl}
          links="/Individuals-login"
        />
        {accordionItems && accordionItems.length > 0 && (
          <section className='assetManagement-accordion'>
            <div className='assetManagement-accordion-container'>
              {accordionItems.map((item, index) => (
                <AccordionsV2
                  key={index}
                  title={item.title || ''}
                  links={item.link || []}
                />
              ))}
            </div>
          </section>
        )}
      </>
    );
  };

  const handlePortfolioMurabahaandSukukFund = () => {
    if (pageData) {
      const contentData = setInitialContent(pageData);
      setContentFromData(contentData);
    }
    setActiveButton("stock");
    
  };

  const handlePortfolioSaudiEquityFund = () => {
    if (!pageData || !pageData.sections || !pageData.sections.data) {
      console.log("Data not yet loaded");
      return;
    }

    const saudiEquityFundData = pageData.sections.data.find(section => 
      section.attributes?.section_title === "صندوق الأسهم السعودية" ||
      section.attributes?.section_title === "Saudi Equity Fund"
    )?.attributes;

    if (!saudiEquityFundData || !saudiEquityFundData.section_content) {
      console.log("Saudi Equity Fund data not found");
      return;
    }

    const content = saudiEquityFundData.section_content[0];
    const accordionLinks = content.accordion_link;
    const fundInfo = content.Content[0];
    
    const imageUrl = fundInfo.image?.data?.attributes?.url
      ? `https://itqan-strapi.softylus.com${fundInfo.image.data.attributes.url}`
      : "/Frame 138.png";

    setContent(
      <>
        <div className="buttons-container buttons-container-private">
          <button onClick={handlePortfolioSaudiEquityFund}
          className={activeButton === "portfolio" ? "active" : "active"}  
          >
            {fundInfo.title}
          </button>
          <button onClick={handlePortfolioMurabahaandSukukFund}   
                    >
            {locale === "ar" ? "صندوق اتقان للمرابحات والصكوك" : "Murabaha and Sukuk Fund"}
          </button>
        </div>
        <InfoPanel
          title={fundInfo.title}
          paragraph={fundInfo.subtitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          button={locale === "ar" ? "استثمر بذكاء مع الصندوق" : "Invest Smartly with Fund"}
          image={imageUrl}
          revers="row-reverse"
          none="none"
          links="/Individuals-login"
        />
        <section className='assetManagement-accordion'>
          <div className='assetManagement-accordion-container'>
            {accordionLinks.map((item, index) => (
              <AccordionsV2
                key={index}
                title={item.title || ''}
                links={item.link || []}
              />
            ))}
          </div>
        </section>
      </>
    );

    setActiveButton("stock");
  };

  const handlePortfolioManagementClick = () => {
    if (!pageData || !pageData.sections || !pageData.sections.data) {
      console.log("Data not yet loaded");
      return;
    }

    const portfolioManagementData = pageData.sections.data[2]?.attributes?.section_content?.find(content => 
      content.__component === "blocks.content-card" &&
      (content.title === "إدارة المحافظ" || content.title === "Portfolio Management")
    );

    if (!portfolioManagementData) {
      console.log("Portfolio Management data not found");
      return;
    }

    const imageUrl = portfolioManagementData.image?.data?.attributes?.url
      ? `https://itqan-strapi.softylus.com${portfolioManagementData.image.data.attributes.url}`
      : "/Frame 139.png";

    setContent(
      <section className='management-portfolios-sec'>
        <h2 className='boxes-title'>{portfolioManagementData.title}</h2>
        <InfoPanel
          title={portfolioManagementData.title}
          paragraph={portfolioManagementData.subtitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          button="Experience Our Unique Approach Now"
          image={imageUrl}
          revers="row-reverse"
          none="none"
          links="/Individuals-login"
        />
      </section>
    );
     
    setActiveButton("portfolio");
  };

  const handlePrivateFundsClick = () => {
    const privateSection = pageData?.sections?.data.find(section => 
      section.attributes?.section_title === "الصناديق الخاصة" ||
      section.attributes?.section_title === "Private Funds"
    );
  
    const privateFundsData = privateSection?.attributes?.section_content || [];
    setContent(
      <section className='private-box-sec'>
        <div className='private-box-container'>
          <Swiper
            className="swiper-Discover"
            breakpointsInverse={true}
            breakpoints={{
              900: { slidesPerView: 1, spaceBetween: 40 },
              1070: { slidesPerView: 2, spaceBetween: 50 },
              1300: { slidesPerView: 2, spaceBetween: 50 },
              1640: { slidesPerView: 3, spaceBetween: 50 },
            }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={0}
            direction="horizontal"
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <div className='private-box-title'>
              <h2>
                {privateSection?.attributes?.section_title}
              </h2>
              <SliderButtons />
            </div>
            <div className='private-box-card'>
              {privateFundsData.map((item, index) => (
                <SwiperSlide key={index} className="swiper-Discover-Slide">
                  <PrivateBox
                    title={item.title}
                    subtitle={item.subtitle}
                    Button={<FormattedMessage id="private_funds_button" defaultMessage="Invest Now" />}
                    imgSrc={`https://itqan-strapi.softylus.com${item.image.data.attributes.url}`}
                    size={item.image.data.attributes.size}
                    link="/Individuals-login"
                    hidebutton="none"
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </section>
    );
    setActiveButton("private");
  };
  const handleStockFundsClick = () => {
    if (pageData) {
      const contentData = setInitialContent(pageData);
      setContentFromData(contentData);
    }
    setActiveButton("stock");
  };

  if (!isDataReady) {
    return <Loader/>;
  }

  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
      <Hero
        title={<FormattedMessage id="asset_management_title" defaultMessage="Asset Management" />}
        subTitle={<FormattedMessage id="asset_management_subtitle" defaultMessage="Asset Management Services" />}
      />
      <section className='assetManagement-all-sec'>
        <div className="buttons-container">
          <button
            className={activeButton === "portfolio" ? "active" : ""}
            onClick={handlePortfolioManagementClick}
          >
            <FormattedMessage id="portfolio_management_button" defaultMessage="Portfolio Management" />
          </button>
          <button
            className={activeButton === "private" ? "active" : ""}
            onClick={handlePrivateFundsClick}
          >
            <FormattedMessage id="private_funds_button" defaultMessage="Private Funds" />
          </button>
          <button
            className={activeButton === "stock" ? "active" : ""}
            onClick={handleStockFundsClick}
          >
            <FormattedMessage id="public_funds_button" defaultMessage="Public Funds" />
          </button>
        </div>
        {content}
      </section>
      <ScrollToTopButton />
    </Layout>
  );
}

export default AssetManagement;