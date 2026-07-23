import { useSelector } from "react-redux";
import { Avatar } from "../ui";
import "./Header.css";

const Header = () => {

    const { user } = useSelector((state) => state.auth);

    return (

        <header className="ss-header">

            <div className="ss-header__left">

                <h1 className="ss-header__logo">
                    Soul Sync ❤️
                </h1>

            </div>

            <div className="ss-header__right">

                <Avatar
                    size="md"
                    src={user?.profilePicture}
                    name={user?.fullName}
                    clickable
                />

            </div>

        </header>

    );

};

export default Header;