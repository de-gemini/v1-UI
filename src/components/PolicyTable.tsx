

import React from 'react';

interface PolicyItem {
  action: string;
  details?: string;
  fee: string;
}

const policyData: PolicyItem[] = [
  {
    action: "Cancellation/Rescheduling between 6-24 hours before the start time if eMopper is assigned",
    fee: "£30",
  },
  {
    action: "Cancellation/Rescheduling 6 hours less than the start time if eMopper is assigned",
    fee: "£50",
  },
  {
    action: "No Show Up.",
    details: "If eMopper arrives, but the client is not reachable within 30 minutes and the eMopper cannot access the client's property.*",
    fee: "£50",
  },
  {
    action: "Subscription cancellation at any time, if the orders within your subscription are picked up by a cleaner",
    fee: "£50",
  },
];

const PolicyTable: React.FC = () => {
  return (
    <div className="mt-8">
      
      <div className="hidden md:block rounded-lg overflow-hidden">
        <table className="w-full md:w-[30rem] border border-brand-primary text-left">
          <thead className="bg-gray-50 border-b-2 border-brand-primary">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700 tracking-wider">Action</th>
              <th className="p-4 text-sm font-semibold text-gray-700 tracking-wider w-1/4">Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-primary">
            {policyData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 align-top">
                  <p className="font-medium text-gray-800">{item.action}</p>
                  {item.details && (
                    <p className="mt-2 text-sm text-gray-500">{item.details}</p>
                  )}
                </td>
                <td className="p-4 align-top font-medium text-gray-800">{item.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="md:hidden space-y-4">
        {policyData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Action</h3>
                <p className="mt-1 text-gray-800">{item.action}</p>
                {item.details && (
                    <p className="mt-2 text-sm text-gray-500">{item.details}</p>
                )}
            </div>
            <div className="p-4 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Fee</h3>
                <p className="font-medium text-gray-800">{item.fee}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyTable;