import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import InfoPanel from '../components/InfoPanel';
import Seo from '../components/seo';
import "../components/style/ConservationServices.css";

const AdvisoryResearch = () => {
  return (
    <Layout>
      <Seo
         title="خدمات البحوث والمشورة في إتقان كابيتال - المشورة الاستثمارية والقدرات البحثية      "
      description="تعرّف على خدمات البحوث والمشورة التي تقدمها إتقان كابيتال، بما في ذلك المشورة الاستثمارية والقدرات البحثية التي تدعم أنشطتها الرئيسية في مجالات الاستثمار المباشر والخدمات المصرفية الاستثمارية وخدمات الحفظ.      "
      />
      <ScrollToTopButton />
      <Hero title={<FormattedMessage id="wealth_management_title" />} />
      <div className='Contact-footer-section-wallpaper'>
        <section className='AdvisoryResearch-sec'>
          <div className='AdvisoryResearch-card-title'>
            {/* Title section, if any */}
          </div>
          <div className='AdvisoryResearch-container'>
            <div className='AdvisoryResarch-img'>
              <img src='/teamwork.jpg' alt="Teamwork" />
            </div>
            <div className='AdvisoryResarch-info'>
              <h1><FormattedMessage id="wealth_management_services_title" /></h1>
              <p><FormattedMessage id="wealth_management_services_description1" /></p>
              <p><FormattedMessage id="wealth_management_services_description2" /></p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdvisoryResearch;
