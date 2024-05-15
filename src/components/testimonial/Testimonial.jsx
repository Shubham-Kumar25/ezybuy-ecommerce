import React, { useContext } from "react";
import myContext from "../../context/myContext";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frequent Shopper",
    image: "https://ecommerce-sk.vercel.app/img/kamal.png",
    text: "EzyBuy offers an incredible selection of products at unbeatable prices. Their customer service is top-notch, and I always find what I need. Highly recommend!",
  },
  {
    name: "Maria Rodriguez",
    role: "Home Decor Enthusiast",
    image: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
    text: "I love shopping for home decor on EzyBuy. Their products are stylish and affordable, and delivery is always fast. My home has never looked better!",
  },
  {
    name: "James Lee",
    role: "Tech Savvy",
    image: "https://webknudocs.vercel.app/logo/react.png",
    text: "EzyBuy is my go-to for the latest gadgets and tech. They have a great selection and their prices are very competitive. The buying experience is smooth and hassle-free.",
  },
];

function TestimonialCard({ name, role, image, text, mode }) {
  return (
    <div className="p-4 mb-6 lg:w-1/3 lg:mb-0">
      <div className="h-full text-center">
        <img
          alt={`${name} testimonial`}
          className="inline-block object-cover object-center w-20 h-20 mb-8 bg-gray-100 border-2 border-gray-200 rounded-full"
          src={image}
        />
        <p
          className="leading-relaxed"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          {text}
        </p>
        <span className="inline-block w-10 h-1 mt-6 mb-4 bg-pink-500 rounded" />
        <h2
          className="text-sm font-medium tracking-wider text-gray-900 uppercase title-font"
          style={{ color: mode === "dark" ? "#ff4162" : "" }}
        >
          {name}
        </h2>
        <p
          className="text-gray-500"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <section className="mb-10 text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <h1
            className="text-3xl font-bold text-center text-black"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Testimonials
          </h1>
          <h2
            className="mb-10 text-2xl font-semibold text-center"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            What our <span className="text-pink-500">customers</span> are saying
          </h2>
          <div className="flex flex-wrap -m-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} mode={mode} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
