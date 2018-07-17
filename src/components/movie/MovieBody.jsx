import React, { Component } from "react";
import { connect } from "react-redux";
// styled
import styled from "styled-components";

const MovieContent = styled.div`
  display: grid;
  margin: 0 auto;
  margin-bottom: 5%;
  margin-top: 5%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "overview overview"
    "cast cast"
    "cast cast";
  grid-gap: 2%;
  width: 800px;
  color: #fbfbfb;
  li {
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.25);
  }
  h3::before {
    display: block;
    content: "";
    height: 10px;
    background-color: yellow;
    margin: 10px 0;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 10%;
  }
`;
const Thumbnail = styled.img`
  width: 64px;
  height: 100%;
  border-radius: 5px;
  padding: 0 0 0 0;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
`;
const MovieOverview = styled.div`
  grid-area: overview;
  @media (max-width: 400px) {
    padding: 0 5%;
  }
`;
const MovieCast = styled.div`
  grid-area: cast;
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    padding: 0 5%;
  }
`;
const MovieCrew = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const MovieActors = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class MovieBody extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
        <MovieContent>
          <MovieOverview>
            <h3>Overview:</h3>
            <p>{movie.overview}</p>
          </MovieOverview>
          <MovieCast>
            <h3>Crew: </h3>
            <MovieCrew>
              {movie.credits.crew.slice(0, 6).map(
                obj => (
                  !obj.profile_path
                    ? (obj.profile_path = "http://via.placeholder.com/74x96")
                    : (obj.profile_path = `https://image.tmdb.org/t/p/original/${
                        obj.profile_path
                      }`),
                  (
                    <Card key={obj.name}>
                      <Thumbnail src={`${obj.profile_path}`} alt="" />
                      <div className="info-text">
                        <p>{obj.name}</p>
                      </div>
                    </Card>
                  )
                )
              )}
            </MovieCrew>
            <h3>Cast: </h3>
            <MovieActors>
              {movie.credits.cast.slice(0, 6).map(
                obj => (
                  !obj.profile_path
                    ? (obj.profile_path = "http://via.placeholder.com/74x96")
                    : (obj.profile_path = `https://image.tmdb.org/t/p/original/${
                        obj.profile_path
                      }`),
                  (
                    <Card key={obj.name}>
                      <Thumbnail src={`${obj.profile_path}`} alt="" />
                      <div className="info-text">{obj.name}</div>
                    </Card>
                  )
                )
              )}
            </MovieActors>
          </MovieCast>
        </MovieContent>
      </div>
    );
  }
}

export default connect()(MovieBody);
