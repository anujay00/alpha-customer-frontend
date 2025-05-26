import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify">
          <p>
            At ALPHA, we're more than just a clothing store – we're a fashion
            destination. Our journey began with a vision to create an inclusive
            and innovative shopping experience, offering customers the chance to
            explore a wide variety of clothing items for every occasion, style,
            and personality.
          </p>
          <p>
            From casual wear to formal attire, we handpick our collections with
            care, ensuring each piece meets high standards of quality, style,
            and comfort. We believe that fashion should empower and inspire, and
            our curated selection is designed to do just that – helping you look
            and feel your best every day.
          </p>
          <b className="text-gray-800">ALPHA Concept</b>
          <p>
            Our mission at ALPHA is simple: to provide a seamless shopping
            experience with clothing that celebrates individuality, confidence,
            and self-expression. With every new collection, we aim to offer
            products that reflect the latest trends while maintaining timeless
            elegance.
          </p>
        </div>
      </div>

      <div className=" text-xl py-4">
        <Title text1={"WHY"} text2={"THE ALPHA IS HERE"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify">
          <b>Curated Fashion Collections:</b>
          <p className=" text-gray-600">
            At ALPHA, we carefully select and curate each item to ensure that we
            bring you the best in fashion. From modern trends to classic
            staples, we’ve got everything you need to elevate your wardrobe.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify">
          <b>Comfort Meets Style:</b>
          <p className=" text-gray-600">
            We believe that fashion should never sacrifice comfort. ALPHA
            combines stylish designs with premium fabrics to bring you clothing
            that fits perfectly, feels amazing, and moves with you throughout
            your day.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify">
          <b>Seamless Shopping Experience:</b>
          <p className=" text-gray-600">
            From browsing to checkout, we’ve created an intuitive and
            hassle-free shopping journey. With a user-friendly interface and
            personalized product recommendations, shopping at ALPHA is designed
            to be easy and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
