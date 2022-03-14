import React, { useRef, useState } from 'react'
import { MdArrowForward } from 'react-icons/md'
import Card from '../components/Card'
import { setUserAvatar, selectActivateUser, setFileName } from '../features/activateSlice'
import { setUser } from "../features/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { activateUser } from "../http"
import Loader from './Loader'

const ChoosePhoto = () => {
    const [loading, setLoading] = useState(false)
    const user = useSelector(selectActivateUser)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState("/images/monkey-avatar.png")
    const avatarRef = useRef(null)

    const setImage = (e) => {
        const fileReader = new FileReader()
        if (e.target.files[0]) {
            const file = e.target.files[0]
            const fileName = file.name
            dispatch(setFileName(fileName))
            fileReader.readAsDataURL(file)
            fileReader.onloadend = function () {
                setAvatar(fileReader.result)
                dispatch(setUserAvatar(fileReader.result))
            }
        }
    }
    const sendAvatar = async () => {
        try {
            setLoading(true)
            const { data } = await activateUser(user);
            dispatch(setUser(data.user))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return loading ? (
        <Loader />
    ) : (
        <section className="choosephoto container section__card">
            <Card logo="monkey" text="Okey, Rahul Mondal !">
                <p className="choosephoto__question">How's this photo?</p>
                <div className="choosephoto__avatar" style={{ background: `url(${avatar}) center/cover` }} />
                <input type="file" hidden onChange={setImage} ref={avatarRef} />
                <p className="choosephoto__different" onClick={() => avatarRef.current.click()} >Choose a different photo!</p>
                <button className="button btnprimary" onClick={sendAvatar}>
                    <p>Next</p>
                    <MdArrowForward className="btnprimary__icon" />
                </button>
            </Card>
        </section>
    )
}



export default ChoosePhoto
