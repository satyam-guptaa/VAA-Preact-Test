import { createRef, h, JSX } from "preact";
import * as style from "./filter.component.module.less";
import StarRating from "react-svg-star-rating";
import facilities from '../../consts/facilities'
import {FilterProps} from '../../types/componentProps'

export default function Filter({handlePriceFilter,handleRatingFilter,handleFacilityFilter,selectedRating, handleRemoveFilter}: FilterProps) {

    const priceFilter = (arr: number[]): JSX.Element => {
        return (
        <div className={style["filter-input"]}>
            <input
            type="checkbox"
            id={arr[0].toString()}
            onClick={handlePriceFilter}
            value={arr}
            />
            <label
            className="form-check-label"
            htmlFor={arr[0].toString()}
            >{`From ${arr[0]} to ${arr[1]}`}</label>
        </div>
        );
    };

    const ratingFilter = (stars: number): JSX.Element => {
        return (
        <a
            href="#"
            className={selectedRating === stars? `${style["active"]}`: `${style["rating-anchor"]}`}
            onClick={() => handleRatingFilter(stars)}
        >
            {stars}
            <StarRating
            count={1}
            size={15}
            unit={"full"}
            initialRating={1}
            isReadOnly={true}
            />
            +
        </a>
        );
    };

    return (
        <div className={`${style["filter-elements"]}`}>
            <h2>Filters</h2>
            <hr />
            <h4>Price</h4>
            <div className={`${style["price-filter"]}`}>
                {priceFilter([0, 500])}
                {priceFilter([500, 1500])}
                {priceFilter([1500, 3000])}
                {priceFilter([3000, 5000])}
            </div>
            <hr />
            <h4>Ratings</h4>
            <div className={`${style["rating-filter"]}`}>
                {ratingFilter(1)}
                {ratingFilter(2)}
                {ratingFilter(3)}
                {ratingFilter(4)}
            </div>
            <hr />
            <h4>Facilities</h4>
            <div className={`${style["facility-filter"]}`}>
            {facilities.map((facility) => {
                return (
                <div className={style["filter-input"]} key={facility}>
                    <input type="checkbox" value={facility} id={facility} onClick={handleFacilityFilter}/>
                    <label className="form-check-label" htmlFor={facility}>
                    {facility}
                    </label>
                </div>
                );
            })}
            </div>
            <hr />
            <div>
                <button type="button" className="btn btn-danger" onClick={handleRemoveFilter}>Remove Filter</button>
            </div>
        </div>
    );
}
