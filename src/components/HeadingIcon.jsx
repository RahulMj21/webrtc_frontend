import React from 'react'

const HeadingIcon = ({ logo, text }) => {
    return (
        <div className="logo">
            <div className="logo__icon">
                <img src={`/images/${logo}.svg`} alt="logo" />
            </div>
            <p className={`logo__text`}>{text}</p>
        </div>
    )
}

export default HeadingIcon
