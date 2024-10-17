import Hero from '../components/Hero';
import Layout from "../components/layout";
import { Link } from "gatsby"
import React, { useState } from 'react';
import "../components/style/IndividualsLogin.css"
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '@mui/material/Accordion';
import axios from 'axios'; 
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Seo from '../components/seo';
import Modal from 'react-modal';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Successfully from "../Json/Successfully.json"
import { useLocalization } from '../context/LocalizationContext';
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage for localization

import Fail from "../Json/fail.json"
const CompaniesLogin = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        nationality: '',
        authorizedPersonNames: [''] ,
        gender: '',
        title:'',
        investorInformation:'', 
        identityType: '',
        relationship: '',
        nationality: '',
        idType: '',
        idNumber: '',
        placeOfIssue: '',
        issueDate: '',
        expiryDate: '',
        identityNumber: '',
        issueDate: '',
        expirationDate: '',
        placeOfIssue: '',
        dateOfBirth: '',
        maritalStatus: '',
        numberOfDependents: '',
        housingType: '',
        otherFinancialInfo:'',
        namesOfDirectors:'',
        namesOfNaturalPersons:'',
        isPubliclyListed:'',
        residenceAddress: '',
        postalCode: '',
        poBox: '',
        country: '',
        city: '',
        mobileNumber: '',
        homePhone: '',
        email: '',
        Building:'',
        Currency:'',
        telephoneNumber: '',
        Correspondence:'',
        correspondenceLanguage: '',
        messageTime: '',
        communicationMethod: '',
        annualIncome: '',
        incomeSource: '',
        mainActivity: '',
        netWorth: '',
        academicQualifications: '',
        employmentStatus: '',
        employmentCategory: '',
        employerName: '',
        jobTitle: '',
        YearsEmployment:'',
        employmentDate: '',
        employerAddress: '',
        employerPostalCode: '',
        employerPOBox: '',
        employerCountry: '',
        employerCity: '',
        employerFax: '',
        employerPhone: '',
        passportIssuePlace: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpirationDate: '',
        passportName: '',
        originCountryAddress: '',
        agreementType: '',
        Sector:'',
        financialExperience:'',
        otherFinancialExperience:'',
        inheritorsAgentFaxNo:'',
        inheritorsAgentSignature:'',
        inheritorsAgentPlaceOfIssue:'',
        inheritorsAgentTelNo:'',
        inheritorsAgentIssueDate:'',
        inheritorsAgentIdType:'',
        inheritorsAgentId:'',
        inheritorsAgentExpiryDate:'',
        inheritorsAgentName:'',
        fatherGuardianMinor:'',
        inheritorsAgent:'',
        illiterateBlindWitness:'',
        veiledWomanId:'',
        incompetentLegalGuardian:'',
        investmentKnowledgeDescription:'' ,
                    investmentYears:'' ,
                    previousInvestments:'' ,
                    professionalCertificates:'' ,
                    loanToInvestedMoneyRatio:'' ,
                    marginTransactions:'' ,
                    securitiesTransactionsOutsideKingdom:'' ,
                    countriesForSecuritiesTransactions:'' ,
                    riskAppetite: '',
                    investmentGoals: {
                        capitalProtection: '',
                        incomeGeneration: '',
                        balanced: '',
                        capitalGrowth: '',
                        retirementSavings: '',
                        projectFinancing: '',
                        assetPurchase: '',
                        other: ""
                      },
                      saudiAssets: '',
                      foreignCurrencyAssets: '',
                      selectedCurrencies: "",
                      expectedDuration: '',
                      clientCurrentWalletdepositsMurabah: "",
                      idealportfoliofortheclientdepositsMurabah: "",
                      clientCurrentWalletdebitInstruments: "",
                      idealportfoliofortheclientdebitInstruments: "",
                      clientCurrentWalletequity: "",
                      idealportfoliofortheclientequity: "",
                      clientCurrentWalletinvestmentFund: "",
                      idealportfoliofortheclientinvestmentFund: "",
                      clientCurrentWalletrealEstate: "",
                      idealportfoliofortheclientrealEstate: "",
                      clientCurrentWalletderivativesContracts: "",
                      idealportfoliofortheclientderivativesContracts: "",
                      clientCurrentWalletalternativeInvestments: "",
                      idealportfoliofortheclientalternativeInvestments: "",
                      accountNumber:'' ,
                      custodianName:'' ,
                      custodianAddress:'' ,
                      clientCertificates: '',
                      custodianCertificates: '',
                      OtherPartiesCertificates:'' ,
                      clientDividends: '',
                      custodianDividends: '',
                      OtherPartiesDividends:'' ,
                      clientSalesProceed: '',
                      custodianSalesProceed: '',
                      OtherPartiesSalesProceed:'' ,
                      recommendation: '',
                      signature: '', // This should be handled differently as it's a file upload
                      clientName: '',
                      registrationCountry:'',
                      businessActivityCountry:'',
                      mainActivity:'',
                      paidCapitalL:'',
                      annualBusinessVolume:'',
                      website:'',
                      NameofContact:''

    });
    const [q1Answer, setQ1Answer] = useState('');
    const [q2Answer, setQ2Answer] = useState('');
    const [q3Answer, setQ3Answer] = useState('');
    const [q4Answer, setQ4Answer] = useState('');
    const [q5Answer, setQ5Answer] = useState('');

    
    // Handle change for question 1
    const handleQ1Change = (e) => {
      setQ1Answer(e.target.value);
    };
    
    // Handle change for question 2
    const handleQ2Change = (e) => {
      setQ2Answer(e.target.value);
    };
    const handleQ3Change = (e) => {
        setQ3Answer(e.target.value);
      };
      const handleQ4Change = (e) => {
        setQ4Answer(e.target.value);
      };
      const handleQ5Change = (e) => {
        setQ5Answer(e.target.value);
      };
  
    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
    
        if (type === "checkbox") {
            console.log('check1');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked
            }));
        } else {
            console.log('check2');

            if (name.startsWith("investmentGoals.")) {
                console.log('check2 inside if');

                const goalName = name.split(".")[1];
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    investmentGoals: {
                        ...prevFormData.investmentGoals,
                        [goalName]: value
                    }
                }));
            } else {
                console.log('else');
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            }
        }
    };
    const handleChange2 = (event) => {
        const { name, type, checked, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          investmentGoals: {
            ...prevFormData.investmentGoals,
            [name]: type === "checkbox" ? checked : value
          }
        }));
      };
    
      const [answers, setAnswers] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
      });
      const handleOptionChange = (question, points) => {
        setAnswers({ ...answers, [question]: points });
      };
    
      const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

      const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await axios.post("https://itqan-strapi.softylus.com/api/companies-logins", { data: formData }, {
                headers: {
                    'Content-Type': 'application/json',              
                    "Authorization": "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c"
                }
            });
            if (response.status === 200 ) {
                setFormSubmitted(true);
                setFormData({
                    fullName: '',
                    nationality: '',
                    gender: '',
                    title:'',
                    investorInformation:'', 
                    identityType: '',
                    relationship: '',
                    nationality: '',
                    idType: '',
                    idNumber: '',
                    placeOfIssue: '',
                    issueDate: '',
                    expiryDate: '',
                    identityNumber: '',
                    issueDate: '',
                    expirationDate: '',
                    placeOfIssue: '',
                    dateOfBirth: '',
                    maritalStatus: '',
                    numberOfDependents: '',
                    housingType: '',
                    otherFinancialInfo:'',
                    namesOfDirectors:'',
                    namesOfNaturalPersons:'',
                    isPubliclyListed:'',
                    residenceAddress: '',
                    postalCode: '',
                    poBox: '',
                    country: '',
                    city: '',
                    mobileNumber: '',
                    homePhone: '',
                    email: '',
                    Building:'',
                    Currency:'',
                    telephoneNumber: '',
                    Correspondence:'',
                    correspondenceLanguage: '',
                    messageTime: '',
                    communicationMethod: '',
                    annualIncome: '',
                    incomeSource: '',
                    mainActivity: '',
                    netWorth: '',
                    academicQualifications: '',
                    employmentStatus: '',
                    employmentCategory: '',
                    employerName: '',
                    jobTitle: '',
                    YearsEmployment:'',
                    employmentDate: '',
                    employerAddress: '',
                    employerPostalCode: '',
                    employerPOBox: '',
                    employerCountry: '',
                    employerCity: '',
                    employerFax: '',
                    employerPhone: '',
                    passportIssuePlace: '',
                    passportNumber: '',
                    passportIssueDate: '',
                    passportExpirationDate: '',
                    passportName: '',
                    originCountryAddress: '',
                    agreementType: '',
                    Sector:'',
                    financialExperience:'',
                    otherFinancialExperience:'',
                    inheritorsAgentFaxNo:'',
                    inheritorsAgentSignature:'',
                    inheritorsAgentPlaceOfIssue:'',
                    inheritorsAgentTelNo:'',
                    inheritorsAgentIssueDate:'',
                    inheritorsAgentIdType:'',
                    inheritorsAgentId:'',
                    inheritorsAgentExpiryDate:'',
                    inheritorsAgentName:'',
                    fatherGuardianMinor:'',
                    inheritorsAgent:'',
                    illiterateBlindWitness:'',
                    veiledWomanId:'',
                    incompetentLegalGuardian:'',
                    investmentKnowledgeDescription:'' ,
                                investmentYears:'' ,
                                previousInvestments:'' ,
                                professionalCertificates:'' ,
                                loanToInvestedMoneyRatio:'' ,
                                marginTransactions:'' ,
                                securitiesTransactionsOutsideKingdom:'' ,
                                countriesForSecuritiesTransactions:'' ,
                                riskAppetite: '',
                                investmentGoals: {
                                    capitalProtection: '',
                                    incomeGeneration: '',
                                    balanced: '',
                                    capitalGrowth: '',
                                    retirementSavings: '',
                                    projectFinancing: '',
                                    assetPurchase: '',
                                    other: ""
                                  },
                                  saudiAssets: '',
                                  foreignCurrencyAssets: '',
                                  selectedCurrencies: "",
                                  expectedDuration: '',
                                  clientCurrentWalletdepositsMurabah: "",
                                  idealportfoliofortheclientdepositsMurabah: "",
                                  clientCurrentWalletdebitInstruments: "",
                                  idealportfoliofortheclientdebitInstruments: "",
                                  clientCurrentWalletequity: "",
                                  idealportfoliofortheclientequity: "",
                                  clientCurrentWalletinvestmentFund: "",
                                  idealportfoliofortheclientinvestmentFund: "",
                                  clientCurrentWalletrealEstate: "",
                                  idealportfoliofortheclientrealEstate: "",
                                  clientCurrentWalletderivativesContracts: "",
                                  idealportfoliofortheclientderivativesContracts: "",
                                  clientCurrentWalletalternativeInvestments: "",
                                  idealportfoliofortheclientalternativeInvestments: "",
                                  accountNumber:'' ,
                                  custodianName:'' ,
                                  custodianAddress:'' ,
                                  clientCertificates: '',
                                  custodianCertificates: '',
                                  OtherPartiesCertificates:'' ,
                                  clientDividends: '',
                                  custodianDividends: '',
                                  OtherPartiesDividends:'' ,
                                  clientSalesProceed: '',
                                  custodianSalesProceed: '',
                                  OtherPartiesSalesProceed:'' ,
                                  recommendation: '',
                                  signature: '', // This should be handled differently as it's a file upload
                                  clientName: '',
                                  registrationCountry:'',
                                  businessActivityCountry:'',
                                  mainActivity:'',
                                  paidCapitalL:'',
                                  annualBusinessVolume:'',
                                  website:'',
                                  NameofContact:''
                      
                });
            } else {
                setFormError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setFormError(true);
        }
    };
    const calculateTotalPoints = () => {
        let totalPoints = 0;
    
        totalPoints += parseInt(q1Answer);
        totalPoints += parseInt(q2Answer);
        totalPoints += parseInt(q3Answer);
        totalPoints += parseInt(q4Answer);
        totalPoints += parseInt(q5Answer);
    
        return totalPoints;
      };
      const { locale } = useLocalization();
      const handleChange5 = (index, event) => {
        const newAuthorizedPersonNames = [...formData.authorizedPersonNames];
        newAuthorizedPersonNames[index] = event.target.value;
        setFormData({ ...formData, authorizedPersonNames: newAuthorizedPersonNames });
    
      };
      const handleAddAnother = () => {
        setFormData({
          ...formData,
          authorizedPersonNames: [...formData.authorizedPersonNames, '']
        });
      };
    return (
        <Layout>
        <Seo title="فتح حساب للشركات - خدمة العملاء - إتقان كابيتال" description="اتفق على شروط وأحكام فتح حساب استثماري للأفراد مع إتقان كابيتال. ملء النموذج بالمعلومات المطلوبة لبدء عملية الفتح. تقديم الطلب الآن واحصل على حسابك الاستثماري الخاص."/>
                    <ScrollToTopButton/>
                    <Hero title={<FormattedMessage id="companyAccount.title" />} />
                    <section className='individuals-login-sec'>
                    <div className='individuals-login-container'>
                    <div className='individuals-login-title'>
                        <h1><FormattedMessage id="investmentAccountAgreement.title" /></h1>
                        <p><FormattedMessage id="investmentAccountAgreement.chooseAccountType" /></p>
                        <div className='individuals-login-buttons'>
                            <Link to="/companies-login">
                            <button style={{ background:"#3F1A58", color:"#FFFFFF" }}>
                                <FormattedMessage id="investmentAccountAgreement.companyAccount" />
                            </button>
                            </Link>
                            <Link to={`/${locale}/Individuals-login`}>
                            <button style={{ background:"none", color:"#46235E" }}>
                                <FormattedMessage id="investmentAccountAgreement.individualAccount" />
                            </button>
                            </Link>
                        </div>
                        </div>
                    <form className='individuals-login-field' onSubmit={handleSubmit}>
                    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="companyInformation.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.companyName" /></label>
            <input name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.legalEntity" /></label>
            <input name="legalEntity" value={formData.legalEntity} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.unifiedNumber" /></label>
            <input name="unifiedNumber" value={formData.unifiedNumber} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.commercialRegistrationNumber" /></label>
            <input name="commercialRegistrationNumber" value={formData.commercialRegistrationNumber} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.establishmentDate" /></label>
            <input type="date" name="establishmentDate" value={formData.establishmentDate} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.registeredAddress" /></label>
            <input name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.buildingNumber" /></label>
            <input name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.streetName" /></label>
            <input name="streetName" value={formData.streetName} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.district" /></label>
            <input name="district" value={formData.district} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.city" /></label>
            <input name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.postalCode" /></label>
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.additionalNumber" /></label>
            <input name="additionalNumber" value={formData.additionalNumber} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.registrationCountry" /></label>
            <input name="registrationCountry" value={formData.registrationCountry} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.businessActivityCountry" /></label>
            <input name="businessActivityCountry" value={formData.businessActivityCountry} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.mainActivity" /></label>
            <input name="mainActivity" value={formData.mainActivity} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.numberOfEmployees" /></label>
            <input name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.paidCapital" /></label>
            <input name="paidCapital" value={formData.paidCapital} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.annualBusinessVolume" /></label>
            <input name="annualBusinessVolume" value={formData.annualBusinessVolume} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.phone" /></label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="companyInformation.website" /></label>
            <input name="website" value={formData.website} onChange={handleChange} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="accountStatements.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="accountStatements.selectLabel" /></label>
            <select id="Correspondence" name="Correspondence" value={formData.Correspondence} onChange={handleChange}>
              <option value=""><FormattedMessage id="accountStatements.selectPlaceholder" /></option>
              <option value="Per Transaction"><FormattedMessage id="accountStatements.perTransaction" /></option>
              <option value="Daily"><FormattedMessage id="accountStatements.daily" /></option>
              <option value="Monthly"><FormattedMessage id="accountStatements.monthly" /></option>
              <option value="Upon Request"><FormattedMessage id="accountStatements.uponRequest" /></option>
            </select>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="contactInformation.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="contactInformation.contactNameLabel" /></label>
            <input name="contactName" value={formData.contactName} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="contactInformation.businessPhoneLabel" /></label>
            <input name="businessPhone" value={formData.businessPhone} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="contactInformation.emailLabel" /></label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="contactInformation.mobileNumberLabel" /></label>
            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="contactInformation.correspondenceAddressLabel" /></label>
            <input name="correspondenceAddress" value={formData.correspondenceAddress} onChange={handleChange} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="bankAccountInformation.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.bankNameLabel" /></label>
            <input name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.accountOwnerNameLabel" /></label>
            <input name="accountOwnerName" value={formData.accountOwnerName} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.mainAccountLabel" /></label>
            <input name="mainAccount" value={formData.mainAccount} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.branchLabel" /></label>
            <input name="branch" value={formData.branch} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.countryLabel" /></label>
            <input name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="bankAccountInformation.currencyLabel" /></label>
            <input name="currency" value={formData.currency} onChange={handleChange} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
        
        
        
        
       
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="generalInformation.titlea" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="generalInformation.isPubliclyListedLabel" /></label>
            <select name="isPubliclyListed" value={formData.isPubliclyListed} onChange={handleChange}>
              <option value="">-- <FormattedMessage id="generalInformation.selectOption" /> --</option>
              <option value="نعم"><FormattedMessage id="generalInformation.yesOption" /></option>
              <option value="لا"><FormattedMessage id="generalInformation.noOption" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="generalInformation.namesOfNaturalPersonsLabel" /></label>
            <input name="namesOfNaturalPersons" value={formData.namesOfNaturalPersons} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="generalInformation.namesOfDirectorsLabel" /></label>
            <input name="namesOfDirectors" value={formData.namesOfDirectors} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="generalInformation.otherFinancialInfoLabel" /></label>
            <input name="otherFinancialInfo" value={formData.otherFinancialInfo} onChange={handleChange} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="authorizedPersons.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
            {formData.authorizedPersonNames.map((name, index) => (
            <div key={index} className='individuals-single-field'>
              <label><FormattedMessage id="authorizedPersons.authorizedNameLabel" /></label>
              <div className='rebeted-form'>
              <input
                name={`authorizedPersonName-${index}`}
                value={name}
                onChange={(e) => handleChange(index, e)}
              />
               {index === formData.authorizedPersonNames.length - 1 && ( // Show add button only for the last input field
                <button onClick={handleAddAnother}>+</button>
              )}
             </div>
            </div>
          ))}
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.relationshipLabel" /></label>
            <input name="relationship" value={formData.relationship} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.nationalityLabel" /></label>
            <input name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.idTypeLabel" /></label>
            <select name="idType" value={formData.idType} onChange={handleChange}>
              <option value="">-- <FormattedMessage id="authorizedPersons.selectOption" /> --</option>
              <option value="Family ID"><FormattedMessage id="authorizedPersons.familyIdOption" /></option>
              <option value="National ID"><FormattedMessage id="authorizedPersons.nationalIdOption" /></option>
              <option value="Passport"><FormattedMessage id="authorizedPersons.passportOption" /></option>
              <option value="Residence"><FormattedMessage id="authorizedPersons.residenceOption" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.idNumberLabel" /></label>
            <input name="idNumber" value={formData.idNumber} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.placeOfIssueLabel" /></label>
            <input name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.issueDateLabel" /></label>
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="authorizedPersons.expiryDateLabel" /></label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="individuals-login-field"
        className='individuals-sec-field-title'
  >
<h3>
        <FormattedMessage id="header.custodianInfo" />
      </h3>  </AccordionSummary>
  <AccordionDetails>
  <div className='individuals-sec-field'>
      <div className='individuals-single-field'>
        <label>
          <FormattedMessage id="form.accountNumber" />
        </label>
        <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
      </div>
      <div className='individuals-single-field'>
        <label>
          <FormattedMessage id="form.custodianName" />
        </label>
        <input name="custodianName" value={formData.custodianName} onChange={handleChange} />
      </div>
      <div className='individuals-single-field'>
        <label>
          <FormattedMessage id="form.custodianAddress" />
        </label>
        <input name="custodianAddress" value={formData.custodianAddress} onChange={handleChange} />
      </div>
    </div>
    <div className='individuals-sec-field table'>
  <table>
  <thead>
        <tr>
          <th>
            <FormattedMessage id="tableHeader.sendTo" />
          </th>
          <th>
            <FormattedMessage id="tableHeader.client" />
          </th>
          <th>
            <FormattedMessage id="tableHeader.custodian" />
          </th>
          <th>
            <FormattedMessage id="tableHeader.otherEntities" />
          </th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td>
          <label>الشهادات Certificates</label>
        </td>
        <td className='checkbox'>          <input type="checkbox" name="clientCertificates" checked={formData.clientCertificates} onChange={handleChange} /></td>
        <td className='checkbox'>
          <input type="checkbox" name="custodianCertificates" checked={formData.custodianCertificates} onChange={handleChange} />
        </td>
        <td>        <input name="OtherPartiesCertificates" value={formData.OtherPartiesCertificates} onChange={handleChange} /></td>
      </tr>
      <tr>
        <td>
          <label>حصص الأرباح أو أي دخل آخر Dividends or any other income</label>
        </td>
        <td className='checkbox'>          <input type="checkbox" name="clientDividends" checked={formData.clientDividends} onChange={handleChange} />
</td>
        <td className='checkbox'>
          <input type="checkbox" name="custodianDividends" checked={formData.custodianDividends} onChange={handleChange} />
        </td>
        <td >        <input name="OtherPartiesDividends" value={formData.OtherPartiesDividends} onChange={handleChange} /></td>

      </tr>
      <tr>
        <td>
          <label>حصيلة البيع/ Sales proceed</label>
        </td>
        <td className='checkbox'>          <input type="checkbox" name="clientSalesProceed" checked={formData.clientSalesProceed} onChange={handleChange} /></td>
        <td className='checkbox' >
          <input type="checkbox" name="custodianSalesProceed" checked={formData.custodianSalesProceed} onChange={handleChange} />
        </td>
        <td>        <input name="OtherPartiesSalesProceed" value={formData.OtherPartiesSalesProceed} onChange={handleChange} /></td>

      </tr>
    </tbody>
  </table>
</div>

  </AccordionDetails>
  </Accordion>
       
  <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="investmentKnowledge.title" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.knowledgeDescriptionLabel" /></label>
            <select name="investmentKnowledgeDescription" value={formData.investmentKnowledgeDescription} onChange={handleChange}>
            <option value=""><FormattedMessage id="generalInformation.expectedDuration.placeholder" /></option>

              <option value="Extensive"><FormattedMessage id="investmentKnowledge.extensiveOption" /></option>
              <option value="Good"><FormattedMessage id="investmentKnowledge.goodOption" /></option>
              <option value="Limited"><FormattedMessage id="investmentKnowledge.limitedOption" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.investmentYearsLabel" /></label>
            <input type="number" name="investmentYears" value={formData.investmentYears} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.previousInvestmentsLabel" /></label>
            <input type="text" name="previousInvestments" value={formData.previousInvestments} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.professionalCertificatesLabel" /></label>
            <input type="text" name="professionalCertificates" value={formData.professionalCertificates} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.loanToInvestedMoneyRatioLabel" /></label>
            <input type="text" name="loanToInvestedMoneyRatio" value={formData.loanToInvestedMoneyRatio} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.marginTransactionsLabel" /></label>
            <input type="text" name="marginTransactions" value={formData.marginTransactions} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.securitiesTransactionsOutsideKingdomLabel" /></label>
            <input type="text" name="securitiesTransactionsOutsideKingdom" value={formData.securitiesTransactionsOutsideKingdom} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.countriesForSecuritiesTransactionsLabel" /></label>
            <input type="text" name="countriesForSecuritiesTransactions" value={formData.countriesForSecuritiesTransactions} onChange={handleChange} />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="investmentKnowledge.riskAppetiteLabel" /></label>
            <select name="riskAppetite" value={formData.riskAppetite} onChange={handleChange}>
            <option value=""><FormattedMessage id="generalInformation.expectedDuration.placeholder" /></option>

              <option value="Extensive"><FormattedMessage id="investmentKnowledge.extensiveOption" /></option>
              <option value="Good"><FormattedMessage id="investmentKnowledge.goodOption" /></option>
              <option value="Limited"><FormattedMessage id="investmentKnowledge.limitedOption" /></option>
            </select>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="individuals-login-field"
                className='individuals-sec-field-title'
            >
        <h3><FormattedMessage id="investmentGoals.title" /></h3>
        </AccordionSummary>
            <AccordionDetails>
                <div className='individuals-sec-field'>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.capitalProtectionLabel" /></label>
                        <input type="checkbox" name="capitalProtection" checked={formData.investmentGoals.capitalProtection} onChange={handleChange2} />
                    </div>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.incomeGenerationLabel" /></label>
                        <input type="checkbox" name="incomeGeneration" checked={formData.investmentGoals.incomeGeneration} onChange={handleChange2} />
                    </div>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.balancedLabel" /></label>
                        <input type="checkbox" name="balanced" checked={formData.investmentGoals.balanced} onChange={handleChange2} />
                    </div>
                    </div>
                    <div className='individuals-sec-field'>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.capitalGrowthLabel" /></label>
                        <input type="checkbox" name="capitalGrowth" checked={formData.investmentGoals.capitalGrowth} onChange={handleChange2} />
                    </div>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.retirementSavingsLabel" /></label>
                        <input type="checkbox" name="retirementSavings" checked={formData.investmentGoals.retirementSavings} onChange={handleChange2} />
                    </div>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.projectFinancingLabel" /></label>
                        <input type="checkbox" name="projectFinancing" checked={formData.investmentGoals.projectFinancing} onChange={handleChange2} />
                    </div>
                    </div>
                    <div className='individuals-sec-field'>
                    <div className='individuals-single-field checkbox'>
                        <label><FormattedMessage id="investmentGoals.assetPurchaseLabel" /> </label>
                        <input type="checkbox" name="assetPurchase" checked={formData.investmentGoals.assetPurchase} onChange={handleChange2} />
                    </div>
                    </div>
                    <div className='individuals-sec-field'>
                    <div className='individuals-single-field '>
                        <label><FormattedMessage id="investmentGoals.otherLabel" /></label>
                        <input type="text" name="otherInvestmentGoal" value={formData.investmentGoals.other} onChange={handleChange2} />
                    </div>
                   
                </div>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="individuals-login-field"
                className='individuals-sec-field-title'
            >
        <h3><FormattedMessage id="investmentAssets.title" /></h3>
        </AccordionSummary>
            <AccordionDetails>
            <label><FormattedMessage id="investmentAssets.chooseMultipleCategories" /></label>
            <div className='individuals-sec-field'>
                <div className='individuals-single-field checkbox'>
                <label><FormattedMessage id="investmentAssets.saudiAssetsLabel" /></label>
                <input type="checkbox" name="saudiAssets" checked={formData.saudiAssets} onChange={handleChange} />
                </div>
                <div className='individuals-single-field checkbox'>
                <label><FormattedMessage id="investmentAssets.foreignCurrencyAssetsLabel" /></label>
                <input type="checkbox" name="foreignCurrencyAssets" checked={formData.foreignCurrencyAssets} onChange={handleChange} />
                </div>
            </div>
            <div className='individuals-sec-field'>
                {formData.foreignCurrencyAssets && (
                    <div className='individuals-single-field'>
              <label><FormattedMessage id="investmentAssets.selectForeignCurrenciesLabel" /></label>
              <input type="text" name="selectedForeignCurrencies" value={formData.selectedForeignCurrencies} onChange={handleChange} />
                    </div>
                )}
            </div>
        </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
    >
      <h3><FormattedMessage id="investmentPortfolioInformation.heading" /></h3>
      </AccordionSummary>
    <AccordionDetails>
    <div className='individuals-sec-field table'>

    <table>
    <thead>
        <tr>
          <th>
            <FormattedMessage id="tableHeader.investmentTools" />
          </th>
          <th>
            <FormattedMessage id="tableHeader.currentClientPortfolio" />
          </th>
          <th>
            <FormattedMessage id="tableHeader.idealClientPortfolio" />
          </th>
        </tr>
      </thead>
  <tbody>
    <tr>
    <td>Deposits/Murabah (ودائع ومرابحات)</td>
    <td><input type="text" name="clientCurrentWalletdepositsMurabah" value={formData.clientCurrentWalletdepositsMurabah} onChange={handleChange} /></td>
      <td><input type="text" name="idealportfoliofortheclientdepositsMurabah" value={formData.idealportfoliofortheclientdepositsMurabah} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Debit Instruments (أدوات دين)</td>
      <td><input type="text" name="clientCurrentWalletdebitInstruments" value={formData.clientCurrentWalletdebitInstruments} onChange={handleChange} /></td>

      <td><input type="text" name="idealportfoliofortheclientdebitInstruments" value={formData.idealportfoliofortheclientdebitInstruments} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Equity (أسهم)</td>
      <td><input type="text" name="clientCurrentWalletequity" value={formData.clientCurrentWalletequity} onChange={handleChange} /></td>
    
      <td><input type="text" name="idealportfoliofortheclientequity" value={formData.idealportfoliofortheclientequity} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Investment Fund (صناديق استثمارية)</td>
      <td><input type="text" name="clientCurrentWalletinvestmentFund" value={formData.clientCurrentWalletinvestmentFund} onChange={handleChange} /></td>
      <td><input type="text" name="idealportfoliofortheclientinvestmentFund" value={formData.idealportfoliofortheclientinvestmentFund} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Real estate (عقارات)</td>

      <td><input type="text" name="clientCurrentWalletrealEstate" value={formData.clientCurrentWalletrealEstate} onChange={handleChange} /></td>
      <td><input type="text" name="idealportfoliofortheclientrealEstate" value={formData.idealportfoliofortheclientrealEstate} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Derivatives contracts (عقود مشتقات)</td>
    <td><input type="text" name="clientCurrentWalletderivativesContracts" value={formData.clientCurrentWalletderivativesContracts} onChange={handleChange} /></td>
   
      <td><input type="text" name="idealportfoliofortheclientderivativesContracts" value={formData.idealportfoliofortheclientderivativesContracts} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td>Alternative Investments (استثمارات بديلة)</td>
    <td><input type="text" name="clientCurrentWalletalternativeInvestments" value={formData.clientCurrentWalletalternativeInvestments} onChange={handleChange} /></td>

      <td><input type="text" name="idealportfoliofortheclientalternativeInvestments" value={formData.idealportfoliofortheclientalternativeInvestments} onChange={handleChange} /></td>
    </tr>
    <tr>
    <td >
            <FormattedMessage id="tableData.checkPercentageSum" />
          </td>    
    <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>
</AccordionDetails>
</Accordion>
        
<Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="individuals-login-field"
        className='individuals-sec-field-title'
      >
        <h3><FormattedMessage id="accordion.sectionTitle" /></h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.q1" /></label>
            <select value={q1Answer} onChange={(e) => setQ1Answer(e.target.value)}>
            <option value=""><FormattedMessage id="question.selectOption" /></option>

              <option value="1"><FormattedMessage id="question.q1.option1" /></option>
              <option value="2"><FormattedMessage id="question.q1.option2" /></option>
              <option value="3"><FormattedMessage id="question.q1.option3" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.q2" /></label>
            <select value={q2Answer} onChange={(e) => setQ2Answer(e.target.value)}>
            <option value=""><FormattedMessage id="question.selectOption" /></option>

              <option value="1"><FormattedMessage id="question.q2.option1" /></option>
              <option value="2"><FormattedMessage id="question.q2.option2" /></option>
              <option value="3"><FormattedMessage id="question.q2.option3" /></option>
              <option value="4"><FormattedMessage id="question.q2.option4" /></option>
            </select>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.q3" /></label>
            <select value={q3Answer} onChange={handleQ3Change}>
              <option value=""><FormattedMessage id="question.selectOption" /></option>
              <option value="1"><FormattedMessage id="question.q3.option1" /></option>
              <option value="2"><FormattedMessage id="question.q3.option2" /></option>
              <option value="3"><FormattedMessage id="question.q3.option3" /></option>
              <option value="4"><FormattedMessage id="question.q3.option4" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.q4" /></label>
            <select value={q4Answer} onChange={handleQ4Change}>
              <option value=""><FormattedMessage id="question.selectOption" /></option>
              <option value="1"><FormattedMessage id="question.q4.option1" /></option>
              <option value="2"><FormattedMessage id="question.q4.option2" /></option>
              <option value="3"><FormattedMessage id="question.q4.option3" /></option>
              <option value="4"><FormattedMessage id="question.q4.option4" /></option>
            </select>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.q5" /></label>
            <select value={q5Answer} onChange={handleQ5Change}>
              <option value=""><FormattedMessage id="question.selectOption" /></option>
              <option value="1"><FormattedMessage id="question.q5.option1" /></option>
              <option value="2"><FormattedMessage id="question.q5.option2" /></option>
              <option value="3"><FormattedMessage id="question.q5.option3" /></option>
              <option value="4"><FormattedMessage id="question.q5.option4" /></option>
            </select>
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.totalPoints" /></label>
            <div className='calculateTotalPoints'><h4>{calculateTotalPoints()}</h4></div>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="result.lowRisk" /></label>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="result.mediumRisk" /></label>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="result.highRisk" /></label>
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.investmentDesire" /></label>
            <input
              name="investmentDesire"
              value={formData.investmentDesire}
              onChange={handleChange}
            />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.recommendation" /> {calculateTotalPoints() >= 1 && calculateTotalPoints() <= 6 && (
          <FormattedMessage id="lowRisk" />
        )}
        {calculateTotalPoints() >= 7 && calculateTotalPoints() <= 15 && (
          <FormattedMessage id="mediumRisk" />
        )}
        {calculateTotalPoints() > 15 && (
          <FormattedMessage id="highRisk" />
        )}</label>
            <input
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='individuals-sec-field'>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.signature" /></label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              value={formData.signature}
              onChange={handleChange}
            />
          </div>
          <div className='individuals-single-field'>
            <label><FormattedMessage id="question.clientName" /></label>
            <input
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>

    <button type='submit' className='individuals-buttom-form'>
        <FormattedMessage id="form.submit" />
      </button>
      <Modal isOpen={formSubmitted || formError} onRequestClose={() => {setFormSubmitted(false); setFormError(false);}}>
        {formSubmitted ? (
          <div className='Contact-successfuly'>
            <button onClick={() => {setFormSubmitted(false);}}>
              <img src='/close.svg' alt="Close" />
            </button>
            <div className='Contact-successfuly-body'> 
              <Player
                autoplay
                loop
                src={Successfully} 
                style={{ height: '200px', width: '200px' }} 
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>  
              <h4><FormattedMessage id="form.success" /></h4>
            </div>
          </div>
        ) : (
          <div className='Contact-error'>
            <button onClick={() => {setFormError(false);}}>
              <img src='/close.svg' alt="Close" />
            </button>
            <div className='Contact-error-body'>
              <Player
                autoplay
                loop
                src={Fail} 
                style={{ height: '200px', width: '200px' }} 
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>  
              <h4><FormattedMessage id="form.error" /></h4>
            </div>
          </div>
        )}
      </Modal>
            </form>
            </div>
            </section>
        </Layout>
            )
}

export default CompaniesLogin