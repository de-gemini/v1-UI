



import React, { useEffect, useState } from 'react';
import { Gift, ArrowRight } from 'lucide-react';


export default function GiftVouch() {
  const voucherAmounts = [50, 100, 150];
  const [selectedAmount, setSelectedAmount] = useState<number>(voucherAmounts[1]); // Default to £100

  const [senderDetails, setSenderDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [recipientDetails, setRecipientDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // Optional
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiration: '',
    cvc: '',
    cardHolder: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  useEffect(() => {
    console.log('Initial selected amount:', selectedAmount);
  }, []);

  // Handlers for form inputs
  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSenderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      // Format card number: add space every 4 digits
      const formattedValue = value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '';
      setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'expiration') {
      // Format expiry date: MM/YY
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setPaymentDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!agreedToTerms) {
      alert('You must agree to the Terms & Conditions to proceed.'); // Use custom modal in real app
      return;
    }

    // Basic validation (add more robust validation for production)
    if (!selectedAmount || !senderDetails.firstName || !recipientDetails.email || !paymentDetails.cardNumber || !paymentDetails.expiration || !paymentDetails.cvc || !paymentDetails.cardHolder) {
      alert('Please fill in all required fields and select an amount.');
      return;
    }

    const orderDetails = {
      voucherAmount: selectedAmount,
      sender: senderDetails,
      recipient: recipientDetails,
      payment: {
        cardNumber: paymentDetails.cardNumber,
        expiration: paymentDetails.expiration,
        cvc: paymentDetails.cvc,
        cardHolder: paymentDetails.cardHolder,
      },
    };

    console.log('Gift voucher purchase initiated:', orderDetails);
    alert('Gift voucher purchase successful! (Check console for data)'); // Use custom modal in real app
    // In a real app, you would send this data to your backend for processing (e.g., Stripe API)
  };

  const renderSectionHeader = (title: string, icon?: React.ElementType) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center">
      {icon && React.createElement(icon, { className: "w-7 h-7 text-brand-secondary mr-3" })}
      {title}
    </h2>
  );

    return(
        <main
  className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#a2e8c3] via-[#bbc7b1] to-[#c9b2a5]"
  style={{
    color: 'rgb(66, 51, 126)',
    background: `
      linear-gradient(360deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(107.45deg, rgb(150, 237, 195) 0%, rgb(223, 140, 140) 100.61%),
      `,
  }}
>
  <section className="presents"></section>

<div className="w-full flex flex-col gap-[10px] items-start justify-start px-4">
  <div className="">
    <h1 className="text-brand-primary nunito-sans-heading text-[48px] font-[800]">Gift Vouchers</h1>
    <p className="text-[rgb(80,96,107)] text-[20px] font-[400]">Bespoke cleaning services for your home</p>
  </div>

  <h1 className='text-brand-primary text-[42px] nunito-sans-title md:text-[60px] lg:text-[72px] font-[800]'>Make someone smile today</h1>

</div>
  <div className="font-sans antialiased py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto p-8 sm:p-10 lg:p-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary mb-10 text-center">
          Choose your voucher amount:
        </h1>

        {/* Voucher Amount Selection */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          {voucherAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                console.log('Voucher amount selected:', amount); // Log when a button is clicked
              }}
              className={`p-4 sm:p-5 rounded-lg border-2 font-bold text-xl sm:text-2xl transition-all duration-300 ease-in-out
                          ${selectedAmount === amount
                            ? 'bg-yellow-400 border-yellow-500 text-gray-800 shadow-lg scale-105'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-yellow-300 hover:shadow-md'
                          }`}
            >
              £{amount}
            </button>
          ))}
        </div>

        <form onSubmit={handlePurchase}>
          {/* Sender Details */}
          <div className="mb-12">
            {renderSectionHeader('Sender details', Gift)}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={senderDetails.firstName}
                onChange={handleSenderChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Sender First Name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={senderDetails.lastName}
                onChange={handleSenderChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Sender Last Name"
              />
              <input
                type="email"
                name="email"
                placeholder="Sender Email"
                value={senderDetails.email}
                onChange={handleSenderChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 sm:col-span-2"
                aria-label="Sender Email"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Sender Phone Number"
                value={senderDetails.phone}
                onChange={handleSenderChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 sm:col-span-2"
                aria-label="Sender Phone Number"
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div className="mb-12">
            {renderSectionHeader('Recipient details', ArrowRight)}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={recipientDetails.firstName}
                onChange={handleRecipientChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Recipient First Name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={recipientDetails.lastName}
                onChange={handleRecipientChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Recipient Last Name"
              />
              <input
                type="email"
                name="email"
                placeholder="Recipient Email"
                value={recipientDetails.email}
                onChange={handleRecipientChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 sm:col-span-2"
                aria-label="Recipient Email"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Recipient Phone Number (Optional)"
                value={recipientDetails.phone}
                onChange={handleRecipientChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 sm:col-span-2"
                aria-label="Recipient Phone Number"
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-8 border-t border-gray-200 pt-8 flex flex-col lg:flex-row lg:space-x-12">
            {/* Left Column: Payment Inputs */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              {renderSectionHeader('Payment details')}
              <div className="text-right text-xs text-gray-500 mb-2">Powered by <span className="font-semibold text-gray-700">stripe</span></div> {/* Placeholder for Stripe */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  maxLength={19} // 16 digits + 3 spaces
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 w-full font-mono text-lg"
                  aria-label="Card Number"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiration"
                    placeholder="MM/YY"
                    value={paymentDetails.expiration}
                    onChange={handlePaymentChange}
                    maxLength={5} // MM/YY
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Expiration Date (MM/YY)"
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={paymentDetails.cvc}
                    onChange={handlePaymentChange}
                    maxLength={4} // Max 4 digits for CVC/CVV
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="CVV Code"
                  />
                </div>
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Card Holder"
                  value={paymentDetails.cardHolder}
                  onChange={handlePaymentChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                  aria-label="Card Holder Name"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                {/* Placeholder for card logos (VISA, Mastercard etc.) */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-auto" />
                {/* Add other card logos if needed */}
              </div>
            </div>

            {/* Right Column: Total Amount & Purchase Button */}
            <div className="lg:w-1/2 flex flex-col justify-between items-center lg:items-end">
              <div className="text-right mb-8 lg:mb-0">
                <p className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Total amount: <span className="text-brand-primary">£{selectedAmount}.00</span>
                </p>
              </div>

              <div className="w-full max-w-sm flex flex-col items-center">
                <label className="flex items-center text-gray-700 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-purple-600 rounded-md focus:ring-purple-500 transition duration-150 ease-in-out"
                    aria-label="Agree to Terms and Conditions"
                  />
                  <span className="ml-2 text-sm sm:text-base">
                    I agree with the{' '}
                    <a href="#" className="text-brand-primary font-semibold hover:underline">
                      Terms & Conditions
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!agreedToTerms || !selectedAmount}
                >
                  PURCHASE GIFT VOUCHER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Optional: More content to show page structure */}

    </div>

</main>
    )
};
