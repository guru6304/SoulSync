import PropTypes from "prop-types";
import Header from "../../components/common/Header";
import BottomNavigation from "../../components/common/BottomNavigation";
import Sidebar from "../Sidebar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {

    return (

        <div className="ss-layout">

            <Header />

            <div className="ss-layout__wrapper">

                <aside className="ss-layout__sidebar">

                    <Sidebar />

                </aside>

                <main className="ss-layout__content">

                    {children}

                </main>

            </div>

            <div className="ss-layout__bottom-nav">

                <BottomNavigation />

            </div>

        </div>

    );

};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;