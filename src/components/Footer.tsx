const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Gemini Cleaning</h3>
            <p className="text-secondary-300">
              Professional cleaning services for your home and office.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-secondary-300">Email: info@geminicleaning.com</p>
            <p className="text-secondary-300">Phone: (555) 123-4567</p>
            <p className="text-secondary-300">Address: 123 Clean Street, City, State 12345</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-secondary-300 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="/services" className="text-secondary-300 hover:text-white">Services</a>
              </li>
              <li>
                <a href="/contact" className="text-secondary-300 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <p className="text-center text-secondary-300">
            © {new Date().getFullYear()} Gemini Cleaning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 