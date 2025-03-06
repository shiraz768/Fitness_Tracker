import React from "react";

const AboutSection = () => {
  return (
    <>
      <div>
        <div className="flex justify-around w-[100%] bg-blue-900 mt-10 px-14 py-15" >
          <div className="about-image w-[30%]"data-aos="fade-right" >
            <img
              src="./about-image.jpeg"
              alt=""
              height={"400px"}
              width={"400px"}
            />
          </div>
          <div className=" w-[40%]">
            <div>
              <div className="">
                <div className="flex items-center space-x-4" data-aos="fade-left">
                  <p className="text-7xl font-bold text-blue-500 ">01</p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-xm  text-blue-500">Fitness Tracking</p>
                    <p className="text-3xl font-bold text-white">About us </p>
                  </div>
                </div>
                <div className="py-10"  data-aos="fade-up">
                  <p className="text-white ">
                    These websites focus on tracking your physical activities
                    such as steps taken, distance covered, and calories burned.
                    They often use sensors in smartphones or wearable devices to
                    monitor movement.
                  </p>
                  <p className="text-white py-10">
                    Workout and Exercise Applications: These websites provide
                    users with various workout routines, exercises, and fitness
                    plans. They can be tailored to different fitness levels and
                    goals, including strength training, cardio, yoga, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around w-[100%] items-center bg-black mt-10 px-10 py-10">
          <div className=" w-[40%]" data-aos="fade-right">
            <div>
              <p className="text-3xl font-bold text-blue-500 ">Tracking</p>
              <p className="text-white py-4">
                These websites focus on tracking your physical activities such
                as steps taken, distance covered, and calories burned. They
                often use sensors in smartphones or wearable devices to monitor
                movement.
              </p>
              <p className="text-white py-10">
                Workout and Exercise Applications: These websites provide users
                with various workout routines, exercises, and fitness plans.
                They can be tailored to different fitness levels and goals,
                including strength training, cardio, yoga, and more.
              </p>
            </div>
          </div>
          <div className="about-image w-[20%]" data-aos="fade-left">
            <img
              src="./About.png"
              alt=""
              height={"250px"}
              width={"250px"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
