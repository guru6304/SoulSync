import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";

import HeroCard from "../../components/dashboard/HeroCard";
import DashboardBackground from "../../components/dashboard/DashboardBackground";
import FloatingHearts from "../../components/dashboard/FloatingHearts";
import TogetherCard from "../../components/dashboard/TogetherCard";
import MoodPreview from "../../components/dashboard/MoodPreview";
import MemoryPreview from "../../components/dashboard/MemoryPreview";
import LetterPreview from "../../components/dashboard/LetterPreview";
import TimelinePreview from "../../components/dashboard/TimelinePreview";
import MusicPreview from "../../components/dashboard/MusicPreview";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import LoveQuote from "../../components/dashboard/LoveQuote";
import TodayQuestion from "../../components/dashboard/TodayQuestion";
import DashboardStats from "../../components/dashboard/DashboardStats";

import "./DashboardPage.css";

const DashboardPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(
        (state) => state.auth.user
    );

    const hasCouple =
        !!user?.active_couple?.id;

const handleLogout = () => {

    dispatch(logout());

    navigate("/login", { replace: true });

};



    return (
        <>
            <DashboardBackground />

            <FloatingHearts />

            <main className="ss-dashboard">

                <div className="d-flex justify-content-between align-items-center mb-4">

    <h2 className="mb-0">

        Welcome,

        {" "}

        {user?.first_name ||
            user?.username}

        ❤️

    </h2>

    <button
        className="btn btn-outline-danger"
        onClick={handleLogout}
        title="Logout"
    >

        <i className="bi bi-box-arrow-right"></i>

    </button>

</div>

                {
                    !hasCouple ? (

                        <div
                            className="card shadow-lg border-0 mx-auto mb-5"
                            style={{
                                maxWidth: "650px",
                                borderRadius: "20px",
                            }}
                        >

                            <div className="card-body text-center p-5">

                                <h2 className="mb-3">

                                    ❤️ Invite Your Partner

                                </h2>

                                <p className="text-muted mb-4">

                                    Soul Sync becomes truly magical
                                    when both partners are connected.

                                    <br />

                                    Send an invitation and begin
                                    your beautiful journey together.

                                </p>

                                <button
                                    className="btn btn-danger btn-lg px-5"
                                    onClick={() =>
                                        navigate(
                                            "/couple-invitation"
                                        )
                                    }
                                >

                                    Invite Partner

                                </button>

                            </div>

                        </div>

                    ) : (

                        <>

                            <HeroCard />

                            <DashboardStats
                                stats={{
                                    daysTogether: 365,
                                    memories: 128,
                                    letters: 42,
                                    loveScore: 100,
                                }}
                            />

                            <QuickActions />

                            <DashboardGrid
                                left={
                                    <>

                                        <MemoryPreview />

                                        <LetterPreview />

                                        <TimelinePreview />

                                        <MusicPreview />

                                    </>
                                }
                                right={
                                    <>

                                        <TogetherCard />

                                        <MoodPreview />

                                        <TodayQuestion
                                            question="What is one thing your partner did this week that made you smile?"
                                        />

                                        <UpcomingEvents />

                                        <RecentActivity />

                                        <LoveQuote />

                                    </>
                                }
                            />

                        </>

                    )
                }

            </main>

        </>
    );

};

export default DashboardPage;