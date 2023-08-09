import React, { Component } from 'react';

const Like = props => {
    let classes = "fa fa-heart";
    if (props.liked) classes += '-o';
    return (
        <i style={{ cursor: "pointer" }} className={classes} aria-hidden="true" onClick={props.onClick}> </i>
    );
}

export default Like;