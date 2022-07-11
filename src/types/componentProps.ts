import {Hotel, BookingResponse} from './booking'

export interface HotelProps {
    hotel: Hotel,
    pricePP: number,
};

export interface ResultProps  {
    holidays: BookingResponse[],
}

export interface FilterProps {
    handlePriceFilter: (e: MouseEvent) => void;
    handleRatingFilter: (rating: number) => void;
    handleFacilityFilter: (e: MouseEvent) => void;
    selectedRating: number;
    handleRemoveFilter: (e:MouseEvent) => void;
  }
  