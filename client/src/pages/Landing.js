import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            <span>Find Your Dream Job Here</span>
          </h1>
          <p>
            GetJobCall.com is a Job Search Company, Which helps in finding jobs Like
            Delivery Jobs, Telecaller Jobs, Customer Support Jobs, Jobs For
            Electrician, Driver Jobs, Developer, Designer 50+ Categories in
            India which are 100% verified and Free. Got to the GetJobCall.com to
            find jobs that are genuine and in your area. Select the job you like
            and call directly to the recruiter or company for an interview.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
