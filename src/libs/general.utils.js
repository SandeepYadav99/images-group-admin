/**
 * Created by charnjeetelectrovese@gmail.com on 9/28/2017.
 */
import Constants from '../config/constants';
import rawCountries from "../components/country/rawCountries";

export const cleanContactNumber = (value) => {
    const contactStr = value.replace(/[()+-]/g, '');
    const arr = contactStr.split(" ");
    if (arr.length > 1) {
      return `${arr[0]} ${arr.slice(1, arr.length).join('')}`
    } return arr[0];
  }
  
export function roundUnit(unit) {
    if(unit >= 1000) {
        return `${unit / 1000} Kg`;
    } else {
        return `${unit} Gm`;
    }
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

export const updateTitle = (title) => {
    document.title = Constants.APP_NAME + ' - ' + title;
}

export const getObjData = (value, txt = 'N/A') => {
    return value ? value : txt;
}

export const getSumValue = (...numbers) => {
    return numbers ? numbers.reduce((sum, value) => {
        if (value) {
            return sum + parseFloat(value);
        } return sum;
    }, 0) : 0;
};


export const getCountryCode = (code) => {
    const index = rawCountries.findIndex(country => country[3] === code);
    if (index >= 0) {
        return rawCountries[index][2];
    }
    return 'in';
}