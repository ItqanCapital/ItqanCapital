import React from 'react';
import { FormattedMessage } from 'react-intl';
import PrivateBox from '../components/PrivateBoxCard';
import Hero from '../components/Hero';
import Layout from "../components/layout";
import "../components/style/ConservationServices.css";
import ScrollToTopButton from '../components/ScrollToTopButton';
import ConservationServicesData from "../Json/ConservationServicesData.json";
import Seo from '../components/seo';

const ConservationServices = () => {
  return (
    <Layout>
      <Seo
   title="خدمات الحفظ في شركة إتقان كابيتال - صندوق العقارات والاستثمار المباشر      "
      description="تعرف على خدمات الحفظ التي تقدمها شركة إتقان كابيتال، بما في ذلك صندوق العقارات والاستثمار المباشر، واستفد من الخبرة في إدارة الثروات لتحقيق أهداف استثمارية مستدامة ومواتية للمستثمرين.      "
      />
      <ScrollToTopButton />
      <Hero
        title={<FormattedMessage id="conservation_services_hero_title" />}
        subTitle={<FormattedMessage id="conservation_services_hero_subtitle" />}
      />
      <section className='Conservation-Services-card-sec'>
        <div className='Conservation-Services-card-container'>
          <div className='Conservation-Services-card-title'>
            {/* <h1><FormattedMessage id="conservation_services_main_title" /></h1> */}
            <p><FormattedMessage id="conservation_services_main_description" /></p>
          </div>
          {/* <div className='Conservation-Services-cards'>
            {ConservationServicesData.map((item, index) => (
              <PrivateBox
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                size={item.size}
                Button={item.Button}
                imgSrc={item.imgSrc}
                backgroundColor={item.backgroundColor}
                link={item.link}
              />
            ))}
          </div> */}
        </div>
      </section>
    </Layout>
  );
};

export default ConservationServices;
