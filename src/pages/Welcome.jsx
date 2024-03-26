import welcome from "../assets/welcome.png";
import easy from "../assets/easy-to-use.png";
import Button from "../components/ui/Button";
import delivery from "../assets/delivery.png";
import circleEnvelope from "../assets/circle-envelope.png";
import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <article className="flex flex-col h-full gap-5 sm:mx-10 sm:justify-around ">
      <figure className="flex flex-col items-center gap-10 overflow-y-hidden sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-10">
        <img
          src={welcome}
          alt="Volunteers handing out food"
          className="w-full md:max-w-[700px] "
        />
        <figcaption className="flex items-center gap-5 font-robotoslab sm:flex-col md:w-3/4">
          <p className="text-xl sm:text-2xl md:text-3xl">
            Transforming excess into impact. Join us in reshaping communities
            and ensuring no meal goes to waste.
          </p>
          <NavLink to="/login" className={"flex-shrink-0"}>
            <Button
              disabled={false}
              className="hover:bg-green-500 hover:font-bold lg:text-xl "
            >
              Get Started
            </Button>
          </NavLink>
        </figcaption>
      </figure>
      <section className="flex flex-col items-center gap-10 font-robotoslab sm:flex-row sm:items-baseline sm:justify-evenly ">
        <div className="flex flex-col items-center w-64 text-center ">
          <img src={easy} alt="fingers snapping" className="w-14 md:w-1/3" />
          <h3 className="text-xl font-bold">Easy Donation Posting</h3>
          <p>Quickly share surplus food and make a meaningful impact!</p>
        </div>
        <div className="flex flex-col items-center w-64 text-center ">
          <img
            src={circleEnvelope}
            alt="image of an evelope"
            className="w-14 md:w-1/3"
          />
          <h3 className="text-xl font-bold">
            Instant Messaging for Coordination
          </h3>
          <p>Coordinate pickup details instantly!</p>
        </div>
        <div className="flex flex-col items-center w-64 text-center ">
          <img src={delivery} alt="image of box" className="w-14 md:w-1/3" />
          <h3 className="text-xl font-bold">Simple Donation Claiming</h3>
          <p>Get what you need hassle-free!</p>
        </div>
      </section>
    </article>
  );
}

export default Welcome;
