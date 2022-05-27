import React from 'react';
import {Registration} from "./Registration";
import {respX} from "./types";


interface IProps {
}

interface IState {
    data: respX[];
}

export default class Components extends React.Component<IProps, IState> {

    state: IState = {data: []}

    async componentDidMount() {
        const response = await fetch(`https://run.mocky.io/v3/d95c3641-6810-4733-bf1c-ed371212fb81`);
        const json = await response.json();
        this.setState({data: json});
    }

    render() {
        return null;
        // return (
        //     <Registration userData={this.state.data }/>
        // );
    }
}
