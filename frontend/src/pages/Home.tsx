import LoginWithGoogle from '../components/LoginWIthGoogle'
import { useEffect } from 'react'
import { getCurrentUser } from '../features/user'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setUser } from '../redux/userSlice'

type Props = {}

const Home = (props: Props) => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.user);
    console.log("Redux State current user", user)
    const getUser = async () => {
        const data = await getCurrentUser();
        console.log("data", data)
        if (data) {
            dispatch(setUser(data));
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    if (isAuthenticated && user) {
        return (
            <div>
                <p>Welcome {user?.name}</p>
                <p>{user?.email}</p>
            </div>
        )
    }
    return (
        <div>

            <LoginWithGoogle />
        </div>
    )
}

export default Home