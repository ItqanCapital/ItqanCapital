import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Successfully from '../Json/Successfully.json';
import Fail from '../Json/fail.json';
import { FormattedMessage } from 'react-intl';
import "./style/SecFooter.css";
import "./style/ContactUs.css";
import { Link } from "gatsby";

const SecFooter = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [file, setFile] = useState(null);

const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        file: null 
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = new FormData();
        payload.append('data', JSON.stringify(formData));
      
        if (file) {
          payload.append('files.file', file);
        }
      
        axios.post("https://itqan-strapi.softylus.com/api/contact-uses?populate=*", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c"
          }
        })
        .then(response => {
          if (response.status === 200) {
            setFormSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setFile(null);
          } else {
            setFormError(true);
            console.error('Error:', response);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setFormError(true);
        });
      };

    return (
        <section className='sec-footer-section'>
            <div className='sec-footer-container'>
                <form className='sec-footer-form' onSubmit={handleSubmit}>
                    <label>
                        <FormattedMessage id="name_label" defaultMessage="الاسم">
                            {(text) => <span>{text}</span>}
                        </FormattedMessage>
                        <FormattedMessage id="name_placeholder" defaultMessage="أدخل اسمك">
                            {placeholder => (
                                <input
                                    type='text'
                                    name='name'
                                    placeholder={placeholder}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            )}
                        </FormattedMessage>
                    </label>
                    <label>
                        <FormattedMessage id="email_label" defaultMessage="البريد الإلكتروني">
                            {(text) => <span>{text}</span>}
                        </FormattedMessage>
                        <FormattedMessage id="email_placeholder" defaultMessage="أدخل بريدك الإلكتروني">
                            {placeholder => (
                                <input
                                    type='email'
                                    name='email'
                                    placeholder={placeholder}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            )}
                        </FormattedMessage>
                    </label>
                    <label>
                        <FormattedMessage id="message_label" defaultMessage="الرسالة">
                            {(text) => <span>{text}</span>}
                        </FormattedMessage>
                        <FormattedMessage id="message_placeholder" defaultMessage="اكتب رسالتك هنا">
                            {placeholder => (
                                <textarea
                                    name='message'
                                    placeholder={placeholder}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            )}
                        </FormattedMessage>
                    </label>
                    <label>
                        <FormattedMessage id="file_label" defaultMessage="File">
                            {(text) => <span>{text}</span>}
                        </FormattedMessage>
                        <input type="file" name="file"  accept="image/*,.pdf"  onChange={handleFileChange} />
                    </label>
                    <button type='submit'>
                        <FormattedMessage id="submit_button" defaultMessage="إرسال" />
                    </button>
                    <Modal isOpen={formSubmitted || formError} onRequestClose={() => { setFormSubmitted(false); setFormError(false); }}>
                        {formSubmitted ? (
                            <div className='Contact-successfuly'>
                                <button onClick={() => { setFormSubmitted(false); }}><img src='/close.svg' alt="Close" /></button>
                                <div className='Contact-successfuly-body'>
                                    <Player
                                        autoplay
                                        loop
                                        src={Successfully}
                                        style={{ height: '200px', width: '200px' }}
                                    >
                                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                    </Player>
                                    <h4><FormattedMessage id="success_message" defaultMessage="لقد تم أرسال طلبك بنجاح" /></h4>
                                </div>
                            </div>
                        ) : (
                            <div className='Contact-error'>
                                <button onClick={() => { setFormError(false); }}><img src='/close.svg' alt="Close" /></button>
                                <div className='Contact-error-body'>
                                    <Player
                                        autoplay
                                        loop
                                        src={Fail}
                                        style={{ height: '200px', width: '200px' }}
                                    >
                                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                    </Player>
                                    <h4><FormattedMessage id="error_message" defaultMessage="لم يتم أرسال طلبك، الرجاء المحاولة لاحقاً" /></h4>
                                </div>
                            </div>
                        )}
                    </Modal>
                    <p>
                        <FormattedMessage id="privacy_policy" defaultMessage="نحن ملتزمون بحماية واحترام خصوصيتكم. سيتم استخدام المعلومات المقدمة في هذا النموذج للتواصل معكم والإجابة على استفساراتكم فقط." />
                    </p>
                </form>
                <div className='sec-footer-content'>
                    <h2><FormattedMessage id="contact_us_title" defaultMessage="اتصل بنا" /></h2>
                    <p><FormattedMessage id="contact_us_subtitle" defaultMessage="نحن هنا للإجابة على استفساراتكم وتقديم الدعم. يرجى ملء النموذج وسيقوم أحد ممثلينا بالتواصل معكم في أقرب وقت ممكن." /></p>
                    <h3><FormattedMessage id="contact_information_title" defaultMessage="معلومات الاتصال" /></h3>
                    <h6><FormattedMessage id="email_title" defaultMessage="البريد الإلكتروني" /></h6>
                    <p>info@itqancapital.com</p>
                    <h6><FormattedMessage id="address_title" defaultMessage="العنوان" /></h6>
                    <p>
                        <FormattedMessage
                            id="address_details"
                            defaultMessage="المملكة العربية السعودية / جدة/ حي الزهراء – شارع أحمد العطاس مركز الزهراء التجاري وحدة 2563 جدة 23425-2753 المملكة العربية السعودية"
                        />
                    </p>
                    <h6><FormattedMessage id="social_media_title" defaultMessage="التواصل الاجتماعي" /></h6>
                    <div className='sec-footer-content-social'>
                        <Link to='https://x.com/ItqanCapital'>
                            <img src='/X.png' alt="X Social Media" />
                        </Link>
                        <Link to='https://sa.linkedin.com/company/itqancapital'>
                            <img src='/LinkedIn.png' alt="LinkedIn Social Media" />
                        </Link>
                    </div>
                    <Link target="_blank" to="https://itqan-strapi.softylus.com/uploads/brwfayl_shrkt_itqan_kabytal_30_04_2024_a3772dc6a79c4eebe6441e527c86706f_5d4068f242.pdf">
                        <h6><img src='/file-icon.png' alt="File Icon" /><FormattedMessage id="company_profile_title" defaultMessage="ملف تعريفي للشركة" /></h6>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default SecFooter;