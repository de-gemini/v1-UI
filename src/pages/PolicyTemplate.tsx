import React from "react";

interface PolicySection {
  heading: string;
  content: React.ReactNode;
}

interface PolicyTemplateProps {
  title: string;
  sections: PolicySection[];
}

const PolicyTemplate: React.FC<PolicyTemplateProps> = ({ title, sections }) => {
  return (
    <main className="w-full min-h-screen font-sans antialiased bg-gray-50 py-10 px-2 sm:px-0">
      <div className="max-w-3xl mx-auto bg-white py-10 px-6 sm:px-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-primary my-24 text-left">
          {title}
        </h1>
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-3 mt-8">
                {section.heading}
              </h2>
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {section.content}
              </div>
              {idx < sections.length - 1 && (
                <hr className="my-8 border-gray-200" />
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PolicyTemplate; 