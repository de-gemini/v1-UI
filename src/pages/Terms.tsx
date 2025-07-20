import React from "react";
import PolicyTemplate from "./PolicyTemplate";


const services = [
    {
        heading: "Regular Cleaning",
        content: (
            <p>
                Regular cleaning services include routine tasks such as dusting, vacuuming, mopping, and sanitizing surfaces to maintain a clean and healthy environment.
            </p>
        ),
    }
]
const termsAndConditions:React.FC = () => {

    return(
        <PolicyTemplate
            title="Terms and Conditions"
            sections={services}
        />
    )
}

export default termsAndConditions;