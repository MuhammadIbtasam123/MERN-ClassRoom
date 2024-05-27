// import React from "react";
import Postames from "../assets/postmates.svg";
import userTesting from "../assets/usertesting.svg";
import soundCloud from "../assets/soundcloud.svg";
import zipRecruiter from "../assets/ziprecruiter.svg";
import jacksonvilleJaguars from "../assets/jacksonville-jaguars.svg";
import changeOrg from "../assets/change-org.svg";

import PropTypes from "prop-types";
const CompaniesUsingHR360 = () => {
  return (
    <section className="bg-blue-100 mb-20 mt-10 ml-10 mr-10 py-12 rounded-lg shadow-lg">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center mb-20">
          Trusted by 300+ Companies Of All Szies
        </h2>
        <ul className="grid grid-cols-3 gap-8">
          <CompanyLogo companyName="Postmates" imageUrl={Postames} />
          <CompanyLogo companyName="UserTesting" imageUrl={userTesting} />
          <CompanyLogo companyName="SoundCloud" imageUrl={soundCloud} />
          <CompanyLogo companyName="ZipRecruiter" imageUrl={zipRecruiter} />
          <CompanyLogo
            companyName="Jacksonville Jaguars"
            imageUrl={jacksonvilleJaguars}
          />
          <CompanyLogo companyName="Change.org" imageUrl={changeOrg} />
        </ul>
      </div>
    </section>
  );
};

const CompanyLogo = ({ companyName, imageUrl }) => {
  return (
    <li className="flex items-center justify-center">
      <img src={imageUrl} alt={companyName} className="h-12" />
    </li>
  );
};

CompanyLogo.propTypes = {
  companyName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CompaniesUsingHR360;
