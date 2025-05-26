import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ALPHA"} text2={"AI"} />
      </div>
      <div className="text-1xl text-center pt-8 border-t">
        <Title text1={"ITEM"} text2={"FINDER"} />
      </div>
      <img
        className="w-full mx-auto md:max-w-[300px]"
        src={assets.productfind}
        alt="sizechart"
      />
      <div className="my-10 flex flex-col gap-16">
        <div className="flex flex-col gap-6 text-gray-600 text-justify">
          <p>
            At ALPHA, we have introduced a revolutionary service to make
            shopping even easier. If you come across a clothing item you love,
            simply upload a photo or screenshot, and our advanced system will
            help you identify that product or find similar items from our
            collection. It's a seamless way to discover the styles you love and
            make them yours — all with the convenience of your smartphone or
            computer.
          </p>
          <div className="flex justify-center">
            <a
              href="http://127.0.0.1:5000/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                Explore Product Finder
              </button>
            </a>
          </div>
        </div>

        <div className="text-1xl text-center pt-8 border-t">
          <Title text1={"OUTFIT"} text2={"RECOMMENDER"} />
        </div>
        <img
          className="w-full mx-auto md:max-w-[300px]"
          src={assets.suggester}
          alt="sizechart"
        />
        <div className="flex flex-col gap-6 text-gray-600 text-justify">
          <p>
            ALPHA’s Dress Recommender is designed to take the guesswork out of
            finding the perfect outfit. By considering various factors such as
            your style preferences, occasion, and body type, our advanced system
            suggests the most suitable clothing options for you. Whether you're
            looking for a casual look for a day out or something more formal for
            a special event, our recommender ensures you always have the right
            outfit for any occasion.
          </p>
          <div className="flex justify-center">
            <a
              href="http://localhost:3000/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                Explore Outfit Recommender
              </button>
            </a>
          </div>
        </div>

        <div className="text-1xl text-center pt-8 border-t">
          <Title text1={"OUTFIT"} text2={"GENERATOR"} />
        </div>
        <img
          className="w-full mx-auto md:max-w-[300px]"
          src={assets.imagen}
          alt="sizechart"
        />
        <div className="flex flex-col gap-6 text-gray-600 text-justify">
          <p>
            ALPHA's Dress Image Generator takes the guesswork out of putting
            together the perfect outfit. By simply uploading an image or
            providing a description, the generator uses advanced AI technology
            to visualize and create outfit suggestions based on various factors
            like color coordination, season, and personal style preferences.
            Whether you're unsure about how to pair a specific item or just need
            inspiration, the Dress Image Generator helps you see the outfit in
            your mind before even trying it on.
          </p>
          <p>
            Similarly, ALPHA's AutoFit Suggester takes into account your
            measurements, preferred styles, and current wardrobe to recommend
            outfits that not only match your taste but also flatter your body
            shape. It suggests combinations that work for different occasions,
            making it easier to shop with confidence. You no longer need to
            imagine how clothes will look — the suggestions are made for you, so
            you can visualize your perfect outfit instantly.
          </p>
          <div className="flex justify-center">
            <a
              href="http://localhost:7001/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                Explore Image Generator
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
