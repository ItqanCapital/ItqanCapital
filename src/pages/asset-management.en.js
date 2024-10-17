import React, { useState } from 'react'
import "../components/style/AssetManagement.css"
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import InfoPanel from '../components/InfoPanel';
import Accordion from '../components/Accordion';
import accordionData from '../Json/Accordion.json';
import PrivateBox from '../components/PrivateBoxCard';
import PrivateBoxData from "../Json/PrivateBoxData.json"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Seo from '../components/seo';
import { useLocalization } from '../context/LocalizationContext';
import { FormattedMessage } from 'react-intl';

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="btn-sliider">
<button onClick={() => swiper.slidePrev()} style={{ transform: "rotate(180deg)" }}>
  <img src='/arrow-circle-right.png' alt="Previous Slide" />
</button>
      <button onClick={() => swiper.slideNext()} className=''><img src='/arrow-circle-right.png' /></button>
    </div>
  )
}
const AssetManagement = () => {
  const [activeButton, setActiveButton] = useState("stock");
  const handlePortfolioMurabahaandSukukFund = () => {
    setContent(
      <>
        <div className="buttons-container buttons-container-private">
          <button
            className={activeButton === "private" ? "active" : ""}
            onClick={handlePortfolioSaudiEquityFund}
          >
            <FormattedMessage id="private_equity_fund" defaultMessage="Private Equity Fund" />
          </button>
          <button
            className={activeButton === "portfolio" ? "active" : ""}
            onClick={handlePortfolioMurabahaandSukukFund}
          >
            <FormattedMessage id="murabaha_sukuk_fund" defaultMessage="Murabaha and Sukuk Fund" />
          </button>
        </div>
        <InfoPanel
          title={<FormattedMessage id="fund_title" defaultMessage="Murabaha and Sukuk Fund" />}
          paragraph={<FormattedMessage
            id="fund_paragraph"
            defaultMessage="Lorem ipsum..."
          />}
          point1={<FormattedMessage id="fund_point1" defaultMessage="Point 1" />}
          point2={<FormattedMessage id="fund_point2" defaultMessage="Point 2" />}
          point3={<FormattedMessage id="fund_point3" defaultMessage="Point 3" />}
          point4={<FormattedMessage id="fund_point4" defaultMessage="Point 4" />}
          button={<FormattedMessage id="fund_button" defaultMessage="Invest Smartly with Fund" />}
          image="/Frame 136.png"
          links="/Individuals-login"
        />
        <h2 className='boxes-title'>
          <FormattedMessage id="equity_fund_title" defaultMessage="Public Equity and Murabaha Funds" />
        </h2>
        <section className='assetManagement-accordion'>
          <div className='assetManagement-accordion-container'>
            {accordionData.map((item, index) => (
              <Accordion
                key={index}
                title={<FormattedMessage id={item.titleId} defaultMessage={item.titleDefault} />}
                Details={<FormattedMessage id={item.detailsId} defaultMessage={item.detailsDefault} />}
              />
            ))}
          </div>
        </section>
      </>
    );
    setActiveButton("stock");
  };
  const handlePortfolioSaudiEquityFund = () => {
    setContent(
      <>
        <div className="buttons-container buttons-container-private">
          <button
            onClick={handlePortfolioSaudiEquityFund}
          >
            <FormattedMessage id="saudi_equity_fund" defaultMessage="Saudi Equity Fund" />
          </button>
          <button
            onClick={handlePortfolioMurabahaandSukukFund}
          >
            <FormattedMessage id="murabaha_sukuk_fund" defaultMessage="Murabaha and Sukuk Fund" />
          </button>
        </div>
        <InfoPanel
          title={<FormattedMessage id="saudi_equity_fund_title" defaultMessage="Saudi Equity Fund" />}
          paragraph={<FormattedMessage
            id="saudi_equity_fund_paragraph"
            defaultMessage="Lorem ipsum..."
          />}
          button={<FormattedMessage id="fund_button" defaultMessage="Invest Smartly with Fund" />}
          image="/Frame 138.png"
          revers="row-reverse"
          none="none"
          links="/Individuals-login"
        />
        <h2 className='boxes-title'>
          <FormattedMessage id="equity_fund_title" defaultMessage="Public Equity and Murabaha Funds" />
        </h2>
        <section className='assetManagement-accordion'>
          <div className='assetManagement-accordion-container'>
            {accordionData.map((item, index) => (
              <Accordion
                key={index}
                title={<FormattedMessage id={item.titleId} defaultMessage={item.titleDefault} />}
                Details={<FormattedMessage id={item.detailsId} defaultMessage={item.detailsDefault} />}
              />
            ))}
          </div>
        </section>
      </>
    );
    setActiveButton("stock");
  };
  const [content, setContent] = useState(
    <section className='AssetManagement-title'>
      <div className="buttons-container buttons-container-private">
        <button
          onClick={handlePortfolioSaudiEquityFund}
        >
          <FormattedMessage id="saudi_equity_fund" defaultMessage="Saudi Equity Fund" />
        </button>
        <button
          onClick={handlePortfolioMurabahaandSukukFund}
        >
          <FormattedMessage id="murabaha_sukuk_fund" defaultMessage="Murabaha and Sukuk Fund" />
        </button>
      </div>
      <InfoPanel
        title={<FormattedMessage id="murabaha_sukuk_fund_title" defaultMessage="Murabaha and Sukuk Fund" />}
        paragraph={<FormattedMessage
          id="murabaha_sukuk_fund_paragraph"
          defaultMessage="Lorem ipsum..."
        />}
        point1={<FormattedMessage id="murabaha_sukuk_fund_point1" defaultMessage="Murabaha-based commodity transactions." />}
        point2={<FormattedMessage id="murabaha_sukuk_fund_point2" defaultMessage="Sukuk in various forms, directly and indirectly, up to 30% of the net asset value of the fund." />}
        point3={<FormattedMessage id="murabaha_sukuk_fund_point3" defaultMessage="Investment funds investing primarily in Murabaha and/or Sukuk." />}
        point4={<FormattedMessage id="murabaha_sukuk_fund_point4" defaultMessage="Investment funds investing in various investment instruments including Murabaha, speculation, manufacturing, and salam." />}
        button={<FormattedMessage id="fund_button" defaultMessage="Invest Smartly with Fund" />}
        image="/Frame 136.png"
        links="/Individuals-login"
      />
      <h2 className='boxes-title'>
        <FormattedMessage id="equity_fund_title" defaultMessage="Public Equity and Murabaha Funds" />
      </h2>
      <section className='assetManagement-accordion'>
        <div className='assetManagement-accordion-container'>
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              title={<FormattedMessage id={item.titleId} defaultMessage={item.titleDefault} />}
              Details={<FormattedMessage id={item.detailsId} defaultMessage={item.detailsDefault} />}
            />
          ))}
        </div>
      </section>
    </section>
  );
;

const handlePortfolioManagementClick = () => {
  setContent(
    <section className='management-portfolios-sec'>
      <h2 className='boxes-title'>
        <FormattedMessage id="portfolio_management_title" defaultMessage="Portfolio Management" />
      </h2>
      <InfoPanel
        title={<FormattedMessage id="portfolio_management_title" defaultMessage="Portfolio Management" />}
        paragraph={<FormattedMessage
          id="portfolio_management_paragraph"
          defaultMessage="Successful wealth management is directly linked to the quality of fundamental advice, which in turn depends on the expertise and capabilities of the advisor. At Itqan, our experienced team of specialists focuses on developing and implementing optimal strategies for each client individually, relying on external expertise when necessary. Instead of providing ready-made solutions, which are often the cornerstone of major wealth management firms, we focus on delivering responses that precisely meet personal needs, expectations, and risk tolerance."
        />}
        button={<FormattedMessage id="experience_our_unique_approach" defaultMessage="Experience Our Unique Approach Now" />}
        image="/Frame 139.png"
        revers="row-reverse"
        none="none"
        links="/Individuals-login"
      />
    </section>
  );
  setActiveButton("portfolio");
};
const handlePrivateFundsClick = () => {
  setContent(
    <section className='private-box-sec'>
      <div className='private-box-container'>
        <Swiper
          className="swiper-Discover"
          breakpointsInverse={true}
          breakpoints={{
            900: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1070: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1300: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1640: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
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
              <FormattedMessage id="private_funds_title" defaultMessage="Private Funds" />
            </h2>
            <SliderButtons />
          </div>
          <div className='private-box-card'>
            {PrivateBoxData.map((item, index) => (
              <SwiperSlide key={index} className="swiper-Discover-Slide">
                <PrivateBox
                  title={<FormattedMessage id="private_funds_button" defaultMessage={item.title} />}
                  subtitle={<FormattedMessage id="private_box_subtitle" defaultMessage={item.subtitle} />}
                  Button={<FormattedMessage id="private_box_button" defaultMessage={item.button} />}
                  imgSrc={item.imgSrc}
                  size={item.size}
                  link={item.link}
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
  setContent(
    <section className='AssetManagement-title'>
      <div className="buttons-container buttons-container-private">
        <button onClick={handlePortfolioSaudiEquityFund}>
          <FormattedMessage id="saudi_equity_fund" defaultMessage="Saudi Equity Fund" />
        </button>
        <button onClick={handlePortfolioMurabahaandSukukFund}>
          <FormattedMessage id="murabaha_sukuk_fund" defaultMessage="Murabaha and Sukuk Fund" />
        </button>
      </div>
      <InfoPanel
        title={<FormattedMessage id="murabaha_sukuk_title" defaultMessage="Murabaha and Sukuk Fund" />}
        paragraph={
          <FormattedMessage
            id="murabaha_sukuk_paragraph"
            defaultMessage="The Murabaha and Sukuk Fund aims to achieve attractive returns for investors in the short and medium term, in compliance with Sharia principles. It focuses on preserving investor capital and providing flexible redemption options to manage risks optimally. To achieve its investment objectives, the fund primarily invests in the Saudi market through a diversified investment portfolio comprising high-quality short-term investment instruments that comply with Sharia principles, including:"
          />
        }
        point1={<FormattedMessage id="murabaha_sukuk_point1" defaultMessage="Murabaha-based commodity transactions." />}
        point2={
          <FormattedMessage
            id="murabaha_sukuk_point2"
            defaultMessage="Sukuk (Islamic bonds) of various types, directly and indirectly, up to a maximum of 30% of the fund's net asset value."
          />
        }
        point3={<FormattedMessage id="murabaha_sukuk_point3" defaultMessage="Investment units in funds focusing on Murabaha and/or Sukuk primarily." />}
        point4={
          <FormattedMessage
            id="murabaha_sukuk_point4"
            defaultMessage="Investment units in funds that invest in various investment instruments, including Murabaha, speculation, manufacturing, and leasing."
          />
        }
        button={<FormattedMessage id="invest_smart_button" defaultMessage="Invest Smart with Itqan Fund" />}
        image="/Frame 136.png"
        links="/Individuals-login"
      />
      <h2 className='boxes-title'>
        <FormattedMessage id="public_equity_murabaha_funds" defaultMessage="Public Equity and Murabaha Funds" />
      </h2>
      <section className='assetManagement-accordion'>
        <div className='assetManagement-accordion-container'>
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              title={item.title}
              Details={item.Details}
            />
          ))}
        </div>
      </section>
    </section>
  );
  setActiveButton("stock");
};

  return (
    <Layout>
      <Seo
        title={<FormattedMessage id="asset_management_services_title" defaultMessage="Asset Management Services at Itqan Capital - Stocks, Funds, Real Estate" />}
        description={<FormattedMessage id="asset_management_services_description" defaultMessage="Explore asset management services offered by Itqan Capital, including stocks, funds, and real estate, and benefit from financial consultations tailored to achieve Sharia-compliant investment goals." />}
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
      <div className="content">
        {/* Additional content here */}
      </div>
      <ScrollToTopButton />
    </Layout>
  );
}

export default AssetManagement;