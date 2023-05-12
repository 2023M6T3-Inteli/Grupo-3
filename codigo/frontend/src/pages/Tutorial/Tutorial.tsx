import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Img001 from "./img/img01.png";
import Img002 from "./img/img02.png";
import Img003 from "./img/img03.png";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";

const PageAll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; 
`;

const TutorialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10%;
`;

const TutorialBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ImageTutorial = styled.img`
  max-height: 18rem;
  max-width: 100%;
  width: auto;
  height: auto;
`;

const TutorialTitle = styled.h1`
  margin: 1rem 0;
`;

const TutorialText = styled.h3`
  margin: 1rem 0;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: 0;
  font-size: 1rem;
  color: #0063b8;
  margin-top: 1rem;
  margin-right: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BigButton = styled.button`
  background-color: #0063b8;
  color: #fff;
  width: 329px;
  height: 57px;
  font-size: 1.5rem;
  font-weight: 300;
  font-family: "Roboto", sans-serif;
`;

const BigButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationDot = styled.div<{ active: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#0063b8" : "#999999")};
  margin: 0 0.2rem;
`;

interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Tutorial: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    // Set the body to have fixed positioning and no scroll
    document.body.style.position = "fixed";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore the body's default positioning and scroll behavior when the component unmounts
      document.body.style.position = "static";
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slides: Slide[] = [
    {
      id: 1,
      title: "Share knowledge and learn as a team",
      description:
        "LearnLink is the tool that encourages a collaborative culture in your company.",
      imageUrl: Img001,
    },
    {
      id: 2,
      title: "Expand your knowledge",
      description:
        "With LearnLink, your coworkers can share projects and other learning sources with you.",
      imageUrl: Img002,
    },
    {
      id: 3,
      title: "Build a learning community",
      description:
        "LearnLink promotes a collaborative culture and knowledge sharing in your company.",
      imageUrl: Img003,
    },
  ];

  const handleSlideChange = (swiper: Swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  };

  return (
    <PageAll>
      <SkipButton>Skip</SkipButton>
      <TutorialContainer>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          ref={swiperRef}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <TutorialBox>
                <ImageTutorial src={slide.imageUrl} alt="Tutorial Image" />
                <TutorialTitle>{slide.title}</TutorialTitle>
                <TutorialText>{slide.description}</TutorialText>
              </TutorialBox>
            </SwiperSlide>
          ))}
        </Swiper>
      </TutorialContainer>
      <PaginationContainer>
        {slides.map((slide, index) => (
          <PaginationDot key={slide.id} active={index === activeSlideIndex} />
        ))}
      </PaginationContainer>
      <BigButtonContainer>
        {/* <BigButton onClick={handleNextSlide}>Next</BigButton> */}
        <BigButton onClick={() => console.log("ola")}>Next</BigButton>
      </BigButtonContainer>
    </PageAll>
  );
};

export default Tutorial;
