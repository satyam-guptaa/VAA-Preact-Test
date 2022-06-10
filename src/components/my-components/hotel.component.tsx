import { h, JSX } from "preact";
import { Hotel, Image } from "../../types/booking";
import * as style from "./hotel.component.module.less";
import StarRating from "react-svg-star-rating";

type HotelProps = {
  hotel: Hotel;
  pricePP: number;
};

export default function Hotel({ hotel, pricePP }: HotelProps) {
  const hotelImage: Image = hotel["content"]["images"][0]["RESULTS_CAROUSEL"];
  const hotelName: string = hotel["content"]["name"];
  const hotelRating: string | number = hotel.content.vRating;

  return (
    <div className="card" style="width: 18rem; box-shadow: 0 0 10px grey">
      <img src={hotelImage["url"]} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className={`"card-title" ${style["header"]}`}>{hotelName}</h5>
        <hr />
        <p className={style["cardText"]}>
          {hotelRating}
          <StarRating
            count={1}
            size={15}
            unit={"full"}
            initialRating={1}
            isReadOnly={true}
          />
        </p>
        <p className={`card-text ${style["cardText"]}`}>
          <span>&#8364;</span> {pricePP} <sub>PP</sub>
        </p> 
        <a href="#" className="btn btn-secondary">
          Go somewhere
        </a>
        
      </div>
    </div>
  );
}
