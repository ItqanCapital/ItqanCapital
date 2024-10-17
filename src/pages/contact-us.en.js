import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../components/layout";
import Hero from '../components/Hero';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Seo from '../components/seo';
import "../components/style/ContactUs.css"
import Modal from 'react-modal';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Successfully from "../Json/Successfully.json"
import Fail from "../Json/fail.json"
import { Link } from "gatsby"
import itqanProfile from "../../static/بروفايل شركة إتقان كابيتال - 30-04-2024.pdf"
const ContactUs = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { data: formData };

        axios.post("https://itqan-strapi.softylus.com/api/contact-uses", payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c"
            }
        })
        .then(response => {
            if (response.status === 200) {
                setFormSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                setFormError(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setFormError(true);
        });
    };

    return (
        <Layout>
            <Seo
                title="تواصل معنا للحصول على دعم وإجابة استفساراتك - إتقان كابيتال"
                description="نحن في إتقان كابيتال هنا لمساعدتك وتقديم الدعم. اتصل بنا الآن عبر البريد الإلكتروني أو الهاتف أو ملء نموذج الاتصال. سنقوم بالرد على استفساراتك في أسرع وقت ممكن."
            />
            <Hero title="الاتصال بنا" />
            <ScrollToTopButton/>
            <div className='Contact-footer-section-wallpaper'>
                <section className='Contact-footer-section'>
                    <div className='Contact-footer-container'>
                        
                        <form className='Contact-footer-form' onSubmit={handleSubmit} method='OPTIONS'>
                            <label>
                                الاسم       
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='حقل لإدخال الاسم'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                البريد الإلكتروني
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='حقل لإدخال البريد الإلكتروني'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                الرسالة
                                <textarea
                                    name='message'
                                    placeholder='حقل لإدخال موضوع الاستفسار'
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type='submit'>إرسال</button>
                             <Modal isOpen={formSubmitted || formError} onRequestClose={() => {setFormSubmitted(false); setFormError(false);}}>
                                {formSubmitted ? (
                                    <div className='Contact-successfuly'>
                                     <button onClick={() => {setFormSubmitted(false);}}><img src='/close.svg'/></button>
                                     <div className='Contact-successfuly-body'> 
                                     <Player
                                        autoplay
                                        loop
                                        src={Successfully} 
                                        style={{ height: '200px', width: '200px' }} 
                                    >
                                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                    </Player>  
                                        <h4>لقد تم أرسال طلبك بنجاح</h4>
                                        </div>

                                    </div>
                                ) : (
                                    <div className='Contact-error'>
                                     <button onClick={() => {setFormError(false);}}><img src='/close.svg'/></button>
                                     <div className='Contact-error-body'>
                                     <Player
                                        autoplay
                                        loop
                                        src={Fail} 
                                        style={{ height: '200px', width: '200px' }} 
                                    >
                                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                    </Player>  
                                        <h4>لم يتم أرسال طلبك , الرجاء المحاوله لاحقا</h4>
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        
                        </form>
                       
                        <div className='Contact-footer-content'>
                <h2>اتصل بنا</h2>
                <p>نحن هنا للإجابة على استفساراتكم وتقديم الدعم. يرجى ملء النموذج وسيقوم أحد ممثلينا بالتواصل معكم في أقرب وقت ممكن.</p>
                <h3>معلومات الاتصال</h3>
                <div className='Contact-info'>
                 <div className='Contact-info-data'>
                <h6>البريد الإلكتروني</h6>
                <p>info@itqancapital.com</p>
                </div>
                <div className='Contact-info-data'>
                    <h6>رقم الهاتف</h6>
                    <p>Jeddah: +966 12 263 8787 – Ext. (615) <br/>Riyadh: 8001240533 +966 11 2164333</p>
                </div>
                </div>
                <div className='Contact-info'>
                    <div className='Contact-info-data'>
                      <h6> جدة</h6>
                         <p>حي الزهراء – شارع أحمد العطاس

مركز الزهراء التجاري، وحدة 2563، جدة 23425-2753
 المملكة العربية السعودية
 <Link to='https://www.google.com/maps/place/%D8%A5%D8%AA%D9%82%D8%A7%D9%86+%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84+%7C+Itqan+Capital%E2%80%AD/@21.5885065,39.1293053,17z/data=!4m14!1m7!3m6!1s0x15c3dbb5575e28cb:0x7ceca97ac7bcbe1!2z2KXYqtmC2KfZhiDZg9in2KjZitiq2KfZhCB8IEl0cWFuIENhcGl0YWw!8m2!3d21.5885065!4d39.131494!16s%2Fg%2F11sh49gd90!3m5!1s0x15c3dbb5575e28cb:0x7ceca97ac7bcbe1!8m2!3d21.5885065!4d39.131494!16s%2Fg%2F11sh49gd90?entry=ttu' ><span  style={{display:"block"}} className='google-map'>Google Map</span></Link>

</p>                   </div>
                    <div className='Contact-info-data'>
                      <h6>الرياض</h6>
                         <p>الطابق الثاني، مركز الدغيثر
العليا، الرياض

المملكة العربية السعودية
<Link to='https://www.google.com/maps/place/Itqan+Capital/@24.6986875,46.6879375,15z/data=!4m6!3m5!1s0x3e2f0379e66ca3d5:0x6fa553a2eed997f4!8m2!3d24.6986875!4d46.6879375!16s%2Fg%2F11v022rw6w?entry=ttu' ><span style={{display:"block"}} className='google-map'>Google Map</span></Link>

</p>
                    </div>
                </div>
                
                <h6>التواصل الاجتماعي</h6>
                <div className='Contact-footer-content-social'> 
                <Link to='https://x.com/ItqanCapital'>
                    <img src='/X.png'/>
                    </Link>
                    <Link to='https://sa.linkedin.com/company/itqancapital'>
                    <img src='/LinkedIn.png'/>
                    </Link>
                </div>
                <a to={itqanProfile} target = "_blank">
          <h6><img src='/Investor.png'/>ملف تعريفي للشركة</h6>
          </a>
            </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default ContactUs;