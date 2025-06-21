

import React, { useState, type ReactNode } from 'react';
import { CheckCircle, MapPin, Phone, User, Upload, Flag } from 'lucide-react';

// Define types for form data and step configuration
interface FormData {
  postcode: string;
  phone: string;
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  documentsUploaded: boolean;
}

interface Step {
  id: number;
  name: string;
  icon: React.ElementType; // For LucideIcon components
}

interface MultiStepFormProps {
  steps: Step[];
  initialFormData?: FormData; // Optional initial data
  onSubmit: (data: FormData) => void;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, initialFormData, onSubmit, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData || {
    postcode: '',
    phone: '',
    personalData: {
      firstName: '',
      lastName: '',
      email: '',
    },
    documentsUploaded: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName' || name === 'email') {
      setFormData(prev => ({
        ...prev,
        personalData: {
          ...prev.personalData,
          [name]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = () => {
    // Basic validation before moving to the next step
    let isValid = true;
    let errorMessage = '';

    if (currentStep === 1 && !formData.postcode) {
      isValid = false;
      errorMessage = 'Please enter your postcode.';
    } else if (currentStep === 2 && !formData.phone) {
      isValid = false;
      errorMessage = 'Please enter your phone number.';
    } else if (currentStep === 3 && (!formData.personalData.firstName || !formData.personalData.lastName || !formData.personalData.email)) {
      isValid = false;
      errorMessage = 'Please fill in all personal data fields.';
    } else if (currentStep === 4 && !formData.documentsUploaded) {
      isValid = false;
      errorMessage = 'Please upload your documents.';
    }

    if (!isValid) {
      // In a real application, replace this with a custom modal/notification system
      alert(errorMessage);
      console.error(errorMessage);
      return;
    }

    const nextStep = Math.min(currentStep + 1, steps.length);
    setCurrentStep(nextStep);
    onStepChange?.(nextStep, steps.length); // Notify parent of step change

    // In a real app, you might submit data for the current step here
    console.log(`Step ${currentStep} completed. Data:`, formData);
  };

  const handleSubmitFinal = () => {
    // Final submission logic
    onSubmit(formData); // Call the onSubmit prop
    // In a real application, you might reset the form or redirect here
  };

  const renderStepContent = (): ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <MapPin className="w-24 h-24 text-gray-500 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">YOUR LOCATION</h2>
            <div className="w-full max-w-md">
              <input
                type="text"
                name="postcode"
                placeholder="Enter your Post Code"
                value={formData.postcode}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Enter your Post Code"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="mt-10 w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              SUBMIT
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <Phone className="w-24 h-24 text-gray-500 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">YOUR PHONE NUMBER</h2>
            <div className="w-full max-w-md">
              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Enter your Phone Number"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="mt-10 w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              NEXT
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <User className="w-24 h-24 text-gray-500 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">PERSONAL DATA</h2>
            <div className="w-full max-w-md space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.personalData.firstName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="First Name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.personalData.lastName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Last Name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.personalData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Email Address"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="mt-10 w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              NEXT
            </button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center">
            <Upload className="w-24 h-24 text-gray-500 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">UPLOAD YOUR DOCUMENTS</h2>
            <div className="w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-yellow-500 transition duration-300">
              <input
                type="file"
                multiple
                className="hidden"
                id="document-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFormData(prev => ({ ...prev, documentsUploaded: true }));
                    // In a real app, you would handle the actual file upload here
                    console.log('Documents selected:', e.target.files);
                    // For demo purposes, we'll just show an alert
                    alert('Documents selected! (In a real app, files would be uploaded and processed.)');
                  }
                }}
              />
              <label htmlFor="document-upload" className="text-gray-600">
                Click here to upload files or drag and drop.
                {formData.documentsUploaded && <p className="text-green-600 mt-2">Files ready for upload!</p>}
              </label>
            </div>
            <button
              onClick={handleNextStep}
              className="mt-10 w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              NEXT
            </button>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center">
            <Flag className="w-24 h-24 text-green-500 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">APPLICATION COMPLETE!</h2>
            <p className="text-lg text-gray-700 text-center mb-10">
              Thank you for completing your application. We will review your details and contact you shortly.
            </p>
            <button
              onClick={handleSubmitFinal}
              className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              FINISH
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 sm:p-10 lg:p-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 text-center">JOIN NOW</h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-12 text-center">Sign up right now and fill in the form below</p>

      {/* Progress Indicator */}
      <div className="flex justify-between border border-red-700 items-center mb-12 relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10  rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ease-in-out
                            ${currentStep > step.id
                                ? 'bg-green-500' // Completed
                                : currentStep === step.id
                                  ? 'bg-yellow-400' // Current
                                  : 'bg-gray-300' // Upcoming
                            }`}
              >
                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
              </div>
              <p className={`text-sm mt-2 whitespace-nowrap ${currentStep >= step.id ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-grow h-1 mx-2 transition-colors duration-300
                            ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Dynamic Content based on Step */}
      <div className="mt-10">
        {renderStepContent()}
      </div>
    </div>
  );
};
