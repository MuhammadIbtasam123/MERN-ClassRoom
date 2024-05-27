import image from "../assets/hero-main.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" dark:bg-green-900 text-white dark:text-black mt-10 pb-0 mb-0 pt-20">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1
            className="max-w-2xl mb-6 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-5xl "
            style={{
              fontFamily: "lobster, cursive",
              color: "#86efac",
            }}
          >
            Give your students instant coaching and AI feedback.
          </h1>
          <p
            className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl"
            style={{
              color: "#86efac",
            }}
          >
            Improve student engagement and outcomes when they take assignments
            with multiple attempts and targeted help. Use your own content or
            generate with AI.
          </p>
          <Link to="/signup">
            <button
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-green-300 rounded-lg text-black bg-opacity-70 hover:bg-opacity-100 focus:ring-4 focus:ring-primary-300 shadow-lg focus:shadow-lg hover:shadow-xl focus:ring-opacity-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
          <Link to="/Login">
            <button
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-green-300 rounded-lg hover:bg-green-100 focus:ring-4 focus:ring-gray-100 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={image} alt="mockup" className="border rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
