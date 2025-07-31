

export interface FaqItem {
    id: number;
    question: string;
    answer: string | JSX.Element;
  }
  
  export interface FaqData {
    title: string;
    subtitle?: string;
    items?: FaqItem[];
  }

  export const defaultFAQ: FaqData = {
    title: "Frequently asked questions",
  subtitle: "Find answers to the most common questions about our services, process, and support. If you need more help, feel free to contact us.",
  items: [
    {
      id: 1,
      question: "How do I get good cleaners in England?",
      answer: "First, ask for recommendations from friends or family living in the city. They can help you identify good options. Second, check online directories and review sites to see what others have said about different cleaners in England. That can give you a good idea of who to contact and who to avoid. Finally, you can also contact a trusted company like our and choose from our top-rated professionals.",
    },
    {
      id: 2,
      question: "How much do UK cleaners cost?",
      answer:
        "The price of hiring a home professional in the UK will range between £17.99 to £25 per hour. our offers competitive prices while maintaining high quality standards. When you hire through our service, we guarantee that all our employees are highly trained and vetted for your safety and peace of mind. The average hourly rate for a general service is £17.99 per hour. This covers tasks such as tidying, dusting, vacuuming, wiping down surfaces and carpets, and cleaning toilets. However, it's always best to check with the cleaners beforehand to see what is included in their package.",
    },
    {
      id: 3,
      question: "What can a cleaner do in three hours?",
      answer:
        "Here are some things that can be accomplished in three hours: sanitising countertops; making the bathroom, including bathtubs, shower heads, and toilets, spotless; dusting the skirting boards and vacuuming/mopping the floor; doing the laundry; wiping down the sink and countertops, and washing the dishes;",
    },
    {
      id: 4,
      question: "Should I clean before a cleaner comes?",
      answer:
        "It is not necessary to clean before a cleaner arrives. our cleaners are used to working in homes that are not perfectly clean, and they will be able to adjust their approach accordingly.",
    },
  ]
  }


  export const priceHome: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "What do most house cleaners charge per hour?",
      answer: "House cleaners charge from £17.99/h for one-off cleanings and from £17.99/h for regular cleanings in England.",
    },
    {
      id: 2,
      question: "How much does it cost to hire a house cleaner in England?",
      answer:
        "The cost of hiring a house cleaner in England depends on factors such as the type of service, location, experience and additional tasks. For basic cleaning you can expect to pay £17.99-£25 per hour or £17.99-£100 per visit for a flat or house. Prices are higher for one-off deep cleanings.",
    },
    {
      id: 3,
      question: "How much money does it cost to hire a house cleaner in England?",
      answer:
        "For a full house cleaning in England, a reasonable rate is £100-£200 for an average sized house requiring standard cleaning services. Larger homes, additional services such as laundry or windows, and poor condition requiring extensive cleaning can significantly increase the expected rate.",
    },
    {
      id: 4,
      question: "What’s included in standard cleaning at this price?",
      answer:
        "Standard cleaning services include vacuuming, mopping floors, cleaning bathrooms and kitchens, dusting surfaces and taking out the rubbish. For an average home, this would include a general cleaning of all rooms, plus basic tasks such as cleaning interior windows and loading/unloading dishwashers.",
    },
  ]
  }


  export const priceDeep: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How can I pay for cleaning?",
      answer: "Payment is made on our website via a secure 3rd-party provider. Funds will only be taken from your card once the job has been completed. However, please note that as soon as the booking is confirmed, the estimated amount of the job is pre-authorised on your card to be sure the payment will go through after the cleaning job is completed.",
    },
    {
      id: 2,
      question: "What is the difference between a regular clean and a deep clean?",
      answer:
        "A regular clean often refers to frequent cleaning procedures such as surface washing, vacuuming, and dusting. On the other hand, a deep clean focuses on cleaning that is more comprehensive and intensive, tackling tough-to-reach places, heavy dirt buildup, and disinfection. It frequently involves chores like cleaning appliances, washing walls, and scrubbing surfaces, which could all be part of an end of tenancy clean.",
    },
    {
      id: 3,
      question: "How often should a properly be deep cleaned?",
      answer:
        "The number of occupants, size, and desired level of cleanliness of a property are only a few of the factors that influence how frequently thorough cleanings should be carried out. Deep cleaning should typically be performed at least once or twice a year, though in some cases, especially in areas with high activity, it can be necessary to do so more frequently.",
    },
    {
      id: 4,
      question: "How long does a residential deep clean take?",
      answer:
        "Depending on the size of the property, the amount of trash and dirt, and how many cleaners are hired, a comprehensive cleaning of a domestic setting can take anywhere from one to several hours. A deep clean might take anywhere from a few hours to a whole day to complete.",
    },
    {
        id: 5,
        question: "How many cleaners will carry out a house deep clean?",
        answer:
          "Several variables, including the size of the property and the degree of cleaning necessary, affect the number of cleaners needed for a house cleaning. You can request the number of cleaners you need upon making your booking.",
      },
      {
        id: 6,
        question: "What are the benefits of deep cleaning?",
        answer:
          "A house deep cleaned improves cleanliness and air quality by successfully removing dirt, allergens, and pathogens. It restores surfaces, reduces smells, and prevents mold from proliferating. It enhances aesthetics, promotes a healthier environment, and ensures the welfare of the people who live there.",
      }
  ]
  }

  export const priceOffice: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How often does an office get cleaned?",
      answer: "To keep it clean and organised, a workplace usually gets cleaned daily or on a regular schedule. Depending on the needs and size of the office, the frequency may change.",
    },
    {
      id: 2,
      question: "How long should an office take to clean?",
      answer:
        "The size, amount of debris, and cleaning chores involved will all affect how long it takes to clean an office. Typically, it could take up to three hours or longer.",
    },
    {
      id: 3,
      question: "How often should a properly be deep cleaned?",
      answer:
        "The number of occupants, size, and desired level of cleanliness of a property are only a few of the factors that influence how frequently thorough cleanings should be carried out. Deep cleaning should typically be performed at least once or twice a year, though in some cases, especially in areas with high activity, it can be necessary to do so more frequently.",
    },
    {
      id: 4,
      question: "Do you do cleaning, before, during or after office hours?",
      answer:
        "In order to minimise disturbance to everyday office operations, cleaners typically work outside of regular business hours, such as early in the morning or late in the afternoon. However, you and the person or cleaning service should come to an agreement over the hours. You will be required to pay more if you need a cleaner during office hours.",
    },
    {
        id: 5,
        question: "Is it safe to give cleaners keys to our office?",
        answer:
          "Keys to the office should only be given to cleaners under strict supervision. Make sure the commercial cleaning service is reliable, performs background checks, and has the necessary security measures in place to protect your office building.",
      },
  ]
  }

  export const priceEnd: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "Do I need to pay a deposit?",
      answer: "Payment according to end of tenancy cleaning prices is made on our website via a secure 3rd-party provider. Funds will only be taken from your card once the job has been completed. However, please note that as soon as the booking is confirmed, the estimated amount of the job is pre-authorised on your card to be sure the payment will go through after the cleaning job is completed.",
    },
    {
      id: 2,
      question: "Can you provide an accurate estimate for my clean?",
      answer:
        "This is possible when you provide us with the necessary information about your property. Information like the size of your property, the general state of the apartment or property, additional services you require, and the number of cleaners you need, etc. will help us give you an accurate estimate for your cleaning need.",
    },
    {
      id: 3,
      question: "Are there any supplementary costs?",
      answer:
        "If you place an order that includes equipment, there will be an extra fee. When placing an order, please ask the cleaner to include all the cleaning materials if you don't have your own equipment. Extra costs may be added for additional services like window, oven, fridge, bookcase, carpet cleaning, etc.",
    },
    {
      id: 4,
      question: "Do you charge VAT?",
      answer:
        "Prices may include VAT unless it is clearly stated otherwise in the estimated cost.",
    },
  ]
  }

  export const priceCarpet: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "Does a room have to be empty to clean the carpet?",
      answer: "No, the carpet does not need to be cleaned in an empty room. Even with furniture or other objects present, it is still possible to clean the carpet. Before cleaning, however, moving any obstructions like furniture may be more practical in order to provide comprehensive cleaning.",
    },
    {
      id: 2,
      question: "Can heavily soiled carpet be cleaned?",
      answer:
        "Yes, it is possible to clean severely stained carpets. The beauty and cleanliness of the carpet can be restored by using professional carpet cleaning services and strong cleaning tools to remove stubborn stains and grime.",
    },
    {
      id: 3,
      question: "How often should I clean my carpets?",
      answer:
        "It definitely relies on a number of variables, including the age and condition of the carpet, as well as whether or not you have children or animals who like to make a mess. However, unless there are family members who have allergies, asthma, or other illnesses that affect their ability to breathe, once a year is usually sufficient.",
    },
    {
      id: 4,
      question: "Should I vacuum after carpet cleaning?",
      answer:
        "Vacuuming is advised following carpet cleaning, yes. In order to keep your carpet looking new and preserving its longevity, vacuuming helps to remove any leftover dirt, debris, or loose fibres that may have been loosened during the cleaning procedure.",
    },
  ]
  }

  export const priceUpholstery: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How Often Should You Hire Upholstery Cleaning Services?",
      answer: "Usage and household conditions determine how frequently you should use upholstery cleaning services. For routine maintenance, it is often advised every 12 to 24 months. Areas with high traffic may require more frequent cleaning, whereas those with little traffic can go longer. To avoid damage and maintain hygiene, stains and odours must receive rapid care.",
    },
    {
      id: 2,
      question: "Is it worth cleaning a sofa?",
      answer:
        "It is worthwhile to clean a sofa, yes. Its lifespan is increased by routine cleaning in addition to maintaining its attractiveness. It makes the living space healthier by removing dirt, allergies, and odours. Additionally, paying a professional cleaner can be less expensive than prematurely replacing a sofa due to negligence.",
    },
    {
      id: 3,
      question: "Can a fabric sofa be cleaned?",
      answer:
        "Fabric sofas can be cleaned, yes. Fabric couches can benefit from the efficient removal of grime, stains, and odours by professional upholstery cleaning services. Additionally, DIY techniques like vacuuming and spot cleaning can help keep them looking good. Your fabric sofa's lifespan can be increased and its appearance preserved with routine washing.",
    },
    {
      id: 4,
      question: "How long does it take to wash a sofa?",
      answer:
        "Size, fabric type, and cleaning technique all influence how long it takes to wash a sofa. Typically, professional upholstery cleaning requires 1-2 hours per sofa. DIY cleaning could take longer because drying time adds to the process. Multiple washing sessions and more time may be needed to remove difficult stains or really dirty sofas.",
    },
    {
        id: 5,
        question: "How do you clean an expensive sofa?",
        answer:
          "When washing an expensive fabric sofa, remove trash with a hoover, test a spot with a mild cleaning solution and then use delicate cleaning techniques. Blot spills instead of rubbing them, and let the area entirely air dry. Consider hiring a professional upholstery cleaner for fragile fabrics.",
      },
  ]
  }

  export const serviceRegular: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "Do cleaners provide equipment / products?",
      answer: "If you do not have your own equipment/ products, please request a cleaner to the equipmentor products. You will be charged additionally for an order with the equipment/products.",
    },
    {
      id: 2,
      question: "Why is the estimated price for the cleaning more than what I chose?",
      answer:
        "The minimum duration of the job is 3 hours. If the cleaner finishes early, please give them another task.",
    },
    {
      id: 3,
      question: "I need a quotation for end of tenancy / one off / carpet (combined) order",
      answer:
        "Please request a quote on our website simply entering your postcode. Please add all items you need to be cleaned and you will receive the quotation for the service.",
    },
    {
      id: 4,
      question: "Is there a guarantee of a refund if the job is not done up to standard?",
      answer:
        "According to our policy we do not provide any refunds. However, in case of any complaint, we will investigate the case, review the evidence and get back to you with a proposed solution in accordance with our policy. The full description of the complaint followed by picture evidence will be requested.",
    },
    {
        id: 5,
        question: "When will I get confirmation for my booking?",
        answer:
          "As soon as you make a booking it becomes available to all cleaners in the our platform. The time of the booking confirmation depends on the availability of the cleaners in the area and the type of the cleaning you request. our team will contact you if there is no availability for the chosen time and offer you the closest available time of the cleaning.",
      },
  ]
  }

  export const serviceOffice: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How much is a professional cleaner in England?",
      answer: "One-time deep cleaning services in England would cost between £19 per hour and £25 per hour, with the average hourly rate for house cleaning in England being between £19 and £22. Get the best office cleaning prices and excellent quality by requesting a quote from our service.",
    },
    {
      id: 2,
      question: "How much do office cleaners charge per hour in England?",
      answer:
        "A business office cleaning should cost, on average, between £19-£25 per hour depending on the cleaning company. Between £19 and £25 per hour is a conservative estimate for the cost of commercial cleaning services. This is a fairly typical charge for professional cleaners who have experience with routinely cleaning commercial premises.",
    },
    {
      id: 3,
      question: "What is included in a basic office cleaning?",
      answer:
        "Cleaning office windows and disinfecting surfaces that people touch, such as phones, lamps, keyboards, fax machines, copiers, staplers, and more. Recycling paper and emptying rubbish cans is also included",
    },
    {
      id: 4,
      question: "How do you calculate office cleaning cost?",
      answer:
        "We take into account the number of rooms and such parameters as the level of dirt, as well as additional services you may need to require. You see the final price immediately when you book your cleaning. All the hours are charged by the minute.",
    },
  ]
  }

  export const serviceEnd: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How long does the end of tenancy cleaning take in a one- or two-bedroom apartment?",
      answer: "Depending on its size and condition, a one-bedroom apartment's end of tenancy cleaning usually takes 2-4 hours. Due to the larger size and rooms in a two-bedroom flat, allow 3 to 6 hours.",
    },
    {
      id: 2,
      question: "Can a landlord charge for end of tenancy cleaning?",
      answer:
        "Normally, a landlord has the right to bill a renter for any cleaning required to restore the rented property to its original state before the tenant moves in. When you vacate the property, your landlord won't be able to force you to pay for a cleaning team, but they will still want you to leave it as clean as when you arrived.",
    },
    {
      id: 3,
      question: "Are tenants responsible for end of tenancy cleaning?",
      answer:
        "It depends on the particular circumstances and the terms of the lease agreement between the tenant and the landlord. For instance, in some situations, the renter may be responsible for the tenancy cleaning cost before moving out, whilst in others, the landlord may be responsible.",
    },
    {
      id: 4,
      question: "What should an end of tenancy clean include?",
      answer:
        "Cleaning the kitchen, including all appliances and cupboards, cleaning all bathrooms, including showers, baths, taps, and toilets, vacuuming and mopping all floors, exterior window cleaning, removing any cobwebs, cleaning all skirting boards, doors, and door frames, cleaning the inside and outside of the oven, cleaning the inside and outside of the fridge, removing any rubbish, etc.",
    },
    {
        id: 5,
        question: "Does end of tenancy cleaning include carpets?",
        answer:
          "Yes. To ensure that the property is returned to its previous condition, this calls for thoroughly cleaning all parts of it, including the floors, walls, furniture, and appliances, as well as ensuring clean carpets.",
      },
    {
        id: 6,
        question:  "How many cleaners will turn up on the day?",
        answer:
          "The number of cleaners that will come to your apartment is determined by the nature of the cleaning tasks, and also your requirements. When you are booking a service, you can indicate how many cleaners you want.",
      },
      {
        id: 7,
        question: "Can you carry out the service if I am not present?",
        answer:
          "Yes. Our local cleaners can carry out the cleaning service if you are not at home. However, they will need access to your property, and you have to make this happen. You can mention that you won't be present while you’re booking our services.",
      },
      {
        id: 8,
        question: "What equipment do cleaning teams bring?",
        answer:
         "For all types of surfaces, our move out cleaners have all the necessary cleaning supplies on hand. All common surface types respond favorably to these products. Specialized cleaning agents may be necessary for specific stains or surfaces. We cannot promise that our cleaning solutions will be appropriate in such circumstances.",
      },
      {
        id: 9,
        question: "Do you clean windows from the outside?",
        answer:
         "Yes. Our move out cleaning crew can provide external window cleaning to make them clear and shiny.",
      },
  ]
  }

  export const serviceCarpet: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question:  "Is it worth getting carpet cleaned professionally?",
      answer: "Getting your carpets professionally cleaned is worthwhile. It increases the beauty of carpets, extends the life of carpets, and improves indoor air quality and allergy removal especially in areas with high foot traffic, making it a smart maintenance and health investment.",
    },
    {
      id: 2,
      question: "How much does it cost to clean 2 rooms of carpet?",
      answer:
        "For this service, you might have to pay a carpet cleaner anywhere from £75 to £150 or more. Contact our carpet cleaning services in England and ask for a free quote based on your unique needs in order to receive an exact and current estimate.",
    },
    {
      id: 3,
      question: "Is it cheaper to clean a carpet or replace it?",
      answer:
        "It is typically less expensive to clean a carpet than to replace it. A carpet's lifespan can be extended with regular carpet cleaning and upkeep, but replacement requires the purchase and installation of new carpet.",
    },
    {
      id: 4,
      question: "What should an end of tenancy clean include?",
      answer:
        "Cleaning the kitchen, including all appliances and cupboards, cleaning all bathrooms, including showers, baths, taps, and toilets, vacuuming and mopping all floors, exterior window cleaning, removing any cobwebs, cleaning all skirting boards, doors, and door frames, cleaning the inside and outside of the oven, cleaning the inside and outside of the fridge, removing any rubbish, etc.",
    },
    {
        id: 5,
        question: "How much does it cost to wash a carpet?",
        answer:
          "Depending on the size, carpet cleaning procedure, and location, a carpet cleaning cost may vary. The typical cost of getting a carpet professionally cleaned in England is between £25 and £50.",
      },
  ]
  }

  export const serviceKitchenDeep: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question:  "What do professional kitchen cleaners use to clean?",
      answer: "Professional cleaners use a variety of specialised cleaning supplies, such as degreasers, powerful oven cleansers, disinfectants, and environmentally friendly cleaners to thoroughly clean and sanitise kitchen surfaces and appliances.",
    },
    {
      id: 2,
      question: "How often should you clean your kitchen?",
      answer:
        "Your kitchen needs to be cleaned frequently, ideally every day. Countertops, sinks, and other high-touch areas need to be cleaned on a regular basis. A thorough cleaning should be performed at least once every few months to maintain a clean and hygienic cooking environment.",
    },
    {
      id: 3,
      question: "How long does it take to deep clean a kitchen?",
      answer:
        "The size, degree of dirtiness, and quantity of gadgets in a kitchen can all affect how long it takes to thoroughly clean it. A comprehensive deep cleaning can often be finished in 2 to 5 hours."
    },
    {
      id: 4,
      question:  "Can you clean all types of domestic kitchen appliances?",
      answer:
        "We clean a wide range of kitchen appliances. Ovens, stovetops, microwaves, refrigerators, dishwashers, toasters, and more fall under this category, but are not the only ones. To efficiently clean and sanitise various types of kitchen appliances, our cleaners are provided with specialised cleaning supplies and methods.",
    },
  ]
  }

  export const serviceRug: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question:  "Is it worth it to clean a rug?",
      answer: "Yes, regular rug cleaning is necessary to preserve its look, hygienic standards, and durability. The quality of the rug is preserved and a healthy environment is ensured by routine cleaning, which also removes dirt, stains, and allergies.",
    },
    {
      id: 2,
      question: "How often should you clean your kitchen?",
      answer:
        "Your kitchen needs to be cleaned frequently, ideally every day. Countertops, sinks, and other high-touch areas need to be cleaned on a regular basis. A thorough cleaning should be performed at least once every few months to maintain a clean and hygienic cooking environment.",
    },
    {
      id: 3,
      question: "How do you clean an expensive rug?",
      answer:
        "A gentle method must be used while cleaning an expensive rug to prevent damage. To begin, hoover it lightly to get rid of any loose dirt and debris. Think about hiring specialised rug-handling professionals for deep steam cleaning. Try any cleaning product on a tiny, discreet area before applying it, and stay away from using harsh chemicals."
    },
    {
      id: 4,
      question: "How do I prepare my rug for professional cleaning?",
      answer:
        "Debris and tiny objects should be removed from the rug's surface. To get rid of any loose dust and grime, hoover thoroughly. Any stains should be noted and reported to the cleaners for the proper handling. Give explicit directions and inform about any worries you may have. These procedures will guarantee that your rug receives the best possible professional rug cleaning treatment.",
    },
    {
        id: 5,
        question: "How long will it take for an average rug to dry completely after a professional cleaning?",
        answer:
          "Following a professional rug cleaning, a typical rug may take longer or shorter to dry entirely depending on the rug's thickness, material, humidity, and ventilation. The average drying time for a rug ranges between a few hours and a day.",
      },
      {
        id: 6,
        question: "Do you remove stains from rugs?",
        answer:
          "We do, in fact, provide stain removal services as part of our cleaning process. Food stains, pet stains, wine stains, and all the dirt present can all be treated by us as we are skilled and have specialised equipment.",
      },
  ]
  }

  export const serviceMove: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How much does a move-in cleaning service cost?",
      answer: "Several factors, including the size of the property, the degree of cleaning needed, and the location, might affect the price of new house cleaning services. For detailed pricing information, it is better to obtain a free estimate from our website.",
    },
    {
      id: 2,
      question: "Do I need to hire professional move-in cleaners before moving in?",
      answer:
        "To ensure a tidy and hygienic living space, it is advised to bring in professional cleaners before moving in. They will assist you and give your new house a fresh start by removing dust, filth, and other possible allergens.",
    },
    {
      id: 3,
      question:  "I need my carpets cleaned with my move-in clean. Can you help?",
      answer:
        "Yes, there are two different carpet cleaning options that we offer: basic one & professional carpet cleaning. The distinction is that basic cleaning uses less expensive, rapid equipment to give the carpets a short once-over. Professional carpet cleaning is the best choice if you need comprehensive tenancy carpet cleaning, spot treatment, or more."
    },
    {
      id: 4,
      question:  "What are your move-in cleaning operating hours?",
      answer:
        "You can get in touch with us whenever you want. Our cleaning crews are on duty every day of the week. Our team is ready to step out early enough. The cleaning service begins at 8:00 AM and goes till as late as 8:00 PM.",
    },
    {
        id: 5,
        question: "Do you provide cleaning materials and equipment?",
        answer:
          "Our professional move-in cleaning teams do indeed arrive at the job site well-prepared. If you already have any cleaning supplies, please let us know when you book a service so that we can ensure our cleaners have the right tools and supplies on hand.",
      },
      {
        id: 6,
        question:"How long will the cleaning take?",
        answer:
          "The time needed for a move-in clean can vary depending on a number of variables, including the size of the property, its current state, the quality of cleanliness sought, and how many cleaners will be cleaning the property. However, an estimated time of 6 to 12 hours will be sufficient for the cleaning.",
      },
  ]
  }

  export const serviceBathroom: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "Which liquid is used for bathroom cleaning?",
      answer: "Liquids and other cleaning supplies are frequently used for cleaning bathrooms. Depending on the cleaning task and personal preference, a specific solvent may be utilised.",
    },
    {
      id: 2,
      question: "How do you deep clean a dirty bathroom?",
      answer:
        "Decluttering and eliminating objects is the first step in deep cleaning a soiled bathroom. Use the right cleaners and a brush to scrub all surfaces, including the shower, washbasin and toilet. Pay close care to the corners, faucets, and grout. After cleaning the fixtures and mirrors, mop the floor. Shower curtains and mats should be changed or washed.",
    },
    {
      id: 3,
      question: "What is the fastest way to clean a bathroom?",
      answer:
        "Concentrating on locations with a lot of traffic will help you clean a domestic bathroom more quickly. On surfaces like the countertops, sink, and toilet, spritz an all-purpose cleanser. Then, clean it with a microfiber cloth after letting it sit for a while. Immediately mop the floor to complete."
    },
    {
      id: 4,
      question:"How often should you clean your bathroom?",
      answer: "Cleaning your bathroom at least once a week is advised to preserve hygiene. High usage bathrooms, however, might need to be cleaned more frequently. Maintaining a clean and inviting environment can be achieved by preventing dirt buildup.",
    },
  ]
  }

  export const serviceMattress: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "How much does it cost to wash a mattress?",
      answer: "The price of cleaning a mattress might vary from £75 to £200, based on the circumstances. This pricing differential is contingent upon several factors, including the dimensions of the mattress, the intensity of the stains, and the particular cleaning techniques applied. The cost of cleaning a mattress could go up if you need extra service in England, such as stain or smell removal.",
    },
    {
      id: 2,
      question:  "Is professional mattress cleaning worth it?",
      answer:
        "It's worth it to have your mattress professionally cleaned. Professional mattress cleaners pay careful attention to client’s mattresses to ensure that all stains are eliminated, and they perform the job using tested and trusted cleaning methods. In addition, these cleaners have gone through a series of training and vetting procedures to give them the skills and experience to give mattresses a fresh and revived appearance.",
    },
    {
      id: 3,
      question: "Can you get a mattress deep cleaned?",
      answer:
      "Yes, our can help with thorough mattress cleaning. Using specialised tools and solutions, our expert cleaning services are made to attack and get rid of allergens, stains, and deep-seated grime. The method used by our guarantees a deep clean that can revitalise your mattress and improve its comfort and hygiene."
    },
    {
      id: 4,
      question:"How do you clean a heavily soiled mattress?",
      answer: "There are many ways to clean a heavily soiled mattress. However, It may be possible to eradicate more dust mites from the mattress's surface by steaming it. For confirmation that steam is okay for your mattress, though, visit the manufacturer's website or simply read the tag. If it can handle steam cleaning, try using a clothing steamer.",
    },
    {
        id: 5,
        question: "How long does a mattress take to dry after cleaning?",
        answer: "Following the cleaning procedure, your mattress may be somewhat damp. The amount of time it takes for it to dry naturally will vary depending on the type of mattress you have, but it should dry naturally in up to eight hours.",
      },
  ]
  }
  
  export const serviceSpring: FaqData = {
    title: "Frequently asked questions",
  items: [
    {
      id: 1,
      question: "What is included in a spring cleaning?",
      answer: "Deep cleaning the house is usually part of a spring clean, and includes dusting, vacuuming, washing windows, organising closets, removing dirt, scouring bathrooms and kitchens, and cleaning underneath furniture and appliances.",
    },
    {
      id: 2,
      question: "What month do you do spring cleaning?",
      answer:
        "The best time to air out and re-energize homes after the winter is over is in March or April, when spring cleaning typically takes place. These months also coincide with the coming of better weather and longer days.",
    },
    {
      id: 3,
      question:  "What is the spring cleaning procedure?",
      answer:
     "A cleaning agency's spring cleaning routine usually entails dusting all surfaces and fixtures, decluttering areas, sanitising bathrooms, and performing a thorough cleaning of the floors, windows, and appliances.",
    },
    {
      id: 4,
      question:"What is the difference between spring cleaning and general cleaning?",
      answer: "Spring cleaning service is more extensive and targets places, like inside cabinets and behind appliances, that are frequently missed during routine cleanings.",
    },
  ]
  }



 