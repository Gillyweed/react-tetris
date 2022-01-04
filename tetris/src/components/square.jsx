import React from 'react';

//map color to shape
const COLOR_MAP = [
    "white",  //None
    "pink",   //I
    "purple", //T
    "green",  //L
    "brown",  //J
    "red",    //Z
    "orange", //S
    "blue",   //O
]

const getStyle = (colorVal) => {
    return {
        height            : "35px",
        width             : "35px",
        borderStyle       : "solid",
        borderWidth       : "1px",
        color             : "black",
        justifyContent    : "center",
        backgroundColor   : COLOR_MAP[colorVal],
    }
}

const Square = (props) => <div style={getStyle(props.color + 1)} />

export default Square;