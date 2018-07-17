import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
// styled
import styled from "styled-components";

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 5% 0;
    font-size: 0.4rem;
    /* NavBar Icon */
    h2 {
      padding-left: 5%;
    }
  }
  @media (max-width: 330px) {
    font-size: 0.3rem;
  }
`;
const DropdownHeaderContent = styled.div``;
const DropdownList = styled.ul`
  padding: 1%;
  float: left;
  position: absolute;
  background: #fbfbfb;
  column-count: 3;
  color: #2b2b2b;
  z-index: 2;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  @media (max-width: 650px) {
    bottom: 100%;
  }
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { list, iconSize, isMobile } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <DropdownHeader onClick={() => this.toggleList()}>
          <DropdownHeaderContent>
            {!isMobile ? (
              "Genres"
            ) : (
              <div>
                <FontAwesomeIcon icon={faFilter} size={iconSize} />
                <p>{this.props.title}</p>
              </div>
            )}
          </DropdownHeaderContent>
          {listOpen ? (
            <FontAwesomeIcon
              icon={faAngleUp}
              size="2x"
              style={{ marginLeft: "3%", marginRight: "3%" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleDown}
              size="2x"
              style={{ marginLeft: "3%", marginRight: "3%" }}
            />
          )}
        </DropdownHeader>

        {listOpen && (
          <DropdownList>
            {list.map(item => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.props.toggleItem(item.id, item.name)}
              >
                {item.name}
              </li>
            ))}
          </DropdownList>
        )}
      </div>
    );
  }
}

export default Dropdown;
