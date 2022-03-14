import React from 'react'
import HeadingIcon from './HeadingIcon'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectUserAvatar, selectUserIsActivate, setUser } from "../features/authSlice"
import { logout } from "../http"
import { colors } from './RoomsCard'
import ImageWithBorder from './ImageWithBorder'

const Header = () => {
    const dispatch = useDispatch()
    const isActivated = useSelector(selectUserIsActivate);
    const userAvatar = useSelector(selectUserAvatar)

    let count;
    const getColor = () => {
        const current = Math.floor(Math.random() * 4);
        current === count ? count = current + 1 : count = current;
        return count;
    }

    const logoutUser = async () => {
        try {
            const { data } = await logout()
            dispatch(setUser(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="header">
            <nav className={`header__nav container ${isActivated && 'flex__between'}`}>
                <Link to="/" className="link header__link">
                    <HeadingIcon logo="logo" text="Codershouse" />
                </Link>
                {isActivated && (
                    <div className="header__user">
                        <ImageWithBorder src={userAvatar} color={colors[getColor()]} />
                        <button className="btnprimary header__button" onClick={logoutUser}>Log Out</button>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
