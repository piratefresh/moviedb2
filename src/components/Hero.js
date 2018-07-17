import React, { Component } from "react";
import Carousel from "nuka-carousel";
// Styled
import styled from "styled-components";

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 600px;
  @media (max-width: 650px) {
    height: 300px;
  }
`;
const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Overlay = styled.div`
  content: "";
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;
const HeroContent = styled.div`
  position: absolute;
  bottom: 20%;
  right: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fbfbfb;
  width: 400px;

  h2 {
    font-size: 3rem;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
  }
  @media (max-width: 650px) {
    height: 250px;
    width: 200px;
    bottom: 10%;
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;
const Details = styled.div`
  display: flex;
`;
const VoteAvg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  color: #000;
  margin-left: 5%;
  padding: 0 5px;
  width: 40px;
  font-size: 2rem;
  font-weight: 700;
`;

class Hero extends Component {
  render() {
    const { header } = this.props;
    const overviewLength = 400;

    let heroHeaderContent;
    heroHeaderContent = header.map(
      ({ backdrop_path, overview, title, popularity, id }, index) => (
        <HeroWrapper key={index}>
          <a href={`movie/${id}`}>
            <HeroImg
              src={`http://image.tmdb.org/t/p/original${backdrop_path}`}
              alt={title + "poster"}
            />
            <Overlay />
            <HeroContent>
              <Details>
                <h2>{title.toUpperCase()}</h2>{" "}
                <VoteAvg>{popularity.toFixed(0)}</VoteAvg>
              </Details>
              <p>{overview.substring(0, overviewLength)}</p>
            </HeroContent>
          </a>
        </HeroWrapper>
      )
    );
    return (
      <div>
        <Carousel
          slidesToShow={1}
          autoplay={true}
          autoplayInterval={5000}
          wrapAround={true}
        >
          {heroHeaderContent}
        </Carousel>
      </div>
    );
  }
}

export default Hero;
