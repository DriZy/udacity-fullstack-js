/** Use Axios to get data from restcountries api */
import axios from 'axios';

/** Use the free API https://restcountries.com/
 * You will use the following endpoints
 * https://restcountries.com/v2/name/${name} for countries by name
 * https://restcountries.com/v2/regionalbloc/${regionalbloc} for region blocks
 */

/** Create getCountry Function here */
async function getCountry(name: string) {
    const getApi = await axios(`https://restcountries.com/v2/name/${name}`);
    const data = getApi.data[0];
    return {
        capital: data.capital,
        region: data.region,
        numericCode: data.numericCode
    };
}

/** Create a test for this getRegion function */
async function getRegionCountries(regionalbloc: string) {
    const getApi = await axios(
        `https://restcountries.com/v2/regionalbloc/${regionalbloc}`
    );
    const data = getApi.data;
    const countries = [];
    for (let i = 0; i < data.length; i++) {
        countries.push(data[i].name);
    }
    return countries;
}

/** Create getRegionCapitals function here */
async function getRegionCapitals(capital: string) {
    const countries = await getRegionCountries(capital);
    const promises = countries.map((country: any) =>
        axios(`https://restcountries.com/v2/name/${country}`
        ));
    const arr = await Promise.all(promises);
    const capitals = [];
    for (let i=0; i < arr.length; i++) {
        capitals.push(arr[i].data[0].capital);
    }
    return capitals;
}

export default {
    getCountry,
    getRegionCountries,
    getRegionCapitals
};
