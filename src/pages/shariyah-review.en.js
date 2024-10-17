import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from "../components/layout";
import Hero from '../components/Hero';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfoPanel from '../components/InfoPanel';
import "../components/style/index.css";
import Seo from '../components/seo';
import { Link } from "gatsby";

const SecurityCard = ({ defaultContent, hoverContent, defaultImgSrc, hoverImgSrc }) => {
  return (
    <div className='Reports-data-single-card security-single-card ShariyahReview-card'>
      <img src={defaultImgSrc} alt="" />
      <p><FormattedMessage id={defaultContent} /></p>
    </div>
  );
};

const ShariyahReview = () => {
  return (
    <Layout>
      <Seo 
         title="الهيئة الشرعية - شراكة “إتقان كابيتال” مع هيئة الرقابة الشرعية      "
         description="استكشف كيف تتعاون “إتقان كابيتال” مع هيئة الرقابة الشرعية في تقديم الحلول المتوافقة مع الشريعة الإسلامية لمنتجاتها الاستثمارية. تعرف على كيفية تأمين المزايا التنافسية ودعم الإطلاق السريع للمنتجات من خلال هذه الشراكة.      "/>

      <ScrollToTopButton />
      <Hero
        title={<FormattedMessage id="hero_title_shariyah_review" />}
      />
      <section className='ShariyahReview-sec'>
        <div className='ShariyahReview-container'>
          <section className={`infopanel-sec`}>
            <div className='infopanel-container' style={{flexDirection: "row-reverse"}}>
              <div className='infopanel-content ShariyahReview-content'>
                <h2><FormattedMessage id="shariyah_review_title" /></h2>
                <p><FormattedMessage id="shariyah_review_paragraph" /></p>
                <Link to="https://shariyah.net">
                  <button><FormattedMessage id="learn_more_button" /></button>
                </Link>
                <Link to="https://itqancapital.com/wp-content/uploads/2023/12/ItqanCapital%202023ShariahAuditReport.pdf">
                  <SecurityCard
                    defaultImgSrc='/Investor.png'
                    hoverImgSrc='/PDF.png' 
                    defaultContent='annual_reports'
                    hoverContent='view_pdf'
                  />
                </Link>
              </div>
              <div className='infopanel-image'>
                <img src="/abour_01 1.png" alt="About Us" />
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default ShariyahReview;
