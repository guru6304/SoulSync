import "./DashboardPage.css";

import MainLayout from "../../layouts/MainLayout";

import Greeting from "../../components/dashboard/Greeting/Greeting";
import CoupleStatus from "../../components/dashboard/CoupleStatus/CoupleStatus";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";

import Loader from "../../components/common/ui/Loader";
import ErrorMessage from "../../components/common/ui/ErrorMessage";
import PageHeader from "../../components/common/ui/PageHeader";

import useDashboard from "../../hooks/useDashboard";

const DashboardPage = () => {

    const {

        dashboard,
        loading,
        error,

    } = useDashboard();

    if (loading) {

        return <Loader />;

    }

    if (error) {

        return (

            <ErrorMessage

                message={error}

            />

        );

    }

    if (!dashboard) {

        return null;

    }

    const {

        user,
        partner,
        hasCouple,
        stats,
        todayMood,
        recentMemories,
        pendingInvitation,
        activity,

    } = dashboard;

    return (

        <MainLayout>

            <div className="ss-dashboard">

                <PageHeader
                    title="Dashboard"
                    subtitle="Welcome back ❤️"
                />

                <Greeting
                    user={user}
                />

                <CoupleStatus
                    partner={partner}
                    hasCouple={hasCouple}
                    pendingInvitation={pendingInvitation}
                />

                <QuickActions />

                <StatsGrid
                    stats={stats}
                />

            </div>

        </MainLayout>

    );

};

export default DashboardPage;