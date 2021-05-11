import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  let formatSpots = function() {
    let spotsString = "no spots remaining";
    if (props.spots > 1) {
      spotsString = `${props.spots} spots remaining`
    }
    if (props.spots === 1) {
      spotsString = "1 spot remaining"
    }
    return spotsString;
  };

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}