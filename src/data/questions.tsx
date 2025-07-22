import React from 'react';
import { FAQItem } from '../components/Questions'; // Assuming this path is correct for your FAQItem component

interface FAQData {
  question: string;
  answer: string | JSX.Element;
}
export const FAQSection: React.FC = () => {

  const faqContent: FAQData[] = [
    {
      question: "What is included in cleaning service?",
      answer: (
        <>
          Our standards include everything to make a house clean.{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Here
          </a>{" "}
          you can find details of what is exactly included in the service room by
          room.
        </>
      ),
    },
    {
      question: "What is Cancellation Policy?",
      answer: (
        <>
          Time is valuable for both clients and cleaners. If a customer cancels a
          job 12 hours before the start time or at the last minute, cleaners
          lose their income and it messes with their schedule. Clients
          cancellation fees cover cleaners time and the De-gemini platform costs.
          Please see our{" "}
          <a href="/cancellation-policy" className="text-blue-600 hover:underline">
            Cancellation Policy
          </a>
          .
        </>
      ),
    },
    {
      question: "How can I skip or reschedule a booking within subscription?",
      answer: (
        <>
        If you need to reschedule your booking for whatever reason, you can do it in My Account on our website or via the App. Please see our{" "}
          <a href="/reschedule-policy" className="text-blue-600 hover:underline">
            Cancellation Policy
          </a>{" "}.
        </>
      ),
    },
    {
      question: "When will my booking be confirmed?",
      answer: "It can take a few minutes or up to a few days depending on the type of booking. As soon as a cleaner accepts your job, you will get a notification about that.",
    },
    {
      question: "Can I make a last-minute booking, and how soon can the cleaner arrive?",
      answer: "You can make a last-minute booking, which is 4 hours before the cleaning starts. If you make your booking at 12:00, expect the cleaner to arrive at 16:00.",
    },
    {
      question: "Who will come to clean my property?",
      answer: "After you place a booking, your job becomes available to all the cleaners on our platform. As soon as someone accepts your job, you will get information about your cleaner: name and rating.",
    },
    {
      question: "Can I book a male or a female cleaner?",
      answer: "Our platform doesn’t allow you to choose the gender of the cleaner in order to avoid any discrimination. However, if there is any reason you prefer a female or a male cleaner to work in your home, please make a comment about your requirements in the booking. Cleaners can see your comments and pick up your job according to your preferences.",
    },
    {
      question: "What is duration of subscription?",
      answer: "The subscription period is either 3 or 6 months. All subscriptions are automatically renewed upon completion unless cancelled prior.",
    },
    {
      question: "I booked a studio to clean but I'm told it's not",
      answer: "A studio flat is self-contained flat in which the normal functions of a number of rooms like the living room, bedroom, and kitchen are combined into a single room with a separate bathroom. If your flat is not described as above you will be charged additionally.",
    },
  ];

  return(
    <div className="max-w-3xl overflow-y-scroll mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">Questions?</h2>
      <div>
        {/* Correctly map over faqContent, not a component */}
        {faqContent.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  )
}


export const FAQSection2: React.FC = () => {

  const faqContent: FAQData[] = [
    {
      question: "What is the minimal cleaning duration?",
      answer: "The minimum duration for any cleaning is 3 hours. All of the hours are charged by the minute. If your cleaning job is estimated to be less than 3 hours and you want to use all the hours, just leave comments in your booking with the extra tasks you want to be completed.",
    },
    {
      question: "What is an estimated price and an estimated duration?",
      answer: (
        <>
          In our system we estimate how much time we need to clean every room you choose. We guarantee to complete your cleaning job within the estimated time + 1 hr. All properties are different. That is why we give this extra hour to a cleaner in case he/she needs some more time to complete your job.{" "}

          As we charge customers by Pay as You Go approach, you will pay only for the real time a cleaner worked at your property. If the cleaning job is completed faster than it was estimated, you will pay less. In case your cleaning job took longer time, you will pay a little bit more, but never more than 1 hour extra.
          .
        </>
      ),
    },
    {
      question: "What if I want to limit my booking by fixed hours?",
      answer: "We don’t have a choice of fixed hours, because we estimate the cleaning time based on the clients’ booking requirement. However, if you wish to limit the cleaning to a specific hour, you can leave comments in your order. In this case we cannot guarantee to complete the cleaning within this time, but the cleaner will do their best.",
    },
    {
      question: "Why is the price so different when I choose the level of dirt?",
      answer: "We charge clients by Pay as you Go approach based on the real time a cleaner works. When you choose a higher level of dirt it means a cleaner needs more time to complete your job. The final price is determined once the job is completed. Dirt level Medium is default level for End of tenancy cleaning.",
    },
    {
      question: "What if I don’t like the cleaning quality?",
      answer: (
        <>
        To be sure a cleaning service is provided according to a high standard, we ask our customers to check the job at the end, if you are at home. The cleaner will re-clean missed areas.

        In case you are not able to check the job immediately, we request that you report the problem within next 24 hours. In this case we will send you a supervisor if needed to re-clean.
        </>
)
    },
    {
      question: "What is included in our Disinfection Service?",
      answer: "Disinfection includes the cleaning of all areas (with disinfectant) that are routinely touched such as light switches, desks, toilets, chairs, sinks, doorframes, doorknobs, handles, remotes, keypads, buttons, and counters.",
    },
    {
      question: "How many items(shirts, skirts, trousers) can be ironed per hour?",
      answer: "There are many factors that determine the amount of ironing that can be completed in an hour. Typically, our staff can complete around 5/6 Shirts and 2 Trousers/Skirts during this time. If more time is required, please discuss with your De-gemini.",
    },
  ];

  return(
    <div className="max-w-2xl overflow-y-scroll mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">Questions?</h2>
      <div>
        {/* Correctly map over faqContent, not a component */}
        {faqContent.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  )
}



export const FAQSection3: React.FC = () => {

  const faqContent: FAQData[] = [
    {
      question: "When will I be charged?",
      answer: (
      <>
      When you place a booking and enter your bank details, we are verifying your card and make pre-authorisation of the estimated amount on you card.

      Then we charge you after the cleaning is completed according to the real time a cleaner worked.
      </>
      )
    },
    {
      question: "Are my payment details stored securely?",
      answer: "Your bank details are stored securely by 3rd party provider,Stripe, who deals with all payments.",
    },
    {
      question: "How can I track the status of my booking?",
      answer: "You can use the App to manage your bookings.",
    },
    {
      question: "Where can I find my receipt?",
      answer: "Your receipt will be sent to you automatically by email when your cleaning job is completed.",
    },
  ];

  return(
    <div className="max-w-2xl overflow-y-scroll mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">Questions?</h2>
      <div>
        {/* Correctly map over faqContent, not a component */}
        {faqContent.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  )
}


export default FAQSection;