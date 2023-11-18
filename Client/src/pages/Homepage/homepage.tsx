import { NavLink } from "react-router-dom";
import MovieFrameComponent from "../../components/Movie Frame/MovieFrame";
import './homepage.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../../utils/useUserContext";
import { useEffect } from "react";
import { UserType } from "../../context/UserContext";
import { createUser, getUserByEmail } from "../../services/users.service";

const Homepage = () => {
    const { getAccessTokenSilently, user, isLoading } = useAuth0();
    const { setCurrentLoggedUser } = useUserContext();

    useEffect(() => {
        (async function fetchUserData() {
            try {
                if (user?.email) {
                    const userData = await getUserByEmail(getAccessTokenSilently, user?.email);
                    const userFetched = userData[1] as UserType;
                    if (userData[1] != null) {
                        setCurrentLoggedUser(userFetched);
                    } else {
                        const newUser = {
                            name: user.name,
                            email: user.email,
                            password: user.email
                        };
                        const userCreated = await createUser(newUser);
                        setCurrentLoggedUser(userCreated);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, [user]);
    
    if (isLoading) {
        return (
            <div className="cradle-wrapper">
                <div className="newtons-cradle">
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                </div>
            </div>
        );
    }

    return (
        <main className="home-wrapper">
            <section className="frame-title-wrapper">
                <div className="frame-title">All movies</div>
                <NavLink to={`/see-all?title=All movies`}>
                    <button className="see-all-btn"><p className="see-all-text">See all</p></button>
                </NavLink>
            </section>
            <MovieFrameComponent id="firstSwiper" movieSet="allMovies" />
        </main>
    );
};

export default Homepage;
