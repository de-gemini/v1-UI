import React from "react";
import ContentRenderer from "../components/ContentRender";
import termsData from "../data/terms";



const termsAndConditions:React.FC = () => {

    return(
        <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm">
          
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Terms and Conditions of Use
            </h1>
          </header>

          <main className="mt-8 text-gray-700 leading-relaxed">
            {termsData.map((section) => (
              <section key={section.sectionNumber} className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {section.sectionNumber}. {section.title}
                </h2>
                <div className="space-y-4">
                  {section.subsections.map((subsection, index) => (
                    <div key={index}>
                      {subsection.subTitle && (
                        <h3 className="text-md font-semibold italic text-gray-700 mb-2">
                          {subsection.subTitle}
                        </h3>
                      )}
                      <div className="flex flex-row">
                        {subsection.point && (
                          <span className="w-12 flex-shrink-0 text-gray-600">{subsection.point}</span>
                        )}
                        <p className="flex-grow">
                          <ContentRenderer content={subsection.content} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
    )
}

export default termsAndConditions;