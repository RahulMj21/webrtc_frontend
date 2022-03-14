import React from 'react'
import HeadingIcon from "./HeadingIcon"

const Card = ({ logo, text, children }) => {
    return (
        <main className="card">
            {(logo && text) && (
                <div className="card__heading">
                    <HeadingIcon logo={logo} text={text} />
                </div>
            )}
            {children}
        </main>
    )
}

export default Card
