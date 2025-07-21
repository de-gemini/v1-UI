

import React from 'react';


export type ContentPiece = string | { text: string; href?: string; bold?: boolean };

interface SubSection {
  point?: string;
  content: ContentPiece[];
  subTitle?: string; 
}


interface TermSection {
  title: string;
  sectionNumber: number;
  subsections: SubSection[];
}

const termsData: TermSection[] = [
  {
    sectionNumber: 1,
    title: "ABOUT US",
    subsections: [
      {
        point: "1.1",
        content: [
          "Welcome to our website ",
          { text: "www.de-gemini.co.uk", href: "https://de-gemini.netlify.app" },
          ". If you continue to browse and use this website, you are agreeing to comply with and be bound by the following Website Terms and Conditions of use, which together with our ",
          { text: "Booking Terms and Conditions", href: "/booking-terms" },
          " and ",
          { text: "Privacy Policy", href: "/privacy-policy" },
          " govern De-gemini's relationship with you. ",
          { text: "If you disagree with any part of these terms and conditions, please do not use our website.", bold: true },
        ],
      },
      {
        point: "1.2",
        content: [
          "These are the terms and conditions on which ",
          { text: "we, De-gemini Ltd.", bold: true },
          " supply our services to you (“Customer”), via our website – ",
          { text: "www.de-gemini.co.uk", href: "https://de-gemini.netlify.app" },
          ", our ",
          { text: "App", href: "/app" },
          " and the ",
          { text: "De-gemini Platform", href: "/platform" },
          " (collectively referred to throughout these Terms and Conditions as “Website”).",
        ],
      },
      {
        point: "1.3",
        content: [
          "If you are a customer, then these Website Terms and Conditions ",
          { text: "MUST", bold: true },
          " be read in conjunction with our ",
          { text: "Booking Terms and Conditions.", href: "/booking-terms" },
        ],
      },
      {
        point: "1.4",
        content: [
          "Our registered office is: 11-13 Bayley street, London, WC1B3HD. Our company registration number is 10643724.",
        ],
      },
      {
        subTitle: "What we do",
        point: "1.5",
        content: [
          "De-gemini provides an online platform to facilitate the introduction of self-employed domestic cleaners (“De-gemini”) and customers who require domestic cleaning.",
        ],
      },
    ],
  },
  {
    sectionNumber: 2,
    title: "PRIVACY",
    subsections: [
      {
        point: "2.1",
        content: [
          "When you use our website, you will be providing us with personal data about you. You can see how we use the personal data by going to our ",
          { text: "Privacy Policy.", href: "/privacy-policy" },
        ],
      },
      {
        point: "2.2",
        content: [
          "This website uses cookies to monitor browsing preferences. If you do not wish for cookies to be used, then please disable cookies in your browser. (Please see our ",
          { text: "Cookie Policy", href: "/cookie-policy" },
          " for details on how to disable cookies on your browser.)",
        ],
      },
    ],
  },
  {
    sectionNumber: 3,
    title: "YOUR ACCOUNT AND PASSWORD",
    subsections: [
        {
            point: "3.1",
            content: [
                "When you register on our website you will be asked to create your user credentials. (“User”) You are responsible for all use of your credentials and your account."
            ]
        },
        {
            point: "3.2",
            content: [
                "You agree to keep your User details secret. We may disable any User, at any time, if in our reasonable opinion they have failed to comply with any of the provisions of these terms of use."
            ]
        },
        {
            point: "3.3",
            content: [
                " If you believe or suspect that your User login details have been compromised, please notify us at: and update your user credentials immediately.",

            ]
        }
    ]
  },
  {
    sectionNumber: 4,
    title: "ACCESSING OUR WEBSITE",
    subsections: [
      {
        point: "4.1",
        content: [
          "We do not guarantee that our website will always be available or will be uninterrupted or error free.",
        ],
      },
      {
        point: "4.2",
        content: [
          "We will not be held responsible if for any reason our website is unavailable to you.",
        ],
      },
    ],
  },
  {
    sectionNumber: 5,
    title: "CHANGES TO OUR WEBSITE",
    subsections: [
      {
        point: "5.1",
        content: [
          "We may update, change, suspend or withdraw our website, in whole or part, at any time for our own business reasons. We will try and give you reasonable notice of any suspension or withdrawal.",
        ],
      },
    ],
  },
  {
    sectionNumber: 6,
    title: "UPLOADING CONTENT TO OUR WEBSITE",
    subsections: [
      {
        point: "6.1",
        content: [
          "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
        ],
      },
      {
        point: "6.2",
        content: [
          "We will not be liable to any third-party for the content or accuracy of any content posted by you or any other user of our website.",
        ],
      },
      {
        point: "6.3",
        content: [
          "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
        ],
      },
      {
        point: "6.4",
        content: [
          "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
        ],
      },
    ],
  },
  {
    sectionNumber: 7,
    title: " INTELLECTUAL PROPERTY RIGHTS",
    subsections: [
      {
        point: "7.1",
        content: [
          " We are the owner or the licensee of all intellectual property rights on the website, being any and all rights under patent law, copyright law, trade secret law, trademark law, and any and all other proprietary rights.",
        ],
      },
      {
        point: "7.2",
        content: [
          "We expressly reserve all intellectual property rights on our website, app and platform, including the eMop domain name and all related domains and sub-domains, the name “eMop”, our logo device, service marks, trading names and/or trademarks. Other trademarks and product/company names mentioned on eMop platform may be trademarks of their respective owners or licensors and the rights in such marks are reserved to them.",
        ],
      },
      {
        point: "7.3",
        content: [
          "Any content you upload to our website will be considered non-confidential and non-proprietary, and we have the right to use, copy, distribute and disclose to third parties any such content for any purpose. You grant us a worldwide, non-exclusive, irrevocable, perpetual, royalty-free license to reproduce, adapt, distribute and publish such uploaded content.",
        ],
      },
      {
        point: "7.4",
        content: [
          "You may not extract and/or re-utilise parts of the content of our website, app or platform without our express written permission. You may also not create and/or publish your own database that features substantial parts of our website, app or platform without our express written permission.",
        ],
      },
      {
        point: "7.5",
        content: [
          "YSubject to your compliance with these terms we grant you a limited, non-exclusive, non-transferable, non-sublicensable licence to access and make use of our website. This licence does not include any resale or commercial use of our website.",
        ],
      },
      {
        point: "7.6",
        content: [
          "All rights not expressly granted to you in these terms are reserved and retained by us or our licensors, suppliers or other content providers.",
        ],
      },
    ],
  }
];


export const policyData: TermSection[] = [
    {
      sectionNumber: 1,
      title: "THESE TERMS",
      subsections: [
        {
          point: "1.1",
          content: [
            "Please read these Booking Terms and Conditions carefully before you submit your booking to eMop Ltd (“eMop” “we” “us”). These terms tell you how we will provide services to you (“Customer”), how you or eMop may change or end the contract, what to do if there is a problem and other important information. ",
          ],
        },
        {
          point: "1.2",
          content: [
            " These Booking Terms and Conditions ",
            { text: " MUST ", bold: true },
            "be read in conjunction with our",
            { text: " Website terms and conditions", href: "/terms-and-conditions" },
          ],
        },
        {
          point: "1.3",
          content: [
            " By making a booking via the eMop platform, you confirm that you accept these terms and conditions, and that you agree to comply with them. If you think that there is a mistake in these Booking Terms and Conditions please contact us to discuss the issue. If there is anything you do not agree with in these Booking Terms and Conditions, please do not make a booking. If there is anything you do not understand in these Booking Terms and Conditions, then please contact us at support@emop.world and we will do our best to assist you.",
          ],
        },
      ],
    },
    {
      sectionNumber: 2,
      title: "SUMMARY",
      subsections: [
        {
          point: "2.1",
          content: [
            "When you use our website, you will be providing us with personal data about you. You can see how we use the personal data by going to our ",
            { text: "Privacy Policy.", href: "/privacy-policy" },
          ],
        },
        {
          point: "",
          content: [
            "We, eMop Ltd, are not a cleaning company. We simply provide a platform where Customers can order cleaning services",
            { text: `(“Service”)`, bold: true },
            "; we administer the booking and collect payment.)",
          ],
        },
        {
            point: "",
            content: [
              "Cleaning services ordered via the eMop platform are performed by “eMoppers”, self-employed cleaners who have registered on our website. When a service is accepted by an eMopper, the customer will enter into a separate contract with the eMopper.",
            ],
          },
          {
            point: "",
            content: [
              "We are not responsible for the performance of service provided by eMoppers, however in some cases we rearrange the service to ensure customer satisfaction.",
            ],
          },
          {
            point: "",
            content: [
              "By agreeing to these Booking Terms and Conditions you agree to our ",
              {text: "Сancellation Policy", href: '/cancellation-policy'},
              " and Cancellation fees.",
            ],
          },
          {
            point: "",
            content: [
              "We are not responsible for loss of income, revenue, business, profits, anticipated savings, data or waste of management or office time.",
            ],
          },
          {
            point: "",
            content: [
              "We may amend these Booking Terms and Conditions from time to time, and the Booking Terms and Conditions in force at the time a service is made will apply to that service.",
            ],
          },
          {
            point: "",
            content: [
              "Nothing in these Booking Terms and Conditions affects your statutory rights as a customer or excludes or limits our liability if you suffer personal injury or death as a result of our negligence, or if you suffer loss or damage as a result of our fraud or fraudulent misrepresentation.",
            ],
          },
      ],
    },
    {
      sectionNumber: 3,
      title: " INFORMATION ABOUT US AND HOW TO CONTACT US",
      subsections: [
          {
              point: "3.1",
              content: [
                  "When you register on our website you will be asked to create your user credentials. (“User”) You are responsible for all use of your credentials and your account."
              ]
          },
          {
              point: "3.2",
              content: [
                  "You agree to keep your User details secret. We may disable any User, at any time, if in our reasonable opinion they have failed to comply with any of the provisions of these terms of use."
              ]
          },
          {
              point: "3.3",
              content: [
                  " If you believe or suspect that your User login details have been compromised, please notify us at: and update your user credentials immediately.",
  
              ]
          }
      ]
    },
    {
      sectionNumber: 4,
      title: "ACCESSING OUR WEBSITE",
      subsections: [
        {
          point: "4.1",
          content: [
            "We do not guarantee that our website will always be available or will be uninterrupted or error free.",
          ],
        },
        {
          point: "4.2",
          content: [
            "We will not be held responsible if for any reason our website is unavailable to you.",
          ],
        },
      ],
    },
    {
      sectionNumber: 5,
      title: "CHANGES TO OUR WEBSITE",
      subsections: [
        {
          point: "5.1",
          content: [
            "We may update, change, suspend or withdraw our website, in whole or part, at any time for our own business reasons. We will try and give you reasonable notice of any suspension or withdrawal.",
          ],
        },
      ],
    },
    {
      sectionNumber: 6,
      title: "UPLOADING CONTENT TO OUR WEBSITE",
      subsections: [
        {
          point: "6.1",
          content: [
            "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
          ],
        },
        {
          point: "6.2",
          content: [
            "We will not be liable to any third-party for the content or accuracy of any content posted by you or any other user of our website.",
          ],
        },
        {
          point: "6.3",
          content: [
            "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
          ],
        },
        {
          point: "6.4",
          content: [
            "We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.",
          ],
        },
      ],
    },
    {
      sectionNumber: 7,
      title: " INTELLECTUAL PROPERTY RIGHTS",
      subsections: [
        {
          point: "7.1",
          content: [
            " We are the owner or the licensee of all intellectual property rights on the website, being any and all rights under patent law, copyright law, trade secret law, trademark law, and any and all other proprietary rights.",
          ],
        },
        {
          point: "7.2",
          content: [
            "We expressly reserve all intellectual property rights on our website, app and platform, including the eMop domain name and all related domains and sub-domains, the name “eMop”, our logo device, service marks, trading names and/or trademarks. Other trademarks and product/company names mentioned on eMop platform may be trademarks of their respective owners or licensors and the rights in such marks are reserved to them.",
          ],
        },
        {
          point: "7.3",
          content: [
            "Any content you upload to our website will be considered non-confidential and non-proprietary, and we have the right to use, copy, distribute and disclose to third parties any such content for any purpose. You grant us a worldwide, non-exclusive, irrevocable, perpetual, royalty-free license to reproduce, adapt, distribute and publish such uploaded content.",
          ],
        },
        {
          point: "7.4",
          content: [
            "You may not extract and/or re-utilise parts of the content of our website, app or platform without our express written permission. You may also not create and/or publish your own database that features substantial parts of our website, app or platform without our express written permission.",
          ],
        },
        {
          point: "7.5",
          content: [
            "YSubject to your compliance with these terms we grant you a limited, non-exclusive, non-transferable, non-sublicensable licence to access and make use of our website. This licence does not include any resale or commercial use of our website.",
          ],
        },
        {
          point: "7.6",
          content: [
            "All rights not expressly granted to you in these terms are reserved and retained by us or our licensors, suppliers or other content providers.",
          ],
        },
      ],
    }
  ];

export default termsData;


