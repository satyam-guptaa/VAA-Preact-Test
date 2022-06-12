import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import { useEffect, useState } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { doRequest } from '../services/http.service';
import Results from '../components/my-components/search.result.component';
import { BookingRequest, BookingResponse, Holiday } from '../types/booking';
import { DateTime } from 'luxon';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [holidays, setHolidays] = useState<BookingResponse[]>([])
    const [spin, setSpin] = useState(false)

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    useEffect(() => {
        const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": searchParams?.matches?.location,
            "departureDate": departureDate,
            "duration": searchParams?.matches?.duration as unknown as number,
            "gateway": "LHR",
            "partyCompositions": [
                {
                    "adults": searchParams?.matches?.adults as unknown as number,
                    "childAges": [],
                    "infants": 0
                }
            ]
        }

        setSpin(true)
        doRequest('POST', '/cjs-search-api/search', requestBody)
            .then((response: unknown | BookingResponse) => {         
                setHolidays(response["holidays"])
                setSpin(false)
            }).catch((error)=>{
                setSpin(false)
                console.log(error)  
            })
    }, [searchParams])

    return (
        <section>
            <SearchComponent />
            <br />
            {!spin && <Results holidays={holidays}/>}
            {spin && <ClipLoader color="red" loading={spin} css={override} size={150} />} 
        </section>
    )
}