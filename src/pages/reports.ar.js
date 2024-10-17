import React from 'react'
import Hero from '../components/Hero';
import Layout from "../components/layout";
import Accordion from '../components/Accordion';
import ScrollToTopButton from '../components/ScrollToTopButton';
import accordionData from '../Json/reports.json';
import "../components/style/index.css";
import Seo from '../components/seo';
const Reports = () => {
  return (
    <Layout>
      <ScrollToTopButton/>
      <Seo
      title="التقارير - موارد وتحليلات مفيدة من إتقان كابيتال      "
      description="تصفح التقارير والتحليلات الهامة التي تقدمها شركة إتقان كابيتال، الشركة الاستثمارية المتخصصة في المملكة العربية السعودية، لاستفادة من مصادر المعرفة والتحليلات في مجال الاستثمار والأسواق المالية.      "/>
        <Hero
        title="التقارير"
        subTitle="“المصادر”"
        />
        <ScrollToTopButton/>
        <section className='assetManagement-accordion Reports-sec'>
            <h3>التقارير والبيانات
            </h3>
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
        
    </Layout>
  )
}

export default Reports