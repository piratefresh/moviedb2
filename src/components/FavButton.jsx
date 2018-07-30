import React, { Component } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

class FavButton extends Component {
  render() {
    const { matched, title, id } = this.props;
    return (
      <div>
        {!matched ? (
          <div>
            <FontAwesomeIcon
              icon={faStar}
              color={"gray"}
              style={{ cursor: "pointer" }}
              onClick={() => this.props.addFavourite(id, title)}
            >
              Click me
            </FontAwesomeIcon>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faStar}
            color={"yellow"}
            style={{ cursor: "pointer" }}
            onClick={() => this.props.removeFavourite(id)}
          />
        )}
      </div>
    );
  }
}

export default FavButton;
