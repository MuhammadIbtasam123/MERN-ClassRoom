import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import CompaniesUsingHR360 from "../Components/Header";
import Faqs from "../Components/Faqs";
import Footer from "../Components/Footer";
import TestimonialsGrid from "../Components/Testimonial";

function LandingPage() {
  return (
    <>
      <div className="fixed w-full z-20 top-0 start-0 bg-green-900">
        <Navbar />
      </div>

      <div>
        <Hero />
      </div>
      <div>
        <CompaniesUsingHR360 />
      </div>
      <div className="bg-gray-100">
        <TestimonialsGrid />
      </div>
      <div className="m-8">
        <Faqs />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
