import React, {useState, useEffect, useRef} from 'react';

const Contact = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Triggers the hidden file input
  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={path} />
    </svg>
  );
  
  // Icon paths
 const ICONS = {
    clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
    location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    business: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V18h6v-1.5c0-2.33-4.67-3.5-7-3.5z",
    info: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    chevronDown: "M7 10l5 5 5-5H7z"
  };

  interface Option {
    value: string;
    label: string;
  }
  
  const options: Option[] = [
    { value: 'general_enquiry', label: 'General Enquiry' },
    { value: 'time_dispute', label: 'Time Dispute' },
    { value: 'reschedule', label: 'Rescheduled Appointment' },
    { value: 'damaged_caused', label: 'Damaged Caused' },
    { value: 'payments', label: 'Payments' },

  ];
  
  const CustomSelect = ({ selected, setSelected }: { selected: Option; setSelected: (option: Option) => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div className="relative w-full" ref={selectRef}>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-11 flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected.label}</span>
          <Icon path={ICONS.chevronDown} className="w-5 h-5 text-gray-400" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                >
                  <span className="font-normal block truncate">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-12">
        
        {/* Top Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1 lg:col-span-2">
              <p className="text-gray-600 leading-relaxed">
                Write us in the Live Chat or send an email by filling the form below if you have any issues, questions or feedback.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Icon path={ICONS.clock} className="w-6 h-6 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Work hours</h3>
                <p className="text-gray-600 text-sm">Support team is available from 7am to 9pm</p>
              </div>
            </div>
            {/* <div className="flex items-start space-x-3">
              <Icon path={ICONS.location} className="w-6 h-6 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Registered office address</h3>
                <p className="text-gray-600 text-sm">Suite 5 3rd Floor, Sovereign House, 1 Albert Place, London, England, N31QB</p>
              </div>
            </div> */}
             <div className="flex items-start space-x-3 md:col-start-2 lg:col-start-auto">
              <Icon path={ICONS.email} className="w-6 h-6 text-gray-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">E-mail</h3>
                <a href="mailto:Kellynwaodo@gmail.com" className="text-blue-600 hover:underline text-sm">Kellynwaodo@gmail.com</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomSelect selected={selectedOption} setSelected={setSelectedOption} />
                <input type="text" placeholder="Booking ID (Optional)" className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-11" />
                <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
                   <textarea
                    placeholder="Your Message"
                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-full min-h-[100px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                  />
                  <p className="text-right text-xs text-gray-500 mt-1">{message.length}/500</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Name, Surname" 
                  className="w-full bg-white border-2 border-red-500 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm h-11" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="w-full bg-white border-2 border-red-500 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
      {/* Hidden file input that we control with our button */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden' 
        accept='image/*' 
      />

      {/* Conditional Rendering: Show file info or the 'Add file' button */}
      {selectedFile ? (
        // -- This block shows when a file IS selected --
        <div className="flex items-center justify-between bg-blue-100 text-brand-primary px-4 py-2 rounded-md">
          <span className="font-medium truncate">{selectedFile.name}</span>
          <button 
            type="button" 
            onClick={handleRemoveFile}
            className="ml-4 text-red-500 hover:text-red-700 font-bold"
            aria-label="Remove file"
          >
            &times;
          </button>
        </div>
      ) : (
        <button 
          type="button" 
          onClick={handleAddFileClick}
          className="bg-blue-100 text-brand-primary font-semibold px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
        >
          Add file
        </button>
      )}
    </div>
                <button onClick={handleSubmit} type="submit" className="w-full md:w-auto bg-brand-primary text-white font-bold px-12 py-3 rounded-md hover:bg-blue-600 transition-colors shadow-lg">
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Let's get in touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex items-start space-x-4">
              <Icon path={ICONS.user} className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">FOR CUSTOMERS</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To find the answers to the most popular questions go to our <a href="/help/Clients " className="text-blue-600 hover:underline">FAQ</a>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">
                  To BOOK NOW or make a booking, follow the <a href="/" className="text-blue-600 hover:underline">booking process</a> on the main page of the website.
                </p>
                 <p className="text-gray-600 text-sm leading-relaxed mt-2">
                  To manage your bookings, visit <a href="/register" className="text-blue-600 hover:underline">My Account</a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Icon path={ICONS.business} className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Business queries</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                For press, partnership, marketing enquiries, please contact us at <a href="mailto:Kellynwaodo@gmail.com" className="text-blue-600 hover:underline">De-gemini@De-gemini.world</a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Icon path={ICONS.info} className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">GENERAL QUERIES</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Didn't find any relevant subject? Write us to <a href="mailto:Kellynwaodo@gmail.com" className="text-blue-600 hover:underline">De-gemini@De-gemini.world</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 