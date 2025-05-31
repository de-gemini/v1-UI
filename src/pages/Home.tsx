import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Cleaning Service"
          />
          <div className="absolute inset-0 bg-accent-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Professional Cleaning Services
          </h1>
          <p className="mt-6 text-xl text-primary-100 max-w-3xl">
            We provide top-quality cleaning services for homes and offices. Our experienced team ensures your space is spotless and healthy.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-block bg-white py-3 px-8 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-secondary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-secondary-500">
              Experience the difference with our professional cleaning services
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-secondary-900">Professional Staff</h3>
                <p className="mt-2 text-base text-secondary-500">
                  Our team consists of trained and experienced cleaning professionals.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-secondary-900">Eco-Friendly Products</h3>
                <p className="mt-2 text-base text-secondary-500">
                  We use environmentally friendly cleaning products that are safe for your family.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-secondary-900">Satisfaction Guaranteed</h3>
                <p className="mt-2 text-base text-secondary-500">
                  We're not happy until you're completely satisfied with our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 