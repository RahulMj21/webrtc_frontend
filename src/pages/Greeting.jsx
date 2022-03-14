import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

const Greeting = () => {
    return (
        <section className="greeting container section__card">
            <Card logo="logo" text="Welcome to Codershouse!">
                <p className="card__message">
                    We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing touches, we’re adding people gradually to make sure nothing breaks :)
                </p>
                <Link to='/login' className="link">
                    <Button text="Let's Go" />
                </Link>
                <Link to="/login" className="greeting__signIn link">Have an invite text? <span>Sign in</span></Link>
            </Card>
        </section>
    )
}

export default Greeting
