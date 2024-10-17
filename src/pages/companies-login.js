import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup" // For validation
import axios from "axios"
import { Link } from "gatsby"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Hero from "../components/Hero"
import Layout from "../components/layout"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Seo from "../components/seo"
import Modal from "react-modal"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import Successfully from "../Json/Successfully.json"
import Fail from "../Json/fail.json"
import { useLocalization } from "../context/LocalizationContext"
import { FormattedMessage } from "react-intl"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  TextField,
} from "@mui/material"

const CompaniesLogin = () => {
  const { locale } = useLocalization()
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const [formError, setFormError] = React.useState(false)
  const [isIdealTotal100, setIsIdealTotal100] = useState(false)
  const [isCurrentTotal100, setIsCurrentTotal100] = useState(false)
  const initialValues = {
    companyName: "",
    legalEntity: "",
    unifiedNumber: "",
    commercialRegistrationNumber: "",
    establishmentDate: "",
    Correspondence: "", // Add this line
    registeredAddress: "",
    buildingNumber: "",
    streetName: "",
    district: "",
    city: "",
    postalCode: "",
    additionalNumber: "",
    registrationCountry: "",
    businessActivityCountry: "",
    mainActivity: "",
    numberOfEmployees: "",
    paidCapital: "",
    annualBusinessVolume: "",
    phone: "",
    website: "",
    Correspondence: "",
    contactName: "",
    businessPhone: "",
    email: "",
    mobileNumber: "",
    correspondenceAddress: "",
    bankName: "",
    accountOwnerName: "",
    mainAccount: "",
    branch: "",
    country: "",
    currency: "",
    authorizedPersons: [
      {
        name: "",
        relationship: "",
        nationality: "",
        idType: "",
        idNumber: "",
        placeOfIssue: "",
        issueDate: "",
        expiryDate: "",
      },
    ],
    isPubliclyListed: "",
    otherFinancialInfo: "",

    generalInformation: [
      {
        namesOfNaturalPersons: "",
        namesOfDirectors: "",
      },
    ],
    accountNumber: "",
    custodianName: "",
    custodianAddress: "",
    clientCertificates: false,
    custodianCertificates: false,
    clientDividends: false,
    custodianDividends: false,
    clientSalesProceed: false,
    custodianSalesProceed: false,
    investmentKnowledgeDescription: "",
    investmentYears: "",
    previousInvestments: "",
    loanToInvestedMoneyRatio: "",
    marginTransactions: "",
    securitiesTransactionsOutsideKingdom: "",
    countriesForSecuritiesTransactions: "",
    riskAppetite: "",
    capitalProtection: false,
    incomeGeneration: false,
    balanced: false,
    capitalGrowth: false,
    retirementSavings: false,
    projectFinancing: false,
    assetPurchase: false,
    investmentGoalsOther: "",
    foreignCurrencyAssets: false,
    saudiAssets: false,

    //new
    OtherPartiesCertificates: "",
    OtherPartiesDividends: "",
    OtherPartiesSalesProceed: "",
    custodianCertificates: false,
    clientCertificates: false,
    custodianDividends: false,
    clientDividends: false,
    custodianSalesProceed: false,
    clientSalesProceed: false,
    idealportfoliofortheclientdepositsMurabah: "",
    clientCurrentWalletdepositsMurabah: "",
    idealportfoliofortheclientdebitInstruments: "",
    clientCurrentWalletdebitInstruments: "",
    idealportfoliofortheclientequity: "",
    clientCurrentWalletequity: "",
    idealportfoliofortheclientinvestmentFund: "",
    clientCurrentWalletinvestmentFund: "",
    idealportfoliofortheclientrealEstate: "",
    clientCurrentWalletrealEstate: "",
    idealportfoliofortheclientderivativesContracts: "",
    clientCurrentWalletderivativesContracts: "",
    idealportfoliofortheclientalternativeInvestments: "",
    clientCurrentWalletalternativeInvestments: "",
    authorized_people: "",
    general_informations: "",
  }
  const errorIcon = (
    <div>
      <img src="/fail.svg" />
      <FormattedMessage id="error.required" />
    </div>
  )

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required(errorIcon),
    legalEntity: Yup.string().required(errorIcon),
    unifiedNumber: Yup.string().required(errorIcon),
    commercialRegistrationNumber: Yup.string().required(errorIcon),
    establishmentDate: Yup.date().required(errorIcon),
    registeredAddress: Yup.string().required(errorIcon),
    buildingNumber: Yup.string().required(errorIcon),
    streetName: Yup.string().required(errorIcon),
    district: Yup.string().required(errorIcon),
    city: Yup.string().required(errorIcon),
    postalCode: Yup.string().required(errorIcon),
    additionalNumber: Yup.string().required(errorIcon),
    registrationCountry: Yup.string().required(errorIcon),
    businessActivityCountry: Yup.string().required(errorIcon),
    mainActivity: Yup.string().required(errorIcon),
    numberOfEmployees: Yup.string().required(errorIcon),
    paidCapital: Yup.string().required(errorIcon),
    annualBusinessVolume: Yup.string().required(errorIcon),
    phone: Yup.string().required(errorIcon),
    website: Yup.string().url(),
    Correspondence: Yup.string().required(errorIcon),
    contactName: Yup.string().required(errorIcon),
    businessPhone: Yup.string().required(errorIcon),
    email: Yup.string()
      .email(<FormattedMessage id="error.invalidEmail" />)
      .required(errorIcon),
    mobileNumber: Yup.string().required(errorIcon),
    correspondenceAddress: Yup.string().required(errorIcon),
    bankName: Yup.string().required(errorIcon),
    accountOwnerName: Yup.string().required(errorIcon),
    mainAccount: Yup.string().required(errorIcon),
    branch: Yup.string().required(errorIcon),
    country: Yup.string().required(errorIcon),
    currency: Yup.string().required(errorIcon),

    authorizedPersons: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(errorIcon),
        relationship: Yup.string().required(errorIcon),
        nationality: Yup.string().required(errorIcon),
        idType: Yup.string().required(errorIcon),
        idNumber: Yup.string().required(errorIcon),
        placeOfIssue: Yup.string().required(errorIcon),
        issueDate: Yup.date().required(errorIcon),
        expiryDate: Yup.date().required(errorIcon),
      })
    ),
      generalInformation: Yup.array().of(
        Yup.object().shape({
          namesOfNaturalPersons: Yup.string().required(errorIcon),
          namesOfDirectors: Yup.string().required(errorIcon),
        })
      ),
    accountNumber: Yup.string(),
    custodianName: Yup.string(),
    custodianAddress: Yup.string(),
    investmentKnowledgeDescription: Yup.string().required(errorIcon),
    investmentYears: Yup.number().required(errorIcon).positive().integer(),
    previousInvestments: Yup.string().required(errorIcon),
    loanToInvestedMoneyRatio: Yup.string().required(errorIcon),
    marginTransactions: Yup.string().required(errorIcon),
    securitiesTransactionsOutsideKingdom: Yup.string().required(errorIcon),
    countriesForSecuritiesTransactions: Yup.string().required(errorIcon),
    riskAppetite: Yup.string().required(errorIcon),

    investmentGoals: Yup.object()
      .shape({
        capitalProtection: Yup.boolean(),
        incomeGeneration: Yup.boolean(),
        balanced: Yup.boolean(),
        capitalGrowth: Yup.boolean(),

        retirementSavings: Yup.boolean(),
        projectFinancing: Yup.boolean(),
        assetPurchase: Yup.boolean(),
      })
      .test("at-least-one", errorIcon, value => {
        return Object.values(value).some(v => v === true)
      }),
  })

  const fetchGeneralInformation = async data => {
    // Format the data as needed
    const formattedData = {
      ...data,
      isPubliclyListed: String(data.isPubliclyListed), // Ensure isPubliclyListed is a string
      // Other fields can be coerced to string if necessary
    }

    try {
      const response = await axios.post(
        "https://itqan-strapi.softylus.com/api/general-informations",
        { data: formattedData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c", // Use your actual token here
          },
        }
      )

      // Return the general information object including the ID
      return {
        id: response.data.data.id,
        ...response.data.data.attributes, // This gives you all attributes
      }
    } catch (error) {
      console.error("Error fetching general information:", error)
      throw error // Throw the error to be handled in handleSubmit
    }
  }

  // Function to fetch authorized persons
  const fetchAuthorizedPersons = async data => {
    const formattedData = {
      ...data,
      idNumber: String(data.idNumber), // Ensure idNumber is a string
    }

    try {
      const response = await axios.post(
        "https://itqan-strapi.softylus.com/api/authorized-people",
        { data: formattedData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c", // Use your actual token here
          },
        }
      )

      // Return the whole authorized person object including the ID
      return {
        id: response.data.data.id,
        ...response.data.data.attributes, // This gives you all attributes
      }
    } catch (error) {
      console.error("Error fetching authorized persons:", error)
      throw error // Throw the error to be handled in handleSubmit
    }
  }

  // Main handleSubmit function
  const handleSubmit = async (
    values,
    { setSubmitting, setTouched, resetForm }
  ) => {
    console.log("Submitting Values:", values)

    // Function to convert values to strings
    const convertValuesToString = obj => {
      const result = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === "investmentGoals" && typeof obj[key] === "object") {
            result[key] = JSON.stringify(obj[key])
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = convertValuesToString(obj[key])
          } else {
            result[key] = String(obj[key])
          }
        }
      }

      // Add static values after looping
      result.staticValue1 = "This is a static value" // Example static value
      result.staticValue2 = "Another static value" // Example static value

      return result
    }

    const convertedObject = convertValuesToString(values)

    // Set touched fields
    setTouched({
      investorInformation: true,
      telephoneNumber: true,
      Building: true,
      // Continue to set others as true...
    })

    try {
      // Step 1: Send general information and retrieve their IDs
      const generalInformationPromises = values.generalInformation.map(info =>
        fetchGeneralInformation(info)
      )

      // Capture the responses with IDs
      const generalInfosData = await Promise.all(generalInformationPromises)
      console.log("General Information Data:", generalInfosData)

      // Create an array of IDs for general information
      const generalInformationIds = generalInfosData.map(info => ({
        id: info.id,
        isPubliclyListed: info.isPubliclyListed,
        namesOfNaturalPersons: info.namesOfNaturalPersons,
        namesOfDirectors: info.namesOfDirectors,
        otherFinancialInfo: info.otherFinancialInfo,
      }))

      // Step 2: Send authorized persons
      const authorizedPersonPromises = values.authorizedPersons.map(person =>
        fetchAuthorizedPersons(person)
      )
      const authorizedPeopleData = await Promise.all(authorizedPersonPromises)
      console.log("Authorized Person Data:", authorizedPeopleData)

      // Aggregate authorized person data into the main object
      convertedObject.authorized_people = authorizedPeopleData.map(person => ({
        id: person.id,
        name: person.name,
        relationship: person.relationship,
        nationality: person.nationality,
        idType: person.idType,
        idNumber: person.idNumber,
        placeOfIssue: person.placeOfIssue,
        issueDate: person.issueDate,
        expiryDate: person.expiryDate,
      }))

      // Step 3: Create a FormData object for companies login submission
      const formData = new FormData()
      convertedObject.general_informations = generalInformationIds // Attach general information IDs to the main object
      formData.append("data", JSON.stringify(convertedObject)) // Append the complete object

      // Perform the API submission for companies_login
      const response = await axios.post(
        "https://itqan-strapi.softylus.com/api/companies-logins?populate=*",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            Authorization:
              "Bearer 848485480979d1216343c88d697bd91d7e9d71cacffad3b1036c75e10813cc5849955b2fb50ea435089aa66e69976f378d4d040bc32930525651db4ad255615c24947494ddef876ec208ef49db6ba43f4a2eb05ddbee034e2b01f54741f2e9ea2f1930a4181d602dc086b7cde8a871f48d63596e07356bf2a56749c7c4f20b6c", // Replace with your actual token
          },
        }
      )

      // Check if the response is successful
      if (response.status === 200) {
        // Handle success (e.g., reset the form)
        setFormSubmitted(true)
        resetForm()
      } else {
        // Handle unexpected responses
        setFormError(true)
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      )
      setFormError(true) // Manage error state
    } finally {
      setSubmitting(false) // Essential for handling form submission states
    }
  }

  const rows = [
    { id: "depositsMurabah", label: "Deposits/Murabah (ودائع ومرابحات)" },
    { id: "debitInstruments", label: "Debit Instruments (أدوات دين)" },
    { id: "equity", label: "Equity (أسهم)" },
    { id: "investmentFund", label: "Investment Fund (صناديق استثمارية)" },
    { id: "realEstate", label: "Real estate (عقارات)" },
    {
      id: "derivativesContracts",
      label: "Derivatives contracts (عقود مشتقات)",
    },
    {
      id: "alternativeInvestments",
      label: "Alternative Investments (استثمارات بديلة)",
    },
  ]

  const rows2 = [
    {
      id: "Certificates",
      label: "الشهادات Certificates",
    },
    {
      id: "Dividends",
      label: "حصص الأرباح أو أي دخل آخر Dividends or any other income",
    },
    {
      id: "SalesProceed",
      label: "حصيلة البيع/ Sales proceed",
    },
  ]
  const calculateTotalPoints = values => {
    let totalPoints = 0

    totalPoints += parseInt(values.q1Answer) || 0 // Fallback to 0 if undefined or NaN
    totalPoints += parseInt(values.q3Answer) || 0
    totalPoints += parseInt(values.q4Answer) || 0
    totalPoints += parseInt(values.q5Answer) || 0

    return totalPoints
  }
  rows.forEach(row => {
    initialValues[`clientCurrentWallet${row.id}`] = 0 // Ensure initial values
    initialValues[`idealportfoliofortheclient${row.id}`] = 0 // Ensure initial values
  })
  const calculateTotal = (fieldPrefix, values, currentId, newValue) => {
    return rows.reduce((total, row) => {
      if (row.id === currentId) {
        return total + newValue
      }
      const value = parseFloat(values[`${fieldPrefix}${row.id}`]) || 0
      return total + value
    }, 0)
  }
  return (
    <Layout>
      <Seo
        title={
          locale === "en"
            ? "Open a Corporate Account - Customer Service - Itqan Capital"
            : "فتح حساب للشركات - خدمة العملاء - إتقان كابيتال"
        }
        description={
          locale === "en"
            ? "Agree on the terms and conditions for opening a corporate account with Itqan Capital. Fill out the form with the required information to start the process."
            : "الموافقة على شروط وأحكام فتح حساب الشركات لدى إتقان كابيتال. قم بتعبئة النموذج بالمعلومات المطلوبة لبدء العملية."
        } // Complete the Arabic description as needed
      />
      <ScrollToTopButton />
      <Hero title={<FormattedMessage id="companyAccount.title" />} />
      <section className="individuals-login-sec">
        <div className="individuals-login-container">
          <div className="individuals-login-title">
            <h1>
              <FormattedMessage id="investmentAccountAgreement.title" />
            </h1>
            <p>
              <FormattedMessage id="investmentAccountAgreement.chooseAccountType" />
            </p>
            <div className="individuals-login-buttons">
              <Link to="/companies-login">
                <button style={{ background: "#3F1A58", color: "#FFFFFF" }}>
                  <FormattedMessage id="investmentAccountAgreement.companyAccount" />
                </button>
              </Link>
              <Link to={`/${locale}/Individuals-login`}>
                <button style={{ background: "none", color: "#46235E" }}>
                  <FormattedMessage id="investmentAccountAgreement.individualAccount" />
                </button>
              </Link>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue, isSubmitting }) => {
              const currentTotalSum = calculateTotal(
                "clientCurrentWallet",
                values
              )
              const idealTotalSum = calculateTotal(
                "idealportfoliofortheclient",
                values
              )
              console.log(errors, "errors")
              return (
                <Form className="individuals-login-field">
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="companyInformation.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.companyName" />
                            <ErrorMessage
                              name="companyName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="companyName"
                            as="input"
                            style={{
                              border:
                                errors.companyName && touched.companyName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.legalEntity" />
                            <ErrorMessage
                              name="legalEntity"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="legalEntity"
                            as="input"
                            style={{
                              border:
                                errors.legalEntity && touched.legalEntity
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.unifiedNumber" />
                            <ErrorMessage
                              name="unifiedNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="number"
                            name="unifiedNumber"
                            as="input"
                            style={{
                              border:
                                errors.unifiedNumber && touched.unifiedNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.commercialRegistrationNumber" />
                            <ErrorMessage
                              name="commercialRegistrationNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="commercialRegistrationNumber"
                            as="input"
                            type="number"
                            style={{
                              border:
                                errors.commercialRegistrationNumber &&
                                touched.commercialRegistrationNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.establishmentDate" />
                            <ErrorMessage
                              name="establishmentDate"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="date"
                            name="establishmentDate"
                            max={new Date().toISOString().split("T")[0]}
                            style={{
                              border:
                                errors.establishmentDate &&
                                touched.establishmentDate
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.registeredAddress" />
                            <ErrorMessage
                              name="registeredAddress"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="registeredAddress"
                            as="input"
                            style={{
                              border:
                                errors.registeredAddress &&
                                touched.registeredAddress
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.buildingNumber" />
                            <ErrorMessage
                              name="buildingNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="buildingNumber"
                            as="input"
                            type="number"
                            style={{
                              border:
                                errors.buildingNumber && touched.buildingNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.streetName" />
                            <ErrorMessage
                              name="streetName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="streetName"
                            as="input"
                            style={{
                              border:
                                errors.streetName && touched.streetName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.district" />
                            <ErrorMessage
                              name="district"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="district"
                            as="input"
                            style={{
                              border:
                                errors.district && touched.district
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.city" />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="city"
                            as="input"
                            style={{
                              border:
                                errors.city && touched.city
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.postalCode" />
                            <ErrorMessage
                              name="postalCode"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="postalCode"
                            as="input"
                            style={{
                              border:
                                errors.postalCode && touched.postalCode
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                            type="number"
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.additionalNumber" />
                            <ErrorMessage
                              name="additionalNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="additionalNumber"
                            type="number"
                            as="input"
                            style={{
                              border:
                                errors.additionalNumber &&
                                touched.additionalNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.registrationCountry" />
                            <ErrorMessage
                              name="registrationCountry"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="registrationCountry"
                            as="input"
                            style={{
                              border:
                                errors.registrationCountry &&
                                touched.registrationCountry
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.businessActivityCountry" />
                            <ErrorMessage
                              name="businessActivityCountry"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="businessActivityCountry"
                            as="input"
                            style={{
                              border:
                                errors.businessActivityCountry &&
                                touched.businessActivityCountry
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.mainActivity" />
                            <ErrorMessage
                              name="mainActivity"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="mainActivity"
                            as="input"
                            style={{
                              border:
                                errors.mainActivity && touched.mainActivity
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.numberOfEmployees" />
                            <ErrorMessage
                              name="numberOfEmployees"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="numberOfEmployees"
                            as="input"
                            type="number"
                            style={{
                              border:
                                errors.numberOfEmployees &&
                                touched.numberOfEmployees
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.paidCapital" />
                            <ErrorMessage
                              name="paidCapital"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="paidCapital"
                            as="input"
                            style={{
                              border:
                                errors.paidCapital && touched.paidCapital
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.annualBusinessVolume" />
                            <ErrorMessage
                              name="annualBusinessVolume"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="annualBusinessVolume"
                            as="input"
                            style={{
                              border:
                                errors.annualBusinessVolume &&
                                touched.annualBusinessVolume
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="companyInformation.phone" />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="phone"
                            as="input"
                            style={{
                              border:
                                errors.phone && touched.phone
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            <FormattedMessage id="companyInformation.website" />
                          </label>
                          <Field
                            name="website"
                            as="input"
                            style={{
                              border:
                                errors.website && touched.website
                                  ? "1px solid red"
                                  : "1px solid #ccc",
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
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="accountStatements.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-single-field">
                        <label>
                          *
                          <FormattedMessage id="accountStatements.selectLabel" />
                          <ErrorMessage
                            name="Correspondence"
                            component="div"
                            className="error"
                          />
                        </label>
                        <Field
                          required
                          as="select"
                          name="Correspondence"
                          style={{
                            border:
                              errors.Correspondence && touched.Correspondence
                                ? "1px solid red"
                                : "1px solid #ccc",
                          }}
                        >
                          <option value="">
                            <FormattedMessage id="accountStatements.selectPlaceholder" />
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
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="contactInformation.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="contactInformation.contactNameLabel" />
                            <ErrorMessage
                              name="contactName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="contactName"
                            as="input"
                            style={{
                              border:
                                errors.contactName && touched.contactName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="contactInformation.businessPhoneLabel" />
                            <ErrorMessage
                              name="businessPhone"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="businessPhone"
                            as="input"
                            style={{
                              border:
                                errors.businessPhone && touched.businessPhone
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                            type="number"
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="contactInformation.emailLabel" />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="email"
                            as="input"
                            style={{
                              border:
                                errors.email && touched.email
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="contactInformation.mobileNumberLabel" />
                            <ErrorMessage
                              name="mobileNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="mobileNumber"
                            as="input"
                            type="number"
                            style={{
                              border:
                                errors.mobileNumber && touched.mobileNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="contactInformation.correspondenceAddressLabel" />
                            <ErrorMessage
                              name="correspondenceAddress"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="correspondenceAddress"
                            as="input"
                            style={{
                              border:
                                errors.correspondenceAddress &&
                                touched.correspondenceAddress
                                  ? "1px solid red"
                                  : "1px solid #ccc",
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
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="bankAccountInformation.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.bankNameLabel" />
                            <ErrorMessage
                              name="bankName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="bankName"
                            as="input"
                            style={{
                              border:
                                errors.bankName && touched.bankName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.accountOwnerNameLabel" />
                            <ErrorMessage
                              name="accountOwnerName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="accountOwnerName"
                            as="input"
                            style={{
                              border:
                                errors.accountOwnerName &&
                                touched.accountOwnerName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.mainAccountLabel" />
                            <ErrorMessage
                              name="mainAccount"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="mainAccount"
                            as="input"
                            type="number"
                            style={{
                              border:
                                errors.mainAccount && touched.mainAccount
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.branchLabel" />
                            <ErrorMessage
                              name="branch"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="branch"
                            as="input"
                            style={{
                              border:
                                errors.branch && touched.branch
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.countryLabel" />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="country"
                            as="input"
                            style={{
                              border:
                                errors.country && touched.country
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="bankAccountInformation.currencyLabel" />
                            <ErrorMessage
                              name="currency"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            name="currency"
                            as="input"
                            style={{
                              border:
                                errors.currency && touched.currency
                                  ? "1px solid red"
                                  : "1px solid #ccc",
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
    className="individuals-sec-field-title"
  >
    <h3>
      <FormattedMessage id="generalInformation.title" />
    </h3>
  </AccordionSummary>
  <AccordionDetails>
    <div className="individuals-sec-field">
      <div className="individuals-single-field">
        <label>
          *
          <FormattedMessage id="generalInformation.isPubliclyListedLabel" />
          <ErrorMessage
            name={`isPubliclyListed`}
            component="div"
            className="error"
          />
        </label>
        <Field
          required
          as="select"
          name={`isPubliclyListed`}
          style={{
            border:
              errors.isPubliclyListed &&
              touched.isPubliclyListed
                ? "1px solid red"
                : "1px solid #ccc",
          }}
        >
          <option value="">
            -- <FormattedMessage id="generalInformation.selectOption" /> --
          </option>
          <option value="نعم">
            <FormattedMessage id="generalInformation.yesOption" />
          </option>
          <option value="لا">
            <FormattedMessage id="generalInformation.noOption" />
          </option>
        </Field>
      </div>

      <div className="individuals-single-field">
        <label>
          *
          <FormattedMessage id="generalInformation.otherFinancialInfoLabel" />
          <ErrorMessage
            name={`otherFinancialInfo`}
            component="div"
            className="error"
          />
        </label>
        <Field
          required
          name={`otherFinancialInfo`}
          as="input"
          style={{
            border:
              errors.otherFinancialInfo &&
              touched.otherFinancialInfo
                ? "1px solid red"
                : "1px solid #ccc",
          }}
        />
      </div>
      </div>

      <FieldArray name="generalInformation">
  {({ push, remove }) => (
    <>
      {(values.generalInformation && values.generalInformation.length > 0 ? values.generalInformation : [{}]).map((info, index) => (
        <React.Fragment key={index}>
          <div className="individuals-sec-field-generalInformation">
            <div className="individuals-sec-field">

              <div className="individuals-single-field">
                <label>
                  *
                  <FormattedMessage id="generalInformation.namesOfNaturalPersonsLabel" />
                  <ErrorMessage
                    name={`generalInformation.${index}.namesOfNaturalPersons`} // Removed .persons
                    component="div"
                    className="error"
                  />
                </label>
                <Field
                  required
                  name={`generalInformation.${index}.namesOfNaturalPersons`} // Removed .persons
                  as="input"
                  style={{
                    border:
                      errors.generalInformation?.[index]?.namesOfNaturalPersons &&
                      touched.generalInformation?.[index]?.namesOfNaturalPersons
                        ? "1px solid red"
                        : "1px solid #ccc",
                  }}
                />
              </div>

              <div className="individuals-single-field">
                <label>
                  *
                  <FormattedMessage id="generalInformation.namesOfDirectorsLabel" />
                  <ErrorMessage
                    name={`generalInformation.${index}.namesOfDirectors`} // Removed .persons
                    component="div"
                    className="error"
                  />
                </label>
                <Field
                  required
                  name={`generalInformation.${index}.namesOfDirectors`} // Removed .persons
                  as="input"
                  style={{
                    border:
                      errors.generalInformation?.[index]?.namesOfDirectors &&
                      touched.generalInformation?.[index]?.namesOfDirectors
                        ? "1px solid red"
                        : "1px solid #ccc",
                  }}
                />
              </div>

            </div>
            {index > 0 && (
              <button
                className="authorizedPersons-button"
                type="button"
                onClick={() => remove(index)}
              >
                <img src="/trash.svg" />
              </button>
            )}
          </div>
        </React.Fragment>
      ))}
      <button
        className="authorizedPersons-button"
        type="button"
        onClick={() =>
          push({
            namesOfNaturalPersons: "",
            namesOfDirectors: "",
          })
        }
      >
        + <p> <FormattedMessage id="generalInformation.addperson" /></p>
      </button>
    </>
  )}
</FieldArray>

  </AccordionDetails>
</Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="authorizedPersons.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FieldArray name="authorizedPersons">
                        {({ push, remove }) => (
                          <>
                            {values.authorizedPersons.map((person, index) => (
                              <>
                                <div
                                  key={index}
                                  className="individuals-sec-field"
                                >
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.authorizedNameLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.name`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      name={`authorizedPersons.${index}.name`}
                                      as="input"
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.name &&
                                          touched.authorizedPersons?.[index]
                                            ?.name
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />{" "}
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.relationshipLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.relationship`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      name={`authorizedPersons.${index}.relationship`}
                                      as="input"
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.relationship &&
                                          touched.authorizedPersons?.[index]
                                            ?.relationship
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.nationalityLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.nationality`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      name={`authorizedPersons.${index}.nationality`}
                                      as="input"
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.nationality &&
                                          touched.authorizedPersons?.[index]
                                            ?.nationality
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.idTypeLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.idType`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      as="select"
                                      name={`authorizedPersons.${index}.idType`}
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.idType &&
                                          touched.authorizedPersons?.[index]
                                            ?.idType
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    >
                                      <option value="">
                                        --{" "}
                                        <FormattedMessage id="authorizedPersons.selectOption" />{" "}
                                        --
                                      </option>
                                      <option value="Family ID">
                                        <FormattedMessage id="authorizedPersons.familyIdOption" />
                                      </option>
                                      <option value="National ID">
                                        <FormattedMessage id="authorizedPersons.nationalIdOption" />
                                      </option>
                                      <option value="Passport">
                                        <FormattedMessage id="authorizedPersons.passportOption" />
                                      </option>
                                      <option value="Residence">
                                        <FormattedMessage id="authorizedPersons.residenceOption" />
                                      </option>
                                    </Field>
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.idNumberLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.idNumber`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      name={`authorizedPersons.${index}.idNumber`}
                                      as="input"
                                      type="number"
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.idNumber &&
                                          touched.authorizedPersons?.[index]
                                            ?.idNumber
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.placeOfIssueLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.placeOfIssue`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      name={`authorizedPersons.${index}.placeOfIssue`}
                                      as="input"
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.placeOfIssue &&
                                          touched.authorizedPersons?.[index]
                                            ?.placeOfIssue
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.issueDateLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.issueDate`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      type="date"
                                      name={`authorizedPersons.${index}.issueDate`}
                                      max={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.issueDate &&
                                          touched.authorizedPersons?.[index]
                                            ?.issueDate
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                  <div className="individuals-single-field">
                                    <label>
                                      *
                                      <FormattedMessage id="authorizedPersons.expiryDateLabel" />
                                      <ErrorMessage
                                        name={`authorizedPersons.${index}.expiryDate`}
                                        component="div"
                                        className="error"
                                      />
                                    </label>
                                    <Field
                                      required
                                      type="date"
                                      name={`authorizedPersons.${index}.expiryDate`}
                                      min={
                                        values.authorizedPersons?.[index]
                                          ?.issueDate
                                      }
                                      style={{
                                        border:
                                          errors.authorizedPersons?.[index]
                                            ?.expiryDate &&
                                          touched.authorizedPersons?.[index]
                                            ?.expiryDate
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                  </div>
                                </div>
                                <button
                                  className="authorizedPersons-button"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </button>
                              </>
                            ))}

                            <button
                              className="authorizedPersons-button"
                              type="button"
                              onClick={() =>
                                push({
                                  name: "",
                                  relationship: "",
                                  nationality: "",
                                  idType: "",
                                  idNumber: "",
                                  placeOfIssue: "",
                                  issueDate: "",
                                  expiryDate: "",
                                })
                              }
                            >
                              +
                            </button>
                          </>
                        )}
                      </FieldArray>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="investmentKnowledge.title" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.knowledgeDescriptionLabel" />
                            <ErrorMessage
                              name="investmentKnowledgeDescription"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            as="select"
                            name="investmentKnowledgeDescription"
                            style={{
                              border:
                                errors.investmentKnowledgeDescription &&
                                touched.investmentKnowledgeDescription
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          >
                            <option value="">
                              <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                            </option>
                            <option value="Extensive">
                              <FormattedMessage id="investmentKnowledge.extensiveOption" />
                            </option>
                            <option value="Good">
                              <FormattedMessage id="investmentKnowledge.goodOption" />
                            </option>
                            <option value="Limited">
                              <FormattedMessage id="investmentKnowledge.limitedOption" />
                            </option>
                          </Field>
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.investmentYearsLabel" />
                            <ErrorMessage
                              name="investmentYears"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="number"
                            name="investmentYears"
                            as="input"
                            style={{
                              border:
                                errors.investmentYears &&
                                touched.investmentYears
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.previousInvestmentsLabel" />
                            <ErrorMessage
                              name="previousInvestments"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="text"
                            name="previousInvestments"
                            as="input"
                            style={{
                              border:
                                errors.previousInvestments &&
                                touched.previousInvestments
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>

                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.loanToInvestedMoneyRatioLabel" />
                            <ErrorMessage
                              name="loanToInvestedMoneyRatio"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="text"
                            name="loanToInvestedMoneyRatio"
                            as="input"
                            style={{
                              border:
                                errors.loanToInvestedMoneyRatio &&
                                touched.loanToInvestedMoneyRatio
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.marginTransactionsLabel" />
                            <ErrorMessage
                              name="marginTransactions"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="text"
                            name="marginTransactions"
                            as="input"
                            style={{
                              border:
                                errors.marginTransactions &&
                                touched.marginTransactions
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.securitiesTransactionsOutsideKingdomLabel" />
                            <ErrorMessage
                              name="securitiesTransactionsOutsideKingdom"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="text"
                            name="securitiesTransactionsOutsideKingdom"
                            as="input"
                            style={{
                              border:
                                errors.securitiesTransactionsOutsideKingdom &&
                                touched.securitiesTransactionsOutsideKingdom
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.countriesForSecuritiesTransactionsLabel" />
                            <ErrorMessage
                              name="countriesForSecuritiesTransactions"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            type="text"
                            name="countriesForSecuritiesTransactions"
                            as="input"
                            style={{
                              border:
                                errors.countriesForSecuritiesTransactions &&
                                touched.countriesForSecuritiesTransactions
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="investmentKnowledge.riskAppetiteLabel" />
                            <ErrorMessage
                              name="riskAppetite"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            required
                            as="select"
                            name="riskAppetite"
                            style={{
                              border:
                                errors.riskAppetite && touched.riskAppetite
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          >
                            <option value="">
                              <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                            </option>
                            <option value="Extensive">
                              <FormattedMessage id="investmentKnowledge.extensiveOption" />
                            </option>
                            <option value="Good">
                              <FormattedMessage id="investmentKnowledge.goodOption" />
                            </option>
                            <option value="Limited">
                              <FormattedMessage id="investmentKnowledge.limitedOption" />
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
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="investmentGoals.heading" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.capitalProtection" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.capitalProtection"
                          />
                        </div>
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.incomeGeneration" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.incomeGeneration"
                          />
                        </div>
                        <div className="individuals-single-field checkbox">
                          <label>
                            *<FormattedMessage id="investmentGoals.balanced" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.balanced"
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.capitalGrowth" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.capitalGrowth"
                          />
                        </div>
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.retirementSavings" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.retirementSavings"
                          />
                        </div>
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.projectFinancing" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.projectFinancing"
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="investmentGoals.assetPurchase" />
                          </label>
                          <Field
                            type="checkbox"
                            name="investmentGoals.assetPurchase"
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *<FormattedMessage id="investmentGoals.other" />
                          </label>
                          <Field required name="investmentGoals.other" />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="favoriteInvestmentAssets.heading" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <label className="selectMultipleCategories">
                        <FormattedMessage id="favoriteInvestmentAssets.selectMultipleCategories" />
                      </label>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="favoriteInvestmentAssets.saudiAssets" />
                          </label>
                          <Field type="checkbox" name="saudiAssets" />
                        </div>
                        <div className="individuals-single-field checkbox">
                          <label>
                            *
                            <FormattedMessage id="favoriteInvestmentAssets.foreignCurrencyAssets" />
                          </label>
                          <Field type="checkbox" name="foreignCurrencyAssets" />
                        </div>
                      </div>
                      <div className="individuals-sec-field">
                        {({ values }) =>
                          values.foreignCurrencyAssets && (
                            <div className="individuals-single-field">
                              <label>
                                *
                                <FormattedMessage id="favoriteInvestmentAssets.selectForeignCurrencies" />
                                <ErrorMessage
                                  name="selectedForeignCurrencies"
                                  component="div"
                                  className="error"
                                />
                              </label>
                              <Field
                                required
                                name="selectedForeignCurrencies"
                              />
                            </div>
                          )
                        }
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="investmentPortfolioInformation.heading" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field table">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="investment portfolio table"
                          >
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
                              {rows.map(row => (
                                <TableRow key={row.id}>
                                  <TableCell component="th" scope="row">
                                    {row.label}
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      required
                                      type="number"
                                      name={`clientCurrentWallet${row.id}`}
                                      min="0"
                                      step="any"
                                      onChange={e => {
                                        const value =
                                          parseFloat(e.target.value) || 0
                                        const newCurrentTotal = calculateTotal(
                                          "clientCurrentWallet",
                                          values,
                                          row.id,
                                          value
                                        )

                                        if (newCurrentTotal > 100) {
                                          const adjustedValue = Math.max(
                                            0,
                                            value - (newCurrentTotal - 100)
                                          )
                                          setFieldValue(
                                            `clientCurrentWallet${row.id}`,
                                            adjustedValue
                                          )
                                        } else {
                                          setFieldValue(
                                            `clientCurrentWallet${row.id}`,
                                            value
                                          )
                                        }

                                        // Check if the new total is 100% and update a state variable
                                        setIsCurrentTotal100(
                                          newCurrentTotal === 100
                                        )
                                      }}
                                      style={{
                                        border:
                                          errors[
                                            `clientCurrentWallet${row.id}`
                                          ] &&
                                          touched[
                                            `clientCurrentWallet${row.id}`
                                          ]
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                    <ErrorMessage
                                      name={`clientCurrentWallet${row.id}`}
                                      component="div"
                                      className="error"
                                    />
                                    {isCurrentTotal100 && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "5px",
                                          fontSize: "0.8em",
                                        }}
                                      >
                                        <FormattedMessage id="inputErrorMessage" />
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      required
                                      type="number"
                                      name={`idealportfoliofortheclient${row.id}`}
                                      min="0"
                                      step="any"
                                      onChange={e => {
                                        const value =
                                          parseFloat(e.target.value) || 0
                                        const newIdealTotal = calculateTotal(
                                          "idealportfoliofortheclient",
                                          values,
                                          row.id,
                                          value
                                        )

                                        if (newIdealTotal > 100) {
                                          const adjustedValue = Math.max(
                                            0,
                                            value - (newIdealTotal - 100)
                                          )
                                          setFieldValue(
                                            `idealportfoliofortheclient${row.id}`,
                                            adjustedValue
                                          )
                                        } else {
                                          setFieldValue(
                                            `idealportfoliofortheclient${row.id}`,
                                            value
                                          )
                                        }

                                        // Check if the new total is 100% and update a state variable
                                        setIsIdealTotal100(
                                          newIdealTotal === 100
                                        )
                                      }}
                                      style={{
                                        border:
                                          errors[
                                            `idealportfoliofortheclient${row.id}`
                                          ] &&
                                          touched[
                                            `idealportfoliofortheclient${row.id}`
                                          ]
                                            ? "1px solid red"
                                            : "1px solid #ccc",
                                      }}
                                    />
                                    <ErrorMessage
                                      name={`idealportfoliofortheclient${row.id}`}
                                      component="div"
                                      className="error"
                                    />
                                    {isIdealTotal100 && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "5px",
                                          fontSize: "0.8em",
                                        }}
                                      >
                                        <FormattedMessage id="inputErrorMessage" />
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell>
                                  <FormattedMessage id="tableData.checkPercentageSum" />
                                </TableCell>
                                <TableCell>
                                  {calculateTotal(
                                    "clientCurrentWallet",
                                    values
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                                <TableCell>
                                  {calculateTotal(
                                    "idealportfoliofortheclient",
                                    values
                                  ).toFixed(2)}
                                  %
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded className="table-table">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="individuals-login-field"
                      className="individuals-sec-field-title"
                    >
                      <h3>
                        <FormattedMessage id="header.custodianInfo" />
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="individuals-sec-field">
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="form.accountNumber" />
                            <ErrorMessage
                              name="accountNumber"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            name="accountNumber"
                            type="number"
                            as="input"
                            style={{
                              border:
                                errors.accountNumber && touched.accountNumber
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="form.custodianName" />
                            <ErrorMessage
                              name="custodianName"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            name="custodianName"
                            as="input"
                            style={{
                              border:
                                errors.custodianName && touched.custodianName
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                        <div className="individuals-single-field">
                          <label>
                            *
                            <FormattedMessage id="form.custodianAddress" />
                            <ErrorMessage
                              name="custodianAddress"
                              component="div"
                              className="error"
                            />
                          </label>
                          <Field
                            name="custodianAddress"
                            as="input"
                            style={{
                              border:
                                errors.custodianAddress &&
                                touched.custodianAddress
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                          />
                        </div>
                      </div>
                      <div className="individuals-sec-field table">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="send to table"
                          >
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
                              {rows2.map(row => (
                                <TableRow key={row.id}>
                                  <TableCell component="th" scope="row">
                                    {row.label}
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`client${row.id}`}
                                      type="checkbox"
                                      as={Checkbox}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`custodian${row.id}`}
                                      type="checkbox"
                                      as={Checkbox}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      required
                                      name={`OtherParties${row.id}`}
                                      as={TextField}
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <button
                    type="submit"
                    className="individuals-buttom-form"
                    disabled={isSubmitting}
                  >
                    <FormattedMessage id="form.submit" />
                  </button>
                </Form>
              )
            }}
          </Formik>

          <Modal
            isOpen={formSubmitted || formError}
            onRequestClose={() => {
              setFormSubmitted(false)
              setFormError(false)
            }}
          >
            {formSubmitted ? (
              <div className="Contact-successfuly">
                <button
                  onClick={() => {
                    setFormSubmitted(false)
                  }}
                >
                  <img src="/close.svg" alt="Close" />
                </button>
                <div className="Contact-successfuly-body">
                  <Player
                    autoplay
                    loop
                    src={Successfully}
                    style={{ height: "200px", width: "200px" }}
                  >
                    <Controls
                      visible={false}
                      buttons={["play", "repeat", "frame", "debug"]}
                    />
                  </Player>
                  <h4>
                    <FormattedMessage id="form.success" />
                  </h4>
                </div>
              </div>
            ) : (
              <div className="Contact-error">
                <button
                  onClick={() => {
                    setFormError(false)
                  }}
                >
                  <img src="/close.svg" alt="Close" />
                </button>
                <div className="Contact-error-body">
                  <Player
                    autoplay
                    loop
                    src={Fail}
                    style={{ height: "200px", width: "200px" }}
                  >
                    <Controls
                      visible={false}
                      buttons={["play", "repeat", "frame", "debug"]}
                    />
                  </Player>
                  <h4>
                    <FormattedMessage id="form.error" />
                  </h4>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </section>
    </Layout>
  )
}

export default CompaniesLogin
