import React, { useState } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/ClientAwareness.css";
import { Link } from "gatsby";
import Seo from '../components/seo';
import InvestorProtectionGuide from "../../static/1681029922_دليل-حماية-المستثمر (4).pdf";
import { FormattedMessage } from 'react-intl';

const SecurityCard = ({ defaultContent, hoverContent, defaultImgSrc, hoverImgSrc }) => {
  const [content, setContent] = useState(defaultContent);
  const [imgSrc, setImgSrc] = useState(defaultImgSrc);

  // Update both content and image source on hover
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
      className='Reports-data-single-card security-single-card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        <img src={imgSrc} alt="" />
        <p>{content}</p>
    </div>
  );
};

// Example usage of SecurityCard within your component
const ClientAwareness = () => {
  return (
    <Layout>
      <Seo
       title="خدمة العملاء في إتقان كابيتال - التقارير والبيانات وإجراءات التقديم على الشكاوى      "
      description="اكتشف خدمة العملاء في إتقان كابيتال، بما في ذلك التقارير والبيانات الأخيرة للأسواق المالية، وإجراءات تقديم الشكاوى، ودليل حماية المستثمر لضمان تجربة استثمارية آمنة وشفافة."
      />
      <ScrollToTopButton />
      <Hero
        title={<FormattedMessage id="client_awareness_hero_title" />}
        subTitle={<FormattedMessage id="client_awareness_hero_subtitle" />}
      />
      <section className='Reports-data-sec'>
        <div className='Reports-data-container'>
          <div className='Reports-data-title'>
            {/* Add translated title here */}
          </div>
          <div className='Reports-data-cards security-cards'>
            <Link to='https://itqancapital.com/wp-content/themes/etq/co/CustomerComplaint.pdf'>
              <SecurityCard
                defaultImgSrc='/Complaint.png'
                hoverImgSrc='/PDF.png'
                defaultContent={<FormattedMessage id="client_awareness_complaint_procedure" />}
                hoverContent={<FormattedMessage id="client_awareness_view_pdf" />}
              />
            </Link>
            <a href={InvestorProtectionGuide} target="_blank" rel="noopener noreferrer">
              <SecurityCard
                defaultImgSrc='/Investor.png'
                hoverImgSrc='/PDF.png'
                defaultContent={<FormattedMessage id="client_awareness_investor_guide" />}
                hoverContent={<FormattedMessage id="client_awareness_view_pdf" />}
              />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClientAwareness;
