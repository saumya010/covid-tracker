import React, {Component} from "react";

import styles from './App.module.css';
import { fetchData } from "./api";

import { Cards, Charts, CountryPicker } from './Components';

class App extends Component {
    state = {
        data: {}
    }

    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState(fetchData)
    }

    render() {
        const { data } = this.state;
        return(
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker />
                <Charts />
            </div>
        )
    }
}

export default App;