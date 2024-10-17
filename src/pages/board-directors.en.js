import React from 'react'
import Layout from "../components/layout";
import Hero from '../components/Hero';
import "../components/style/index.css";

import ScrollToTopButton from '../components/ScrollToTopButton';
import Seo from '../components/seo';
const BoardDirectors = () => {
  return (
   <Layout>
    <Seo
    title="الهيكل التنظيمي - نظرة شاملة على تنظيم شركة إتقان كابيتال"    
    description="استكشف الهيكل التنظيمي لشركة إتقان كابيتال لفهم كيفية تنظيم وترتيب الإدارة والأقسام والفروع داخل الشركة. احصل على نظرة شاملة لكيفية تنظيم الشركة وتوزيع الصلاحيات والمسؤوليات بين الفروع المختلفة.    "/>
    <ScrollToTopButton/>
    <Hero
    title="الهيكل التنظيمي"/>
    <section className='BoardDirectors-sec'>
        <img  src='/org-chart-v2.png'/>
    </section>
   </Layout>
  )
}

export default BoardDirectors