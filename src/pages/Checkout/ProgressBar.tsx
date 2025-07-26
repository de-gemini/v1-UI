
interface ProgressBarProps {
  step: number;
  isStepDone: (idx: number) => boolean;
  onStepClick: (stepNumber: number) => void;
}

import React from 'react';
import GlobalSummaryBar from '../../components/GlobalSummaryBar';

interface ProgressBarProps {
  step: number;
  isStepDone: (idx: number) => boolean;
  onStepClick: (stepNumber: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, isStepDone, onStepClick }) => (
  <>
    <GlobalSummaryBar />
    <div className="w-full max-w-5xl mx-auto px-4 mb-8 mt-16"> {/* Added mt-16 to account for the fixed GlobalSummaryBar */}
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-brand-primary">
          Degemini
        </h2>
      </div>
      
      {/* Progress Timeline */}
      <div className="relative">
        {/* Base Connecting Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        
        {/* Active Progress Line - spans the full width based on completed steps */}
        <div 
          className="absolute top-6 left-0 h-0.5 bg-brand-primary z-5 transition-all duration-300"
          style={{ 
            width: step > 1 ? '100%' : '0%'
          }}
        ></div>
        
        {/* Progress Steps */}
        <div className="relative flex items-center justify-between z-10">
          {['When to clean', 'What to clean', 'Additional info'].map((label, idx) => {
            const stepNumber = idx + 1;
            const canClick = isStepDone(idx) || stepNumber === step;
            
            return (
              <div
                key={label}
                className="flex flex-col items-center relative"
              >
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold text-sm relative z-10 transition-all duration-200
                    ${
                      step - 1 === idx
                        ? 'border-brand-primary bg-white text-brand-primary shadow-md'
                        : isStepDone(idx)
                        ? 'border-brand-primary bg-brand-primary text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-400'
                    }
                    ${canClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                  `}
                  onClick={() => canClick && onStepClick(stepNumber)}
                >
                  {isStepDone(idx) ? (
                    <span className="text-white text-lg font-bold">✓</span>
                  ) : (
                    <span className={step - 1 === idx ? 'text-brand-primary' : 'text-gray-400'}>
                      {idx + 1}
                    </span>
                  )}
                </div>
                
                {/* Step Label */}
                <span
                  className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[100px] leading-tight transition-colors duration-200
                    ${
                      step - 1 === idx
                        ? 'text-brand-primary'
                        : isStepDone(idx)
                        ? 'text-brand-primary'
                        : 'text-gray-500'
                    }
                    ${canClick ? 'cursor-pointer hover:text-brand-primary' : 'cursor-default'}
                  `}
                  onClick={() => canClick && onStepClick(stepNumber)}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
);

export default ProgressBar; 