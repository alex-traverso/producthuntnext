import React from 'react';

const Button = (props) => {
    return (
        <button className='btn' style={
            {
                backgroundColor: props.bgColor ? '#DA552F' : 'white',
                color: props.bgColor ? 'white' : 'black'
            }
        }>{props.children}</button>
)
}

export default Button;