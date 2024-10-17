import { FormattedMessage } from 'react-intl';
import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import Header from "./header";
import "./style/layout.css";
import Loader from "./loader";
import { LocalizationProvider } from '../context/LocalizationContext';
import { useLocalization } from '../context/LocalizationContext';

const Layout = ({ children, overPadding }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null); // For success/error messages
  const { locale } = useLocalization();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', id: 'footer.invalidEmail' });
      return;
    }

    const response = await fetch('https://itqan-strapi.softylus.com/api/newsletter-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c',
      },
      body: JSON.stringify({ data: { email } }),
    });

    const responseData = await response.json();

    if (response.ok) {
      setMessage({ type: 'success', id: 'footer.subscriptionSuccess' });
      setEmail('');
    } else {
      setMessage({ type: 'error', id: responseData.message || 'footer.subscriptionError' });
    }
  };

  if (loading) return <Loader />;



  return (
    <LocalizationProvider>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <footer className="footer-sec">
        <div className="footer-container">
          <div className="footer-logo">
          <Link to={`/${locale}/`}><img src="/itqanlogo.svg" alt="Itqan Capital Logo"/></Link>
          <p><FormattedMessage id="footer.companyDescription" defaultMessage="Itqan Capital is an investment company based in Saudi Arabia and licensed by the Capital Market Authority." /></p>
            <p><FormattedMessage id="footer.registrationNumber" defaultMessage="Commercial Registration Number: 4030167335 dated 6/3/2007" /></p>
            <p><FormattedMessage id="footer.licenseNumber" defaultMessage="License Number: 07058-37" /></p>
            <p><FormattedMessage id="footer.contactNumber" defaultMessage="Unified Number: 8001240533" /></p>
          </div>
       
          <div className="footer-services">
            <h6><FormattedMessage id="footer.services" defaultMessage="Services" /></h6>
            <Link to={`/${locale}/asset-management`}><FormattedMessage id="footer.assetManagement" defaultMessage="Asset Management" /></Link>
            <Link to={`/${locale}/Investment-banking`}><FormattedMessage id="footer.investmentBanking" defaultMessage="Investment Banking" /></Link>
            <Link to={`/${locale}/conservation-services`}><FormattedMessage id="footer.conservationServices" defaultMessage="Conservation Services" /></Link>
            <Link to={`/${locale}/advisory-research`}><FormattedMessage id="footer.advisoryResearch" defaultMessage="Wealth Management" /></Link>

          </div>

          <div className="footer-links">
            <h6><FormattedMessage id="footer.quickLinks" defaultMessage="Quick Links" /></h6>
            <Link to={`/${locale}/about-us`}><FormattedMessage id="footer.aboutUs" defaultMessage="Overview" /></Link>
            <Link to={`/${locale}/announcements`}><FormattedMessage id="footer.announcements" defaultMessage="Announcements" /></Link>
            <Link to={`/${locale}/contact-us`}><FormattedMessage id="footer.contactUs" defaultMessage="Contact Us" /></Link>
          </div>

          <form onSubmit={handleSubmit}>
            <h6><FormattedMessage id="footer.newsletter" defaultMessage="Newsletter" /></h6>
            <p><FormattedMessage id="footer.newsletterDescription" defaultMessage="Join us to keep you updated on all new investment tips" /></p>
            <div className="button-input">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="button-input-field"
                required
                placeholder="Your email address"
              />
              <button className="button-input-button" type="submit">
                <FormattedMessage id="footer.subscribe" defaultMessage="Subscribe" />
              </button>
            </div>
            {message && (
              <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
                <FormattedMessage id={message.id} defaultMessage="Message not found." />
              </p>
            )}
          </form>
        </div>
      </footer>
      <footer className="copyright-sec">
        <div className="copyright">
          <p><FormattedMessage id="footer.designBy" defaultMessage="Designed and developed by" /> <Link to="https://softylus.com/">Softylus</Link> @2024</p>
          <p><FormattedMessage id="footer.copyright" defaultMessage="Itqan Capital © 2024. All rights reserved. " /></p>
        </div>
      </footer>
    </LocalizationProvider>
  );
}

export default Layout;
