import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])
    
    useEffect(() => {
        const fetchCountryApi = async () => {
            setFetchedCountries( await fetchCountries() )
        }
        fetchCountryApi()
    }, [setFetchedCountries])
    
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={ (e) => handleCountryChange(e.target.value) }>
                <option value="">Global</option>
                {
                    fetchedCountries.map( (country) => {
                        return <option value={country} key={country}>{country}</option>
                    } )
                }
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;