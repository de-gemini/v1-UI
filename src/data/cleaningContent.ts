
import card1 from '../assets/images/card-1.jpg'
import card2 from '../assets/images/card-2.jpg'
import card3 from '../assets/images/card-3.jpg'
import card4 from '../assets/images/card-4.jpg'

export const regularCleaningBlocks = [
    {
      imageUrl: card1,
      imageAlt: "Cleaning services in living room",
      imagePosition: 'right' as 'right',
      paragraph:
        "De gemini is a professional cleaning company that operates in London and other UK cities. We offer a wide range of cleaning services England, including regular, one-off deep clean, and end-of-tenancy solutions. De-gemini is convenient because it provides a flexible house cleaning service tailored to each customer’s needs. Our professional cleaners are hand-picked and tested, then thoroughly trained to offer the best possible service. Our domestic cleaners are familiar with treating all types of surfaces, including delicate fabrics. Our professionals will meticulously remove any rubbish, dust, grime, or stains that may be present."
      ,
      initialItemsToShow: 1,
    },
    {
      imageUrl: card2,
      imageAlt: "Reliable Experts in London",
      imagePosition: 'left' as 'left', // Image on the left, text on the right
      title: "Reliable Experts in London",
      paragraph: 'If you’re looking for reliable house cleaning services in London, De-gemini is an excellent option. We offer our customers a wide range of house cleaning solutions, and we’re always looking for new ways to improve them. That is why De-gemini is a reliable platform for hiring expert cleaners.',
      content: [
        "If you require, you can get our team to change your bed linen and perform additional tasks to ensure a clean home.",
        "In the kitchen, the professionals will wipe and polish all surfaces and worktops. They’ll mop and vacuum the floors and clean equipment, appliances, doors, and handles. They’ll also wash the dishes. You can request that they take care of the fridge, the oven, and the microwave and arrange things inside kitchen cabinets.",
        "In the bathroom, they’ll sanitise the sink, the tiles, the toilet, the toilet seat, the bathtubs and/or the shower cubicle. Also, our professionals will hoover/sweep and mop the floors, polish the accessible surfaces, and wipe mirrors and glass.",
        "In the hallway and stairs, the team will clean and polish the furniture, hoover carpets and rugs, and mop the floors. They’ll remove fingerprints and marks from surfaces and wipe the skirting boards and the inside of the front door.",
      ],
      initialItemsToShow: 1, // Show initial items, then "See more"
    },
    {
      imageUrl: "https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg",
      imageAlt: "Customized commercial cleaning",
      imagePosition: 'right' as 'right',
      title: "A Cleaning Service that Cares for Your Home",
      paragraph: 'Every house service is unique, which is why our employees are encouraged to take a personalised approach. Besides, different clients require different service packages, and fully satisfying your needs is our top priority. The ability to modify the standard set of tasks is a major benefit of using De-gemini’s professional cleaning services in London. When the plan is tailored to your needs, you are paying precisely for the package you need. However, there are certain things our professionals can’t do. For example, we don’t lift or move heavy objects, do ironing, or clean the back garden. If you want to discuss add-ons in detail, we are always happy to answer your questions about one off deep cleaning.',
      initialItemsToShow: 1,
    },
    {
      imageUrl: "https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg",
      imageAlt: "Additional cleaning services",
      imagePosition: 'left' as 'left',
      title: "Appreciate the Benefits of Domestic Cleaners",
      content: [
        "We are fully insured. We guarantee that your property and possessions will stay safe.",
        "You can book us any time or day of the week - regardless of weekends or bank holidays.",
        "We cover a full range of tasks, which you can also customise according to your needs.",
        "All our pricing plans are transparent, and there are no hidden charges.",
        "We have a qualified and trustworthy team.",
        "Our customer service is always ready to help you and resolve any issues.",
      ],
      initialItemsToShow: 2,
    },
    {
      imageUrl: "https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg",
      imageAlt: "Office kitchen cleaning",
      imagePosition: 'right' as 'right',
      title: "Cleaning service for office kitchen includes",
      paragraph: 'Working people need to take care of multiple tasks every single day. As a result, cleaning becomes a lower priority, and this can lead to a dirty and/or disorganised home. To avoid that, hire someone to do the hard work. This will have a positive effect on your mental and physical well-being. De-gemini provides excellent cleaning services, which will make you wonder why you didn’t do it sooner. It is quick, convenient, and affordable. You will be surprised by how much a spotless living space can improve the quality of your life.',
      initialItemsToShow: 1,
    },
  ];
  
  // Data for the "Reliable Experts in London" section (from your screenshot)
  export const reliableExpertsContent = {
    imageUrl: "http://googleusercontent.com/file_content/0", // From your screenshot
    imageAlt: "Reliable Experts in London - bedroom cleaned", // More descriptive alt text
    imagePosition: 'right' as 'right', // Image on the right of text on desktop
    title: "Reliable Experts in London", // Explicitly added based on screenshot
    content: [
      "If you're looking for reliable house cleaning services in London, De-Gemini is an excellent option. We offer our customers a wide range of house cleaning solutions, and we're always looking for new ways to improve them. That is why De-Gemini is a reliable platform for hiring expert cleaners.",
      "If you require, you can get our team to change your bed linen and perform additional tasks to ensure a clean home.",
      // Assuming there are more hidden items for "3 more"
      "Our cleaners are fully vetted and insured for your peace of mind.",
      "We use eco-friendly cleaning products where possible.",
      "Customer satisfaction is our top priority.",
    ],
    initialItemsToShow: 2, // Show the initial paragraph and first bullet point
  };
  
  
  export const caringServiceContent = {
    imageUrl: "http://googleusercontent.com/file_content/1", // From your screenshot
    imageAlt: "A Cleaning Service that Cares for Your Home - clean kitchen", // More descriptive alt text
    imagePosition: 'left' as 'left', // Image on the left of text on desktop
    title: "A Cleaning Service that Cares for Your Home", // Explicitly added based on screenshot
    content: "Every house service is unique, which is why our employees are encouraged to take a personalised approach. Besides, different clients require different service packages, and fully satisfying your needs is our top priority. The ability to modify the standard set of tasks is a major benefit of using De-Gemini’s professional cleaning services in London. When the plan is tailored to your needs, you are paying precisely for the package you need. However, there are certain things our professionals can’t do. For example, we don’t lift or move heavy objects, do ironing, or clean the back garden. If you want to discuss add-ons in detail, we are always happy to answer your questions about one off deep cleaning.",
    initialItemsToShow: 0, // It's a single paragraph, no 'see more' needed unless it's extremely long.
  };