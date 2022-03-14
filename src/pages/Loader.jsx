import React from 'react'
import Card from '../components/Card'

const Loader = ({ text }) => {
    return (
        <>
            <section className="loader container section__card">
                <Card>
                    <img src="/images/loader.svg" alt="loader" className="loader__icon" />
                    <p className="loader__message">
                        {text ? text : "Processing please wait..."}
                    </p>
                </Card>
            </section>
        </>
    )
}

export default Loader
