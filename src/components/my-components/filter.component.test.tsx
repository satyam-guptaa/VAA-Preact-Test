import Filter from "./filter.component";
import { h } from 'preact';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

configure({ adapter: new Adapter })

const filterProps = {
    handlePriceFilter: ()=>{console.log("PriceFiter")},
    handleRatingFilter: ()=>{console.log("PriceFiter")},
    handleRemoveFilter: ()=>{console.log("PriceFiter")},
    handleFacilityFilter: ()=>{console.log("PriceFiter")},
    selectedRating: 5
}

describe("Filter component", () => {
    it("renders", () => {
        const wrapper = shallow(<Filter {...filterProps}/>);
        expect(wrapper.exists()).toBe(true)
    })
    
    it("consist h2 element", ()  => {
        const wrapper = shallow(<Filter {...filterProps}/>);
        const h2El = wrapper.find('h2')
        expect(h2El.length).toBe(1)
    })
    it("consist h4 element", ()  => {
        const wrapper = shallow(<Filter {...filterProps}/>);
        const h2El = wrapper.find('h4')
        expect(h2El.length).toBe(3)
    })
    it("consist button element", ()  => {
        const wrapper = shallow(<Filter {...filterProps}/>);
        const btn = wrapper.find('button')
        
        expect(btn.length).toBe(1)
    })
})
