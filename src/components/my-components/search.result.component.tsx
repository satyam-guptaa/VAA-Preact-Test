import { h, JSX, Fragment } from 'preact'
import { BookingResponse } from '../../types/booking'
import Hotel from "./hotel.component"
import * as style from './search.result.module.less'
import Filter from './filter.component'
import { useEffect, useState } from 'preact/hooks'
import {ResultProps} from '../../types/componentProps'

export default function Results ({holidays}: ResultProps) {
    const [filteredHolidays, setFilteredHolidays] = useState<BookingResponse[]>(holidays)
    const [selectedPrice, setSelectedPrice] = useState<number[][]>([])
    const [selectedRating, setSelectedRating] = useState(0)
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [render, setRender] = useState(false)

    const handlePriceFilter = (e: MouseEvent) => {
        const currentTarget = e.target as HTMLInputElement
        const stringRangeArr = (currentTarget.value).split(',')
        const numberRangeArr = stringRangeArr.map(item => parseInt(item))
        const check = currentTarget.checked
        if(check) setSelectedPrice(prevState => [...prevState, numberRangeArr])
        if(!check) setSelectedPrice(prevState => prevState.filter(item => item[0]!==numberRangeArr[0] && item[1] !== numberRangeArr[1]))
    }
    
    const handleRatingFilter = (rating: number) => {
        setSelectedRating(rating)
    }

    const handleFacilityFilter = (e: MouseEvent) => {
        const currentTarget = e.target as HTMLInputElement
        const check = currentTarget.checked
        if(check) setSelectedFacilities(prevState => [...prevState, currentTarget.value])
        if(!check) setSelectedFacilities(prevState => prevState.filter(item => item!=currentTarget.value))   
    }

    const handleRemoveFilter = (e: MouseEvent) => {
        setSelectedFacilities([])
        setSelectedPrice([])
        setSelectedRating(0)
        setRender(true)
        setTimeout(()=>{setRender(false)}, 50)
    }
    
    // unneccesary
    // useEffect(()=>setFilteredHolidays(holidays), [holidays])

    useEffect(()=>applyFilter(), [selectedPrice, selectedRating, selectedFacilities])

    const applyFilter = () => {
        let filteredResult = holidays
        // Price Filter
        if(selectedPrice.length > 0) {
            // Filtering out the holidays for all the selected price and pushing the arrays in an empty array
            // If user selects multiple prices
           let filterHoliday : any[] = []
           selectedPrice.forEach(range => {
               filterHoliday.push(filteredResult.filter(holiday => holiday["pricePerPerson"] >= range[0] && holiday["pricePerPerson"] <= range[1]))
            })
            // Concating the filtered arrays if user selects multiple prices
            filteredResult = [].concat(...filterHoliday)
        }
        // Rating Filter
        if(selectedRating){
            filteredResult = filteredResult.filter(holiday => parseInt(holiday["hotel"]["content"]["vRating"]) >= selectedRating)
        }
        // Facility Filter
        if(selectedFacilities) {
            filteredResult =  filteredResult.filter(holiday => selectedFacilities.every((requiredFacilities => holiday["hotel"]["content"]["hotelFacilities"].includes(requiredFacilities))))
        }
        setFilteredHolidays(filteredResult)
      }

    return  ( 
        <div className={`${style["result-body"]}`}>
            {!render && <div className={`${style["filters"]}`}>
                <Filter handlePriceFilter={handlePriceFilter} handleRatingFilter={handleRatingFilter} selectedRating={selectedRating} handleFacilityFilter={handleFacilityFilter} handleRemoveFilter={handleRemoveFilter}/>
            </div>}
            {filteredHolidays.length > 0 && !render && 
            <div className={`${style["hotels-grid"]}`}>
                {filteredHolidays.map(holiday => {
                    return <Hotel hotel={holiday["hotel"]} pricePP={holiday["pricePerPerson"]}/>
                })}
            </div>}
            {filteredHolidays.length === 0 && 
                <h1>No Holidays Found!!</h1>
            }
        </div>
    )
}