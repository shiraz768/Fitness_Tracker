import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };


  const sliderContent = [
    {
      title: "Flex Muscles",
      src:"./sliderimgs/FK.jpg",
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit.   Eaque reiciendis inventore iste ratione ex alias quis magni at optio"
    },
    {
      title: "Weight Lifting",
      src:"./sliderimgs/Pwr.jpg",
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit.   Eaque reiciendis inventore iste ratione ex alias quis magni at optio"
    },
    {
      title: "Powerful Vitamins",
      src:"./sliderimgs/WL.jpg",
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit.   Eaque reiciendis inventore iste ratione ex alias quis magni at optio"
    },
    {
      title: "Abdominal Excercises",
      src:"./sliderimgs/Yoga.jpg",
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit.   Eaque reiciendis inventore iste ratione ex alias quis magni at optio"
    },
   
  ]

  return (
    <div className="w-[90%] mx-auto mt-18 h-full" data-aos="fade-up">
      <p className="text-3xl font-bold text-white text-center py-16">Why Choose Us</p>
      <div className="mt-6">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} 
          infinite={true}
          autoPlay={true} 
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="text-white"
          itemClass="carousel-item-padding-40-px"
        >
          {sliderContent.map((item,key)=>(
          <div class="py-10 bg-black text-white w-full" key={key}>
            <div class="container mx-auto">
          <div
            className="my-6"
            tabIndex="-1"
            style={{width:"100%",display:"inline-block"}}
          >
            <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-primary/10 relative dark:bg-dark">
              <div className="mb-4">
                <img
                  src={`${item.src}`}
                  alt=""
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="space-y-3">
                  <p className="text-xs text-gray-300">
                  {`${item.para}`}
                  </p>
                  <h1 className="text-xl font-bold text-white dark:text-primary">
                  {`${item.title}`}
                  </h1>
                </div>
              </div>
              <p className="text-primary/20 text-9xl font-serif absolute top-0 right-0"></p>
            </div>
          </div>
            </div>
            </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
