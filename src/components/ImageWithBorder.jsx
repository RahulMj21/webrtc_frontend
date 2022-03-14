import React from 'react'

const ImageWithBorder = ({ src, color, big }) => {
    return (
        <img src={src} alt="avatar" style={{ height: `${big ? "70px" : "45px"}`, width: `${big ? "70px" : "45px"}`, border: `3px solid ${color ? color : "#0077ff"}`, borderRadius: "50%" }} />
    )
}

export default ImageWithBorder
