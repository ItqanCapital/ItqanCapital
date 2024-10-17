import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "../components/layout";
import { Link } from "gatsby";
import "../components/style/IndividualsLogin.css";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Seo from '../components/seo';
import Modal from 'react-modal';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Successfully from "../Json/Successfully.json";
import Fail from "../Json/fail.json";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Checkbox, TextField } from '@mui/material';
import Hero from '../components/Hero';

const IndividualsLogin = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const { locale } = useLocalization();

    const initialValues = {
      fullName: '',
      nationality: '',
      seniorPosition:'',
      familyRelationship:'',
      accountOwnership:'',
      gender: '',
      title:'',
      investorInformation:'', 
      identityType: '',
      identityNumber: '',
      issueDate: '',
      expirationDate: '',
      placeOfIssue: '',
      dateOfBirth: '',
      maritalStatus: '',
      numberOfDependents: '',
      postalCode: '',
      poBox: '',
      country: '',
      city: '',
      mobileNumber: '',
      email: '',
      Building:'',
      Currency:'',
      telephoneNumber: '',
      Correspondence:'',
      correspondenceLanguage: '',
      communicationMethod: '',
      annualIncome: '',
      incomeSource: '',
      netWorth: '',
      academicQualifications: '',
      employmentCategory: '',
      employerName: '',
      jobTitle: '',
      employerAddress: '',
      employerPhone: '',
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
                      capitalProtection: false,
                      incomeGeneration: false,
                      balanced: false,
                      capitalGrowth: false,
                      retirementSavings: false,
                      projectFinancing: false,
                      assetPurchase: false,
                      other: ""
                    },
                    saudiAssets: false,
                    financialSituationInfo:'',
                    selectedForeignCurrencies:'',
                    foreignCurrencyAssets: false,
                    expectedDuration: '',
                    bankAccountOwnership: '',
                    boardMembership: '',
                    companyName: '',
                    idealportfoliofortheclientdepositsMurabah: "",
                    idealportfoliofortheclientdebitInstruments: "",
                    idealportfoliofortheclientequity: "",
                    idealportfoliofortheclientinvestmentFund: "",
                    idealportfoliofortheclientrealEstate: "",
                    idealportfoliofortheclientderivativesContracts: "",
                    idealportfoliofortheclientalternativeInvestments: "",
                    accountNumber:'' ,
                    custodianName:'' ,
                    custodianAddress:'' ,
                    custodianCertificates: '',
                    custodianDividends: '',
                    signature: '', // This should be handled differently as it's a file upload
                    clientName: '',
                    investmentDesire: '',
                    q1Answer: '',
                    q2Answer: '',
                    q3Answer: '',
                    q4Answer: '',
                    q5Answer: '',
                    yearsEmployment:'',
                    beneficialOwnership:'',
                    bankName:'',
                    ibanNumber:'',
                    bankBranch:'',
                    bankCity:''

      };
      const errorIcon = <div><img src='/fail.svg'/><FormattedMessage id="error.required" /></div>;
      const [showPassword, setShowPassword] = useState(false);
      const validationSchema = Yup.object().shape({
        investorInformation: Yup.string().required(errorIcon),
        telephoneNumber: Yup.string().required(errorIcon),
        Building: Yup.string().required(errorIcon),
        incompetentLegalGuardian: Yup.string().required(errorIcon),
        veiledWomanId: Yup.string().required(errorIcon),
        illiterateBlindWitness: Yup.string().required(errorIcon),
        inheritorsAgent: Yup.string().required(errorIcon),
        fatherGuardianMinor: Yup.string().required(errorIcon),
        inheritorsAgentName: Yup.string().required(errorIcon),
        inheritorsAgentId: Yup.string().required(errorIcon),
        inheritorsAgentIdType: Yup.string().required(errorIcon),
        inheritorsAgentExpiryDate: Yup.string().required(errorIcon),
        inheritorsAgentIssueDate: Yup.string().required(errorIcon),
        inheritorsAgentTelNo: Yup.string().required(errorIcon),
        inheritorsAgentPlaceOfIssue: Yup.string().required(errorIcon), // Not required
        inheritorsAgentSignature: Yup.string(), // Not required
        inheritorsAgentFaxNo: Yup.string(), // Not required
        correspondenceLanguage: Yup.string().required(errorIcon),
        financialExperience: Yup.string().required(errorIcon),
        otherFinancialExperience: Yup.string().required(errorIcon),
        academicQualifications: Yup.string().required(errorIcon),
        Sector: Yup.string().required(errorIcon),
        employmentCategory: Yup.string().required(errorIcon),
        employerName: Yup.string().required(errorIcon),
        jobTitle: Yup.string().required(errorIcon),
        employerAddress: Yup.string().required(errorIcon),
        yearsEmployment: Yup.number().required(errorIcon).positive().integer(),
        employerPhone: Yup.string().required(errorIcon),
        q1Answer: Yup.string().required(errorIcon),
        q2Answer: Yup.string().required(errorIcon),
        q3Answer: Yup.string().required(errorIcon),
        q4Answer: Yup.string().required(errorIcon),
        q5Answer: Yup.string().required(errorIcon),
        investmentDesire: Yup.string().required(errorIcon),
        clientName: Yup.string().required(errorIcon),
        accountNumber: Yup.string().required(errorIcon),
        custodianName: Yup.string().required(errorIcon),
        custodianAddress: Yup.string().required(errorIcon),
        incomeSource: Yup.string().required(errorIcon),
        communicationMethod: Yup.string().required(errorIcon),
        Correspondence: Yup.string().required(errorIcon),
        annualIncome: Yup.string().required(errorIcon),
        investmentKnowledgeDescription: Yup.string().required(errorIcon),
        investmentYears: Yup.number().required(errorIcon).positive().integer(),
        previousInvestments: Yup.string().required(errorIcon),
        professionalCertificates: Yup.string().required(errorIcon),
        loanToInvestedMoneyRatio: Yup.string().required(errorIcon),
        marginTransactions: Yup.string().required(errorIcon),
        securitiesTransactionsOutsideKingdom: Yup.string().required(errorIcon),
        countriesForSecuritiesTransactions: Yup.string().required(errorIcon),
        riskAppetite: Yup.string().required(errorIcon),
        netWorth: Yup.string().required(errorIcon),
        bankName: Yup.string().required(errorIcon),
        ibanNumber: Yup.string().required(errorIcon),
        bankBranch: Yup.string().required(errorIcon),
        bankCity: Yup.string().required(errorIcon),
        Currency: Yup.string().required(errorIcon),
        fullName: Yup.string().required(errorIcon),
      
        // ...  Your other validation rules 
      
        inheritorsAgentExpiryDate: Yup.string().required(errorIcon),
        inheritorsAgentIssueDate: Yup.string().required(errorIcon),
        inheritorsAgentTelNo: Yup.string().required(errorIcon),
        inheritorsAgentSignature: Yup.string().required(errorIcon), 
        nationality: Yup.string().required(errorIcon),
        gender: Yup.string().required(errorIcon),
        title: Yup.string().required(errorIcon),
        dateOfBirth: Yup.string().required(errorIcon),
        maritalStatus: Yup.string().required(errorIcon),
        numberOfDependents: Yup.number().required(errorIcon).positive().integer(),
        identityType: Yup.string().required(errorIcon),
        identityNumber: Yup.string().required(errorIcon),
        issueDate: Yup.string().required(errorIcon),
        expirationDate: Yup.string().required(errorIcon),
        placeOfIssue: Yup.string().required(errorIcon),
        postalCode: Yup.string().required(errorIcon),
        poBox: Yup.string().required(errorIcon),
        email: Yup.string().email(<FormattedMessage id="error.invalidEmail" />).required(errorIcon),
        mobileNumber: Yup.string().required(errorIcon),
        country: Yup.string().required(errorIcon),
        city: Yup.string().required(errorIcon),
        boardMembership: Yup.string().required(errorIcon),
        companyName: Yup.string().when("$boardMembership", {
            is: (val) => {
              //this will output admin
              console.log(val);
              return val === "Yes";
            },  
            then: (s) => s.required(),
            otherwise: (s) => s,
          }),
     
        investmentGoals: Yup.object().shape({
          capitalProtection: Yup.boolean(),
          incomeGeneration: Yup.boolean(),
          balanced: Yup.boolean(),
          capitalGrowth: Yup.boolean(),
          retirementSavings: Yup.boolean(),
          projectFinancing: Yup.boolean(),
          assetPurchase: Yup.boolean(),
          other: Yup.string().required(errorIcon)
        }).test('at-least-one', errorIcon, value => {
          return Object.values(value).some(v => v === true);
        }),
        seniorPosition: Yup.string().required(errorIcon),
        familyRelationship: Yup.string().required(errorIcon),
        accountOwnership: Yup.string().required(errorIcon),
        beneficialOwnership: Yup.string().when('$accountOwnership', {
            is: (val) => {
                //this will output admin
                console.log(val);
                return val === "No";
              },  
              then: (s) => s.required(),
              otherwise: (s) => s,
        }),
        bankAccountOwnership: Yup.string().required(errorIcon),
        expectedDuration: Yup.string().required(errorIcon),
        financialSituationInfo: Yup.string().required(errorIcon),
        inheritorsAgentFaxNo: Yup.string().required(errorIcon),
      });
      const handleSubmit = async (values, { setSubmitting, setTouched, resetForm }) => {
        console.log(values);

        function convertValuesToString(obj) {
            const result = {};
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (key === 'investmentGoals' && typeof obj[key] === 'object') {
                  // Convert investmentGoals object to a JSON string
                  result[key] = JSON.stringify(obj[key]);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                  // If the value is an object (including arrays), recursively convert its values
                  result[key] = convertValuesToString(obj[key]);
                } else {
                  // Convert the value to a string
                  result[key] = String(obj[key]);
                }
              }
            }
            
            // Add static values after looping
            result.staticValue1 = "This is a static value";
            result.staticValue2 = "Another static value";
            
            return result;
          }
          
        const convertedObject = convertValuesToString(values);

        // Set touched fields if needed (usually done for validation):
        setTouched({
          investorInformation: true,
          telephoneNumber: true,
          Building: true,
          // Continue to set others as true...
        });
    
        try {
          const response = await axios.post(
            "https://itqan-strapi.softylus.com/api/individuals-logins",
            { data: convertedObject }, // Make sure the structure matches your API
            {
              headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c" // Replace with your actual token
              }
            }
          );
    
          if (response.status === 200) {
            setFormSubmitted(true);
            resetForm();
          } else {
            setFormError(true);
          }
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
          setFormError(true);
        } finally {
          setSubmitting(false); // Essential for handling form submission states
        }
      };
    const rows = [
        { id: 'depositsMurabah', label: 'Deposits/Murabah (ودائع ومرابحات)' },
        { id: 'debitInstruments', label: 'Debit Instruments (أدوات دين)' },
        { id: 'equity', label: 'Equity (أسهم)' },
        { id: 'investmentFund', label: 'Investment Fund (صناديق استثمارية)' },
        { id: 'realEstate', label: 'Real estate (عقارات)' },
        { id: 'derivativesContracts', label: 'Derivatives contracts (عقود مشتقات)' },
        { id: 'alternativeInvestments', label: 'Alternative Investments (استثمارات بديلة)' },
      ];
      const rows2 = [
        { 
          id: 'Certificates', 
          label: 'الشهادات Certificates'
        },
        { 
          id: 'Dividends', 
          label: 'حصص الأرباح أو أي دخل آخر Dividends or any other income'
        },
        { 
          id: 'SalesProceed', 
          label: 'حصيلة البيع/ Sales proceed'
        }
      ];


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
  
        const calculateTotalPoints = (values) => {
            let totalPoints = 0;
        
            totalPoints += parseInt(values.q1Answer) || 0;   // Fallback to 0 if undefined or NaN
            totalPoints += parseInt(values.q2Answer) || 0;
            totalPoints += parseInt(values.q3Answer) || 0;
            totalPoints += parseInt(values.q4Answer) || 0;
            totalPoints += parseInt(values.q5Answer) || 0;
        
            return totalPoints;
        };

    return (
        <Layout>
            <Seo title="فتح حساب للأفراد - خدمة العملاء - إتقان كابيتال" description="اتفق على شروط وأحكام فتح حساب استثماري للأفراد مع إتقان كابيتال. ملء النموذج بالمعلومات المطلوبة لبدء عملية الفتح. تقديم الطلب الآن واحصل على حسابك الاستثماري الخاص." />
            <ScrollToTopButton />
            <Hero title={<FormattedMessage id="individualAccount.title" />} />

            <Modal isOpen={formSubmitted || formError} onRequestClose={() => { setFormSubmitted(false); setFormError(false); }}>
                {formSubmitted ? (
                    <div className='Contact-successfuly'>
                        <button onClick={() => { setFormSubmitted(false); }}>
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
                        <button onClick={() => { setFormError(false); }}>
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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
            {({ values, setFieldValue, touched ,errors,isSubmitting  }) => {
             console.log('Errors:', errors);
             return(
                    <Form>
                        <section className='individuals-login-sec'>
                            <div className='individuals-login-container'>
                                <div className='individuals-login-title'>
                                    <h1><FormattedMessage id="investment_account_agreement_title" /></h1>
                                    <p><FormattedMessage id="select_account_type" /></p>
                                    <div className='individuals-login-buttons'>
                                        <Link to={`/${locale}/companies-login`}>
                                            <button style={{ background: "none", color: "#46235E" }}>
                                                <FormattedMessage id="corporate_account" />
                                            </button>
                                        </Link>
                                        <Link to={`/${locale}/Individuals-login`}>
                                            <button style={{ background: "#3F1A58", color: "#FFFFFF" }}>
                                                <FormattedMessage id="individual_account" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className='individuals-login-field'>
                                <Accordion defaultExpanded>
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1-content"
                                      id="individuals-login-field"
                                      className='individuals-sec-field-title'
                                  >
                                      <h3><FormattedMessage id="personal_information_individuals" /></h3>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="investor_information" />
                                              <ErrorMessage name="investorInformation" component="div" className="error" />

                                              </label>
                                              <Field as="select" name="investorInformation" style={{
                                                    border: errors.investorInformation && touched.investorInformation ? '1px solid red' : '1px solid #ccc'
                                                }} >
                                                  <option value=""><FormattedMessage id="please_select" /></option>
                                                  <option value="New Account"><FormattedMessage id="new_account" /></option>
                                                  <option value="Additional account"><FormattedMessage id="additional_account" /></option>
                                                  <option value="Update Information"><FormattedMessage id="update_information" /></option>
                                              </Field>
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="full_name" />
                                              <ErrorMessage name="fullName" component="div" className="error" />
                                              </label>
                                              <Field name="fullName" style={{
                                                    border: errors.fullName && touched.fullName ? '1px solid red' : '1px solid #ccc'
                                                }}  />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="gender" /> 
                                              <ErrorMessage name="gender" component="div" className="error" />
                                              </label>
                                              <Field as="select" name="gender" style={{
                                                    border: errors.gender && touched.gender ? '1px solid red' : '1px solid #ccc'
                                                }} >
                                                  <option value=""><FormattedMessage id="please_select" /></option>
                                                  <option value="Male"><FormattedMessage id="male" /></option>
                                                  <option value="Female"><FormattedMessage id="female" /></option>
                                              </Field>
                                          </div>
                                      </div>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="investor_title" />                                              <ErrorMessage name="title" component="div" className="error" />
                                              </label>
                                              <Field style={{
                                                    border: errors.title && touched.title ? '1px solid red' : '1px solid #ccc'
                                                }}  as="select" name="title">
                                                  <option value=""><FormattedMessage id="please_select" /></option>
                                                  <option value="Mr."><FormattedMessage id="mr" /></option>
                                                  <option value="Mrs."><FormattedMessage id="mrs" /></option>
                                                  <option value="Miss."><FormattedMessage id="miss" /></option>
                                                  <option value="Dr."><FormattedMessage id="dr" /></option>
                                                  <option value="Eng."><FormattedMessage id="eng" /></option>
                                                  <option value="other"><FormattedMessage id="other" /></option>
                                              </Field>
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="date_of_birth" />                                              <ErrorMessage name="dateOfBirth" component="div" className="error" />
                                              </label>
                                              <Field type="date" name="dateOfBirth" 
                                              style={{
                                                border: errors.dateOfBirth && touched.dateOfBirth ? '1px solid red' : '1px solid #ccc'
                                            }} 
                                              />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="marital_status" />                                              <ErrorMessage name="maritalStatus" component="div" className="error" />
                                              </label>
                                              <Field as="select" name="maritalStatus" style={{
                                                border: errors.maritalStatus && touched.maritalStatus ? '1px solid red' : '1px solid #ccc'
                                            }} >
                                                  <option value=""><FormattedMessage id="please_select" /></option>
                                                  <option value="Single"><FormattedMessage id="single" /></option>
                                                  <option value="Married"><FormattedMessage id="married" /></option>
                                              </Field>
                                          </div>
                                      </div>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="number_of_dependents"   />                                              <ErrorMessage name="numberOfDependents" component="div" className="error" />
                                              </label>
                                              <Field type="number" name="numberOfDependents"style={{
                                                border: errors.numberOfDependents && touched.numberOfDependents ? '1px solid red' : '1px solid #ccc'
                                            }} />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="nationality" />                                              <ErrorMessage name="nationality" component="div" className="error" />
                                              </label>
                                              <Field name="nationality" 
                                              style={{
                                                border: errors.nationality && touched.nationality ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                      </div>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="identity_type" />                                              <ErrorMessage name="identityType" component="div" className="error" />
                                              </label>
                                              <Field as="select" name="identityType"
                                              style={{
                                                border: errors.identityType && touched.identityType ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              >
                                                  <option value=""><FormattedMessage id="please_select" /></option>
                                                  <option value="National ID"><FormattedMessage id="national_id" /></option>
                                                  <option value="Passport"><FormattedMessage id="passport" /></option>
                                                  <option value="Residence ID"><FormattedMessage id="residence_id" /></option>
                                                  <option value="Family Registration"><FormattedMessage id="family_registration" /></option>
                                                  <option value="Other"><FormattedMessage id="other" /></option>
                                              </Field>
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="identity_number" />                                              <ErrorMessage name="identityNumber" component="div" className="error" />
                                              </label>
                                              <Field name="identityNumber" 
                                              style={{
                                                border: errors.identityNumber && touched.identityNumber ? '1px solid red' : '1px solid #ccc'
                                            }}/>
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="issue_date" />                                              <ErrorMessage name="issueDate" component="div" className="error" />
                                              </label>
                                              <Field type="date" name="issueDate" 
                                              style={{
                                                border: errors.issueDate && touched.issueDate ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                      </div>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="expiration_date" />                                              <ErrorMessage name="expirationDate" component="div" className="error" />
                                              </label>
                                              <Field 
                                               style={{
                                                border: errors.expirationDate && touched.expirationDate ? '1px solid red' : '1px solid #ccc'
                                            }} 
                                              type="date" name="expirationDate" />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="place_of_issue" />                                              <ErrorMessage name="placeOfIssue" component="div" className="error" />
                                              </label>
                                              <Field
                                              style={{
                                                border: errors.placeOfIssue && touched.placeOfIssue ? '1px solid red' : '1px solid #ccc'
                                            }} 
                                              name="placeOfIssue" />
                                          </div>
                                      </div>
                                  </AccordionDetails>
                              </Accordion>

                                {/* Address Section */}
                                <Accordion defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="individuals-login-field"
                                        className='individuals-sec-field-title'
                                    >
                                        <h3><FormattedMessage id="address.title" /></h3>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='individuals-sec-field'>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="postalCode.label" />                                                <ErrorMessage name="postalCode" component="div" className="error" />
                                                </label>
                                                <Field name="postalCode"  style={{
                                                border: errors.postalCode && touched.postalCode ? '1px solid red' : '1px solid #ccc'
                                            }}/>
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="poBox.label" />                                                <ErrorMessage name="poBox" component="div" className="error" />
                                                </label>
                                                <Field name="poBox" 
                                                 style={{
                                                    border: errors.poBox && touched.poBox ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label htmlFor="correspondenceLanguage">
                                                    <FormattedMessage id="correspondenceLanguage.label" />                                                <ErrorMessage name="correspondenceLanguage" component="div" className="error" />

                                                </label>
                                                <Field  
                                                style={{
                                                    border: errors.correspondenceLanguage && touched.correspondenceLanguage ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                as="select" id="correspondenceLanguage" name="correspondenceLanguage">
                                                    <option value="">
                                                        <FormattedMessage id="correspondenceLanguage.placeholder" />
                                                    </option>
                                                    <option value="EN">
                                                        <FormattedMessage id="correspondenceLanguage.option.EN" />
                                                    </option>
                                                    <option value="AR">
                                                        <FormattedMessage id="correspondenceLanguage.option.AR" />
                                                    </option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className='individuals-sec-field'>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="email.label" />                                                <ErrorMessage name="email" component="div" className="error" />
                                                </label>
                                                <Field name="email" 
                                                style={{
                                                    border: errors.email && touched.email ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="mobileNumber.label" />                                                <ErrorMessage name="mobileNumber" component="div" className="error" />
                                                </label>
                                                <Field name="mobileNumber" 
                                                style={{
                                                    border: errors.mobileNumber && touched.mobileNumber ? '1px solid red' : '1px solid #ccc'
                                                }} />
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="telephoneNumber.label" />                                                <ErrorMessage name="telephoneNumber" component="div" className="error" />
                                                </label>
                                                <Field name="telephoneNumber" 
                                                style={{
                                                    border: errors.telephoneNumber && touched.telephoneNumber ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
                                            </div>
                                        </div>
                                        <div className='individuals-sec-field'>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="country.label" />                                                <ErrorMessage name="country" component="div" className="error" />
                                                </label>
                                                <Field name="country"
                                                style={{
                                                    border: errors.country && touched.country ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="building.label" />                                                <ErrorMessage name="Building" component="div" className="error" />
                                                </label>
                                                <Field name="Building"
                                                 style={{
                                                    border: errors.Building && touched.Building ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
                                            </div>
                                            <div className='individuals-single-field'>
                                                <label>*<FormattedMessage id="city.label" />                                                <ErrorMessage name="city" component="div" className="error" />
                                                </label>
                                                <Field name="city"
                                                 style={{
                                                    border: errors.city && touched.city ? '1px solid red' : '1px solid #ccc'
                                                }}
                                                />
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
                                      <h3><FormattedMessage id="bankInfo.title" /></h3>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="bankName.label" />                                              <ErrorMessage name="bankName" component="div" className="error" />
                                              </label>
                                              <Field name="bankName" 
                                               style={{
                                                border: errors.bankName && touched.bankName ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="ibanNumber.label" />                                              <ErrorMessage name="ibanNumber" component="div" className="error" />
                                              </label>
                                              <Field name="ibanNumber"
                                              style={{
                                                border: errors.ibanNumber && touched.ibanNumber ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                      </div>
                                      <div className='individuals-sec-field'>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="bankBranch.label" />                                              <ErrorMessage name="bankBranch" component="div" className="error" />
                                              </label>
                                              <Field name="bankBranch"
                                              style={{
                                                border: errors.bankBranch && touched.bankBranch ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="bankCity.label" />                                              <ErrorMessage name="bankCity" component="div" className="error" />
                                              </label>
                                              <Field name="bankCity"
                                              style={{
                                                border: errors.bankCity && touched.bankCity ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
                                          </div>
                                          <div className='individuals-single-field'>
                                              <label>*<FormattedMessage id="currency.label" />                                              <ErrorMessage name="Currency" component="div" className="error" />
                                              </label>
                                              <Field name="Currency"
                                              style={{
                                                border: errors.Currency && touched.Currency ? '1px solid red' : '1px solid #ccc'
                                            }}
                                              />
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
                                    <h3><FormattedMessage id="correspondence.title" /></h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='individuals-sec-field'>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="incomeSource.label" />                                            <ErrorMessage name="incomeSource" component="div" className="error" />
                                            </label>
                                            <Field as="select" name="incomeSource"
                                            style={{
                                                border: errors.incomeSource && touched.incomeSource ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                                <option value=""><FormattedMessage id="incomeSource.placeholder" /></option>
                                                <option value="Employment">employment / وظيفة</option>
                                                <option value="Business">Business / تجارة</option>
                                                <option value="Real Estate">Real Estate / عقار</option>
                                                <option value="Inheritance">Inheritance / إرث</option>
                                                <option value="Stock">Stock / أسهم</option>
                                                <option value="Other">Other / أخرى</option>
                                            </Field>
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="communicationMethod.label" />                                            <ErrorMessage name="communicationMethod" component="div" className="error" />
                                            </label>
                                            <Field as="select" name="communicationMethod"
                                             style={{
                                                border: errors.communicationMethod && touched.communicationMethod ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                                <option value="">
                                                    <FormattedMessage id="communicationMethod.placeholder" />
                                                </option>
                                                <option value="Email">
                                                    <FormattedMessage id="communicationMethod.email" />
                                                </option>
                                                <option value="Fax">
                                                    <FormattedMessage id="communicationMethod.fax" />
                                                </option>
                                                <option value="SMS">
                                                    <FormattedMessage id="communicationMethod.sms" />
                                                </option>
                                                <option value="Mail">
                                                    <FormattedMessage id="communicationMethod.mail" />
                                                </option>
                                            </Field>
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="correspondenceType.label" />                                            <ErrorMessage name="Correspondence" component="div" className="error" />
                                            </label>
                                            <Field as="select" name="Correspondence"
                                            style={{
                                                border: errors.Correspondence && touched.Correspondence ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                                <option value="">
                                                    <FormattedMessage id="correspondenceType.placeholder" />
                                                </option>
                                                <option value="Per Transaction">
                                                    <FormattedMessage id="accountStatements.perTransaction" />
                                                </option>
                                                <option value="Daily">
                                                    <FormattedMessage id="accountStatements.daily" />
                                                </option>
                                                <option value="Monthly">
                                                    <FormattedMessage id="accountStatements.monthly" />
                                                </option>
                                                <option value="Upon Request">
                                                    <FormattedMessage id="accountStatements.uponRequest" />
                                                </option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className='individuals-sec-field'>
                                        <div className='individuals-single-field'>
                                            <label htmlFor="annualIncome"><FormattedMessage id="annualIncome.label" />                                            <ErrorMessage name="annualIncome" component="div" className="error" />
                                            </label>
                                            <Field as="select" id="annualIncome" name="annualIncome"
                                             style={{
                                                border: errors.annualIncome && touched.annualIncome ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                                <option value=""><FormattedMessage id="annualIncome.placeholder" /></option>
                                                <option value="100,000 أو أقل Or less">
                                                    <FormattedMessage id="netWorth.100kOrLess" defaultMessage="100,000 أو أقل Or less" />
                                                </option>
                                                <option value="300,000-100,001">
                                                    <FormattedMessage id="netWorth.range300kTo100k" defaultMessage="300,000 - 100,001" />
                                                </option>
                                                <option value="600,000-300,001">
                                                    <FormattedMessage id="netWorth.range600kTo300k" defaultMessage="600,000 - 300,001" />
                                                </option>
                                                <option value="1,500,000 - 600,001">
                                                    <FormattedMessage id="netWorth.range1_5mTo600k" defaultMessage="1,500,000 - 600,001" />
                                                </option>
                                                <option value="5,000,000 1,500,001">
                                                    <FormattedMessage id="netWorth.range5mTo1_5m" defaultMessage="5,000,000 - 1,500,001" />
                                                </option>
                                                <option value="10,0000,000-5,000,001">
                                                    <FormattedMessage id="netWorth.range10mTo5m" defaultMessage="10,000,000 - 5,000,001" />
                                                </option>
                                                <option value="50,000,000-10,000,001">
                                                    <FormattedMessage id="netWorth.range50mTo10m" defaultMessage="50,000,000 - 10,000,001" />
                                                </option>
                                                <option value="More Than 50,000,000">
                                                    <FormattedMessage id="netWorth.moreThan50m" defaultMessage="More Than 50,000,000" />
                                                </option>

                                            </Field>
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="netWorth.label" />                                            <ErrorMessage name="netWorth" component="div" className="error" />
                                            </label>
                                            <Field as="select" id="netWorth" name="netWorth"
                                            style={{
                                                border: errors.netWorth && touched.netWorth ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                            <option value=""><FormattedMessage id="annualIncome.placeholder" /></option>
                                            <option value="100,000 أو أقل Or less">
                                                <FormattedMessage id="netWorth.100kOrLess" defaultMessage="100,000 أو أقل Or less" />
                                            </option>
                                            <option value="300,000-100,001">
                                                <FormattedMessage id="netWorth.range300kTo100k" defaultMessage="300,000 - 100,001" />
                                            </option>
                                            <option value="600,000-300,001">
                                                <FormattedMessage id="netWorth.range600kTo300k" defaultMessage="600,000 - 300,001" />
                                            </option>
                                            <option value="1,500,000 - 600,001">
                                                <FormattedMessage id="netWorth.range1_5mTo600k" defaultMessage="1,500,000 - 600,001" />
                                            </option>
                                            <option value="5,000,000 1,500,001">
                                                <FormattedMessage id="netWorth.range5mTo1_5m" defaultMessage="5,000,000 - 1,500,001" />
                                            </option>
                                            <option value="10,0000,000-5,000,001">
                                                <FormattedMessage id="netWorth.range10mTo5m" defaultMessage="10,000,000 - 5,000,001" />
                                            </option>
                                            <option value="50,000,000-10,000,001">
                                                <FormattedMessage id="netWorth.range50mTo10m" defaultMessage="50,000,000 - 10,000,001" />
                                            </option>
                                            <option value="More Than 50,000,000">
                                                <FormattedMessage id="netWorth.moreThan50m" defaultMessage="More Than 50,000,000" />
                                            </option>

                                            </Field>
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
                                  <h3><FormattedMessage id="careerInfo.title" /></h3>
                              </AccordionSummary>
                              <AccordionDetails>
                                  <div className='individuals-sec-field'>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="academicQualifications.label" />                                          <ErrorMessage name="academicQualifications" component="div" className="error" />
                                          </label>
                                          <Field as="select" id="academicQualifications" name="academicQualifications" style={{
                                                border: errors.academicQualifications && touched.academicQualifications ? '1px solid red' : '1px solid #ccc'
                                            }}>
                                              <option value=""><FormattedMessage id="academicQualifications.placeholder" /></option>
                                              <option value="Primary"><FormattedMessage id="academicQualifications.primary" /></option>
                                              <option value="Intermediate"><FormattedMessage id="academicQualifications.intermediate" /></option>
                                              <option value="High School"><FormattedMessage id="academicQualifications.highSchool" /></option>
                                              <option value="Diploma"><FormattedMessage id="academicQualifications.diploma" /></option>
                                              <option value="Bachelor"><FormattedMessage id="academicQualifications.bachelor" /></option>
                                              <option value="Postgraduate"><FormattedMessage id="academicQualifications.postgraduate" /></option>
                                          </Field>
                                      </div>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="sector.label" />                                          <ErrorMessage name="Sector" component="div" className="error" />
                                          </label>
                                          <Field as="select" id="Sector" name="Sector"
                                           style={{
                                            border: errors.Sector && touched.Sector ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          >
                                              <option value=""><FormattedMessage id="sector.placeholder" /></option>
                                              <option value="Government"><FormattedMessage id="sector.government" /></option>
                                              <option value="Private"><FormattedMessage id="sector.private" /></option>
                                              <option value="Self-Employment"><FormattedMessage id="sector.selfEmployment" /></option>
                                              <option value="Other"><FormattedMessage id="sector.other" /></option>
                                          </Field>
                                      </div>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="employmentCategory.label" />                                          <ErrorMessage name="employmentCategory" component="div" className="error" />
                                          </label>
                                          <Field as="select" id="employmentCategory" name="employmentCategory"
                                          style={{
                                            border: errors.employmentCategory && touched.employmentCategory ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          >
                                              <option value=""><FormattedMessage id="employmentCategory.placeholder" /></option>
                                              <option value="Full-Time"><FormattedMessage id="employmentCategory.fullTime" /></option>
                                              <option value="Part-Time"><FormattedMessage id="employmentCategory.partTime" /></option>
                                              <option value="Contract"><FormattedMessage id="employmentCategory.contract" /></option>
                                              <option value="Freelance"><FormattedMessage id="employmentCategory.freelance" /></option>
                                              <option value="Internship"><FormattedMessage id="employmentCategory.internship" /></option>
                                              <option value="Temporary"><FormattedMessage id="employmentCategory.temporary" /></option>
                                              <option value="Other"><FormattedMessage id="employmentCategory.other" /></option>
                                          </Field>
                                      </div>
                                  </div>
                                  <div className='individuals-sec-field'>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="employerName.label" />                                          <ErrorMessage name="employerName" component="div" className="error" />
                                          </label>
                                          <Field name="employerName" 
                                          style={{
                                            border: errors.employerName && touched.employerName ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          />
                                      </div>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="jobTitle.label" />                                          <ErrorMessage name="jobTitle" component="div" className="error" />
                                          </label>
                                          <Field name="jobTitle" 
                                          style={{
                                            border: errors.jobTitle && touched.jobTitle ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          />
                                      </div>
                                  </div>
                                  <div className='individuals-sec-field'>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="employerAddress.label" />                                          <ErrorMessage name="employerAddress" component="div" className="error" />
                                          </label>
                                          <Field name="employerAddress" 
                                           style={{
                                            border: errors.employerAddress && touched.employerAddress ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          />
                                      </div>
                                  </div>
                                  <div className='individuals-sec-field'>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="yearsEmployment.label" />                                          <ErrorMessage name="yearsEmployment" component="div" className="error" />
                                          </label>
                                          <Field name="yearsEmployment" 
                                          style={{
                                            border: errors.yearsEmployment && touched.yearsEmployment ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          />
                                      </div>
                                      <div className='individuals-single-field'>
                                          <label>*<FormattedMessage id="employerPhone.label" />                                          <ErrorMessage name="employerPhone" component="div" className="error" />
                                          </label>
                                          <Field name="employerPhone" 
                                          style={{
                                            border: errors.employerPhone && touched.employerPhone ? '1px solid red' : '1px solid #ccc'
                                        }}
                                          />
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
        <h3><FormattedMessage id="generalInformation.title" /></h3>
    </AccordionSummary>
    <AccordionDetails>
        <div className='individuals-sec-field'>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.boardMembership.label" />
                    <ErrorMessage name="boardMembership" component="div" className="error" />
                </label>
                <Field as="select" name="boardMembership" 
                    style={{
                        border: errors.boardMembership && touched.boardMembership ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.boardMembership.placeholder" />
                    </option>
                    <option value="Yes"><FormattedMessage id="generalInformation.yes" /></option>
                    <option value="No"><FormattedMessage id="generalInformation.no" /></option>
                </Field>
                {values.boardMembership === "Yes" && (
                    <>
                        <Field 
                            type="text" 
                            name="companyName" 
                            placeholder={<FormattedMessage id="generalInformation.boardMembership.companyName.placeholder" />} 
                            style={{ border: errors.companyName && touched.companyName ? '1px solid red' : '1px solid #ccc' }}
                        />
                        <ErrorMessage name="companyName" component="div" className="error" />
                    </>
                )}
            </div>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.seniorPosition.label" />
                    <ErrorMessage name="seniorPosition" component="div" className="error" />
                </label>
                <Field as="select" name="seniorPosition" 
                    style={{
                        border: errors.seniorPosition && touched.seniorPosition ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.seniorPosition.placeholder" />
                    </option>
                    <option value="Yes"><FormattedMessage id="generalInformation.yes" /></option>
                    <option value="No"><FormattedMessage id="generalInformation.no" /></option>
                </Field>
            </div>
        </div>

        <div className='individuals-sec-field'>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.familyRelationship.label" />
                    <ErrorMessage name="familyRelationship" component="div" className="error" />
                </label>
                <Field as="select" name="familyRelationship" 
                    style={{
                        border: errors.familyRelationship && touched.familyRelationship ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.familyRelationship.placeholder" />
                    </option>
                    <option value="Yes"><FormattedMessage id="generalInformation.yes" /></option>
                    <option value="No"><FormattedMessage id="generalInformation.no" /></option>
                </Field>
            </div>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.accountOwnership.label" />
                    <ErrorMessage name="accountOwnership" component="div" className="error" />
                </label>
                <Field as="select" name="accountOwnership" 
                    style={{
                        border: errors.accountOwnership && touched.accountOwnership ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.accountOwnership.placeholder" />
                    </option>
                    <option value="Yes"><FormattedMessage id="generalInformation.yes" /></option>
                    <option value="No"><FormattedMessage id="generalInformation.no" /></option>
                </Field>
            </div>
        </div>

        { values.accountOwnership === "No" && (
            <div className='individuals-sec-field'>
                <div className='individuals-single-field'>
                    <label>*
                        <FormattedMessage id="generalInformation.beneficialOwnership.label" />
                        <ErrorMessage name="beneficialOwnership" component="div" className="error" />
                    </label>
                    <Field as="textarea" name="beneficialOwnership" 
                        style={{
                            border: errors.beneficialOwnership && touched.beneficialOwnership ? '1px solid red' : '1px solid #ccc'
                        }} 
                    />
                </div>
            </div>
        )}

        <div className='individuals-sec-field'>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.bankAccountOwnership.label" />
                    <ErrorMessage name="bankAccountOwnership" component="div" className="error" />
                </label>
                <Field as="select" name="bankAccountOwnership"
                    style={{
                        border: errors.bankAccountOwnership && touched.bankAccountOwnership ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.bankAccountOwnership.placeholder" />
                    </option>
                    <option value="Yes"><FormattedMessage id="generalInformation.yes" /></option>
                    <option value="No"><FormattedMessage id="generalInformation.no" /></option>
                </Field>
            </div>
            <div className='individuals-single-field'>
                <label htmlFor="expectedDuration">*
                    <FormattedMessage id="generalInformation.expectedDuration.label" />
                    <ErrorMessage name="expectedDuration" component="div" className="error" />
                </label>
                <Field as="select" id="expectedDuration" name="expectedDuration"
                    style={{
                        border: errors.expectedDuration && touched.expectedDuration ? '1px solid red' : '1px solid #ccc'
                    }}>
                    <option value="">
                        <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                    </option>
                    <option value="shortTerm"><FormattedMessage id="generalInformation.expectedDuration.shortTerm" /></option>
                    <option value="mediumTerm"><FormattedMessage id="generalInformation.expectedDuration.mediumTerm" /></option>
                    <option value="longTerm"><FormattedMessage id="generalInformation.expectedDuration.longTerm" /></option>
                </Field>
            </div>
        </div>

        <div className='individuals-sec-field'>
            <div className='individuals-single-field'>
                <label>*
                    <FormattedMessage id="generalInformation.financialSituationInfo.label" />
                    <ErrorMessage name="financialSituationInfo" component="div" className="error" />
                </label>
                <Field as="textarea" name="financialSituationInfo" 
                    style={{
                        border: errors.financialSituationInfo && touched.financialSituationInfo ? '1px solid red' : '1px solid #ccc'
                    }} 
                />
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
                                    <h3><FormattedMessage id="specialCaseInformation.heading" /></h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='individuals-sec-field'>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.incompetentLegalGuardian" />
                                                <ErrorMessage name="incompetentLegalGuardian" component="div" className="error" />
                                            </label>
                                            <Field name="incompetentLegalGuardian"
                                             style={{
                                                border: errors.incompetentLegalGuardian && touched.incompetentLegalGuardian ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.veiledWomanId" />
                                                <ErrorMessage name="veiledWomanId" component="div" className="error" />

                                            </label>
                                            <Field name="veiledWomanId"
                                            style={{
                                                border: errors.veiledWomanId && touched.veiledWomanId ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.illiterateBlindWitness" />
                                                <ErrorMessage name="illiterateBlindWitness" component="div" className="error" />
                                            </label>
                                            <Field name="illiterateBlindWitness"
                                            style={{
                                                border: errors.illiterateBlindWitness && touched.illiterateBlindWitness ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgent" />
                                                <ErrorMessage name="inheritorsAgent" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgent"
                                            style={{
                                                border: errors.inheritorsAgent && touched.inheritorsAgent ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.fatherGuardianMinor" />
                                                <ErrorMessage name="fatherGuardianMinor" component="div" className="error" />
                                            </label>
                                            <Field name="fatherGuardianMinor" 
                                            style={{
                                                border: errors.fatherGuardianMinor && touched.fatherGuardianMinor ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentName" />
                                                <ErrorMessage name="inheritorsAgentName" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentName"
                                            style={{
                                                border: errors.inheritorsAgentName && touched.inheritorsAgentName ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentId" />
                                                <ErrorMessage name="inheritorsAgentId" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentId"
                                             style={{
                                                border: errors.inheritorsAgentId && touched.inheritorsAgentId ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentIdType" />
                                                <ErrorMessage name="inheritorsAgentIdType" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentIdType" 
                                             style={{
                                                border: errors.inheritorsAgentIdType && touched.inheritorsAgentIdType ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentExpiryDate" />
                                                <ErrorMessage name="inheritorsAgentExpiryDate" component="div" className="error" />

                                            </label>
                                            <Field type="date" name="inheritorsAgentExpiryDate" 
                                             style={{
                                                border: errors.inheritorsAgentExpiryDate && touched.inheritorsAgentExpiryDate ? '1px solid red' : '1px solid #ccc'
                                            }}/>
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentIssueDate" />
                                                <ErrorMessage name="inheritorsAgentIssueDate" component="div" className="error" />

                                            </label>
                                            <Field type="date" name="inheritorsAgentIssueDate" 
                                             style={{
                                                border: errors.inheritorsAgentIssueDate && touched.inheritorsAgentIssueDate ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentTelNo" />
                                                <ErrorMessage name="inheritorsAgentTelNo" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentTelNo" 
                                            style={{
                                                border: errors.inheritorsAgentTelNo && touched.inheritorsAgentTelNo ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentPlaceOfIssue" />
                                                <ErrorMessage name="inheritorsAgentPlaceOfIssue" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentPlaceOfIssue" 
                                             style={{
                                                border: errors.inheritorsAgentPlaceOfIssue && touched.inheritorsAgentPlaceOfIssue ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentSignature" />
                                                <ErrorMessage name="inheritorsAgentSignature" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentSignature"
                                            style={{
                                                border: errors.inheritorsAgentSignature && touched.inheritorsAgentSignature ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*
                                                <FormattedMessage id="specialCaseInformation.inheritorsAgentFaxNo" />
                                                <ErrorMessage name="inheritorsAgentFaxNo" component="div" className="error" />

                                            </label>
                                            <Field name="inheritorsAgentFaxNo"
                                            style={{
                                                border: errors.inheritorsAgentFaxNo && touched.inheritorsAgentFaxNo ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
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
                                    <h3><FormattedMessage id="investmentExperience.heading" /></h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='individuals-sec-field'>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.knowledgeDescription" />
                                            <ErrorMessage name="investmentKnowledgeDescription" component="div" className="error" />

                                            </label>
                                            <Field as="select"  name="investmentKnowledgeDescription"
                                            style={{
                                                border: errors.investmentKnowledgeDescription && touched.investmentKnowledgeDescription ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            >
                                                <option value=""><FormattedMessage id="generalInformation.expectedDuration.placeholder" /></option>
                                                <option value="Extensive"><FormattedMessage id="investmentExperience.extensive" /></option>
                                                <option value="Good"><FormattedMessage id="investmentExperience.good" /></option>
                                                <option value="Limited"><FormattedMessage id="investmentExperience.limited" /></option>
                                            </Field>
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.years" />
                                            <ErrorMessage name="investmentYears" component="div" className="error" />

                                            </label>
                                            <Field  type="number" name="investmentYears"
                                            style={{
                                                border: errors.investmentYears && touched.investmentYears ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.previousInvestments" />
                                            <ErrorMessage name="previousInvestments" component="div" className="error" />

                                            </label>
                                            <Field  type="text" name="previousInvestments"
                                             style={{
                                                border: errors.previousInvestments && touched.previousInvestments ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.professionalCertificates" />
                                            <ErrorMessage name="professionalCertificates" component="div" className="error" />

                                            </label>
                                            <Field  type="text" name="professionalCertificates" 
                                            style={{
                                                border: errors.professionalCertificates && touched.professionalCertificates ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.loanToInvestedMoneyRatio" />
                                            <ErrorMessage name="loanToInvestedMoneyRatio" component="div" className="error" />
                                            </label>
                                            <Field  type="text" name="loanToInvestedMoneyRatio" 
                                            style={{
                                                border: errors.loanToInvestedMoneyRatio && touched.loanToInvestedMoneyRatio ? '1px solid red' : '1px solid #ccc'
                                            }}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.marginTransactions" />
                                            <ErrorMessage name="marginTransactions" component="div" className="error" />

                                            </label>
                                            <Field  type="text" name="marginTransactions" 
                                             style={{
                                             border: errors.marginTransactions && touched.marginTransactions ? '1px solid red' : '1px solid #ccc'}}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.securitiesTransactionsOutsideKingdom" />
                                            <ErrorMessage name="securitiesTransactionsOutsideKingdom" component="div" className="error" />

                                            </label>
                                            <Field  type="text" name="securitiesTransactionsOutsideKingdom" 
                                             style={{
                                                border: errors.securitiesTransactionsOutsideKingdom && touched.securitiesTransactionsOutsideKingdom ? '1px solid red' : '1px solid #ccc'}}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.countriesForSecuritiesTransactions" />
                                            <ErrorMessage name="countriesForSecuritiesTransactions" component="div" className="error" />
                                        
                                            </label>
                                            <Field  type="text" name="countriesForSecuritiesTransactions" 
                                             style={{
                                                border: errors.countriesForSecuritiesTransactions && touched.countriesForSecuritiesTransactions ? '1px solid red' : '1px solid #ccc'}}
                                            />
                                        </div>
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="investmentExperience.riskAppetite" />
                                            <ErrorMessage name="riskAppetite" component="div" className="error" />

                                            </label>
                                            <Field as="select"  name="riskAppetite"
                                             style={{
                                                border: errors.riskAppetite && touched.riskAppetite ? '1px solid red' : '1px solid #ccc'}}
                                            >
                                                <option value=""><FormattedMessage id="generalInformation.expectedDuration.placeholder" /></option>
                                                <option value="Extensive"><FormattedMessage id="investmentExperience.extensive" /></option>
                                                <option value="Good"><FormattedMessage id="investmentExperience.good" /></option>
                                                <option value="Limited"><FormattedMessage id="investmentExperience.limited" /></option>
                                            </Field>
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
                                <h3><FormattedMessage id="financialExperience.title" /></h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field'>
                                        <label>*<FormattedMessage id="financialExperience.label" />                                        <ErrorMessage name="financialExperience" component="div" className="error" />
                                        </label>
                                        <Field as="select" name="financialExperience"
                                         style={{
                                            border: errors.financialExperience && touched.financialExperience ? '1px solid red' : '1px solid #ccc'}}
                                        >
                                            <option value=""><FormattedMessage id="financialExperience.placeholder" /></option>
                                            <option value="Yes"><FormattedMessage id="financialExperience.yes" /></option>
                                            <option value="No"><FormattedMessage id="financialExperience.no" /></option>
                                        </Field>
                                    </div>
                                    <div className='individuals-single-field'>
                                        <label>*<FormattedMessage id="otherFinancialExperience.label" />                                        <ErrorMessage name="otherFinancialExperience" component="div" className="error" />
                                        </label>
                                        <Field name="otherFinancialExperience" 
                                         style={{
                                            border: errors.otherFinancialExperience && touched.otherFinancialExperience ? '1px solid red' : '1px solid #ccc'}}
                                        
                                        />
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
                                <h3><FormattedMessage id="investmentGoals.heading" /></h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.capitalProtection" /></label>
                                        <Field type="checkbox" name="investmentGoals.capitalProtection"  />
                                    </div>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.incomeGeneration" /></label>
                                        <Field type="checkbox" name="investmentGoals.incomeGeneration" />
                                    </div>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.balanced" /></label>
                                        <Field type="checkbox" name="investmentGoals.balanced" />
                                    </div>
                                </div>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.capitalGrowth" /></label>
                                        <Field type="checkbox" name="investmentGoals.capitalGrowth" />
                                    </div>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.retirementSavings" /></label>
                                        <Field type="checkbox" name="investmentGoals.retirementSavings" />
                                    </div>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.projectFinancing" /></label>
                                        <Field type="checkbox" name="investmentGoals.projectFinancing" />
                                    </div>
                                </div>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="investmentGoals.assetPurchase" /></label>
                                        <Field type="checkbox" name="investmentGoals.assetPurchase" />
                                    </div>
                                </div>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field'>
                                        <label>*<FormattedMessage id="investmentGoals.other" /></label>
                                        <Field name="investmentGoals.other" />
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
                                <h3><FormattedMessage id="favoriteInvestmentAssets.heading" /></h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <label className='selectMultipleCategories'><FormattedMessage id="favoriteInvestmentAssets.selectMultipleCategories" /></label>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="favoriteInvestmentAssets.saudiAssets" /></label>
                                        <Field type="checkbox" name="saudiAssets" />
                                    </div>
                                    <div className='individuals-single-field checkbox'>
                                        <label>*<FormattedMessage id="favoriteInvestmentAssets.foreignCurrencyAssets" /></label>
                                        <Field type="checkbox" name="foreignCurrencyAssets" />
                                    </div>
                                </div>
                                <div className='individuals-sec-field'>
                                    {({ values }) => values.foreignCurrencyAssets && (
                                        <div className='individuals-single-field'>
                                            <label>*<FormattedMessage id="favoriteInvestmentAssets.selectForeignCurrencies" />
                                            <ErrorMessage name="selectedForeignCurrencies" component="div" className="error" />

                                            </label>
                                            <Field name="selectedForeignCurrencies" />
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
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="investment portfolio table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.investmentTools" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.currentClientPortfolio" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.idealClientPortfolio" />
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell component="th" scope="row">
                                                            {row.label}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field
                                                                
                                                                type="text"
                                                                name={`clientCurrentWallet${row.id}`}
                                                            />
                                                            <ErrorMessage name={`clientCurrentWallet${row.id}`} component="div" className="error" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field
                                                                
                                                                type="text"
                                                                name={`idealportfoliofortheclient${row.id}`}
                                                            />
                                                            <ErrorMessage name={`idealportfoliofortheclient${row.id}`} component="div" className="error" />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell>
                                                        <FormattedMessage id="tableData.checkPercentageSum" />
                                                    </TableCell>
                                                    <TableCell />
                                                    <TableCell />
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded className='table-table'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="individuals-login-field"
                                className='individuals-sec-field-title'
                            >
                                <h3>
                                    <FormattedMessage id="header.custodianInfo" />
                                </h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='individuals-sec-field'>
                                    <div className='individuals-single-field'>
                                        <label>*
                                            <FormattedMessage id="form.accountNumber" />
                                            <ErrorMessage name="accountNumber" component="div" className="error" />

                                        </label>
                                        <Field  name="accountNumber" 
                                         style={{
                                            border: errors.accountNumber && touched.accountNumber ? '1px solid red' : '1px solid #ccc'}}
                                        />
                                    </div>
                                    <div className='individuals-single-field'>
                                        <label>*
                                            <FormattedMessage id="form.custodianName" />
                                            <ErrorMessage name="custodianName" component="div" className="error" />

                                        </label>
                                        <Field  name="custodianName" 
                                         style={{
                                            border: errors.custodianName && touched.custodianName ? '1px solid red' : '1px solid #ccc'}}
                                        />
                                    </div>
                                    <div className='individuals-single-field'>
                                        <label>*
                                            <FormattedMessage id="form.custodianAddress" />
                                            <ErrorMessage name="custodianAddress" component="div" className="error" />

                                        </label>
                                        <Field  name="custodianAddress" 
                                         style={{
                                            border: errors.custodianAddress && touched.custodianAddress ? '1px solid red' : '1px solid #ccc'}}
                                        />
                                    </div>
                                </div>
                                <div className='individuals-sec-field table'>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="send to table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.sendTo" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.client" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.custodian" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormattedMessage id="tableHeader.otherEntities" />
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows2.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell component="th" scope="row">
                                                            {row.label}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field type="checkbox" name={`client${row.id}`} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field type="checkbox" name={`custodian${row.id}`} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field
                                                                as={TextField}
                                                                name={`OtherParties${row.id}`}
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                            />
                                                            <ErrorMessage name={`OtherParties${row.id}`} component="div" className="error" />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                    <label>*<FormattedMessage id="question.q1" />
                                    <ErrorMessage name="q1Answer" component="div" className="error" />
                                    </label>
                                    <Field as="select" name="q1Answer"  style={{
                                            border: errors.q1Answer && touched.q1Answer ? '1px solid red' : '1px solid #ccc'}} onChange={(e) => {
                                        setFieldValue("q1Answer", e.target.value);
                                    }}>
                                        <option value=""><FormattedMessage id="question.selectOption" /></option>
                                        <option value="1"><FormattedMessage id="question.q1.option1" /></option>
                                        <option value="2"><FormattedMessage id="question.q1.option2" /></option>
                                        <option value="3"><FormattedMessage id="question.q1.option3" /></option>
                                    </Field>
                                </div>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.q2" />
                                    <ErrorMessage name="q2Answer" component="div" className="error" />
                                    </label>
                                    <Field as="select" style={{
                                            border: errors.q2Answer && touched.q2Answer ? '1px solid red' : '1px solid #ccc'}} name="q2Answer" onChange={(e) => {
                                        setFieldValue("q2Answer", e.target.value);
                                    }}>
                                        <option value=""><FormattedMessage id="question.selectOption" /></option>
                                        <option value="1"><FormattedMessage id="question.q2.option1" /></option>
                                        <option value="2"><FormattedMessage id="question.q2.option2" /></option>
                                        <option value="3"><FormattedMessage id="question.q2.option3" /></option>
                                        <option value="4"><FormattedMessage id="question.q2.option4" /></option>
                                    </Field>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.q3" />
                                    <ErrorMessage name="q3Answer" component="div" className="error" />
                                    </label>
                                    <Field as="select" 
                                    style={{
                                        border: errors.q3Answer && touched.q3Answer ? '1px solid red' : '1px solid #ccc'}}
                                    name="q3Answer" onChange={(e) => {
                                        setFieldValue("q3Answer", e.target.value);
                                    }}>
                                        <option value=""><FormattedMessage id="question.selectOption" /></option>
                                        <option value="1"><FormattedMessage id="question.q3.option1" /></option>
                                        <option value="2"><FormattedMessage id="question.q3.option2" /></option>
                                        <option value="3"><FormattedMessage id="question.q3.option3" /></option>
                                        <option value="4"><FormattedMessage id="question.q3.option4" /></option>
                                    </Field>
                                </div>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.q4" />
                                    <ErrorMessage name="q4Answer" component="div" className="error" />
                                    </label>
                                    <Field as="select" 
                                    style={{
                                        border: errors.q4Answer && touched.q4Answer ? '1px solid red' : '1px solid #ccc'}}
                                    name="q4Answer" onChange={(e) => {
                                        setFieldValue("q4Answer", e.target.value);
                                    }}>
                                        <option value=""><FormattedMessage id="question.selectOption" /></option>
                                        <option value="1"><FormattedMessage id="question.q4.option1" /></option>
                                        <option value="2"><FormattedMessage id="question.q4.option2" /></option>
                                        <option value="3"><FormattedMessage id="question.q4.option3" /></option>
                                        <option value="4"><FormattedMessage id="question.q4.option4" /></option>
                                    </Field>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.q5" />
                                    <ErrorMessage name="q5Answer" component="div" className="error" />
                                    </label>
                                    <Field as="select" 
                                    style={{
                                        border: errors.q5Answer && touched.q5Answer ? '1px solid red' : '1px solid #ccc'}}
                                    name="q5Answer" onChange={(e) => {
                                        setFieldValue("q5Answer", e.target.value);
                                    }}>
                                        <option value=""><FormattedMessage id="question.selectOption" /></option>
                                        <option value="1"><FormattedMessage id="question.q5.option1" /></option>
                                        <option value="2"><FormattedMessage id="question.q5.option2" /></option>
                                        <option value="3"><FormattedMessage id="question.q5.option3" /></option>
                                        <option value="4"><FormattedMessage id="question.q5.option4" /></option>
                                    </Field>
                                </div>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.totalPoints" /></label>
                                    <div className='calculateTotalPoints'>
                                        <h4>{calculateTotalPoints(values)}</h4> {/* Call the function with current values */}
                                    </div>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="result.lowRisk" /></label>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="result.mediumRisk" /></label>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="result.highRisk" /></label>
                                </div>
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.recommendation" /></label>
                                    <label className='recommendation'>
                                        {calculateTotalPoints(values) >= 1 && calculateTotalPoints(values) <= 6 && (
                                            <FormattedMessage id="lowRisk" />
                                        )}
                                        {calculateTotalPoints(values) >= 7 && calculateTotalPoints(values) <= 15 && (
                                            <FormattedMessage id="mediumRisk" />
                                        )}
                                        {calculateTotalPoints(values) > 15 && (
                                            <FormattedMessage id="highRisk" />
                                        )}
                                    </label>
                                </div>


                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.investmentDesire" />
                                    <ErrorMessage name="investmentDesire" component="div" className="error" />

                                    </label>
                                    <Field  name="investmentDesire"
                                     style={{
                                        border: errors.investmentDesire && touched.investmentDesire ? '1px solid red' : '1px solid #ccc'}}
                                    />
                                </div>
                 
                            </div>
                            <div className='individuals-sec-field'>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.signature" />
                                    <ErrorMessage name="signature" component="div" className="error" />
                                    </label>
                                    <Field  type="file" name="signature" accept="image/*" 
                                    style={{
                                        border: errors.signature && touched.signature ? '1px solid red' : '1px solid #ccc'}}
                                    />
                                </div>
                                <div className='individuals-single-field'>
                                    <label>*<FormattedMessage id="question.clientName" />
                                    <ErrorMessage name="clientName" component="div" className="error" />

                                    </label>
                                    <Field  name="clientName"
                                     style={{
                                        border: errors.clientName && touched.clientName ? '1px solid red' : '1px solid #ccc'}}
                                    />
                                </div>
                            </div>
                            </AccordionDetails>
                        </Accordion>



                                {/* Add other sections similarly like the Address section */}
    <button type='submit' className='individuals-buttom-form' disabled={isSubmitting}>
        <FormattedMessage id="form.submit" />
      </button>
      

                                </div>
                            </div>
                        </section>
                    </Form>
                )}}
            </Formik>
        </Layout>
    );
};

export default IndividualsLogin;
