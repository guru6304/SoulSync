import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Bell, CalendarHeart, ChevronDown, CircleHelp, Heart,
  HeartHandshake, Home, ImagePlus, Images, Mail, MessageCircle,
  NotebookPen, PenLine, Settings, Sparkles, TrendingUp, ArrowRight,
} from "lucide-react";

import { logout } from "../../store/slices/authSlice";
import { fetchDashboard } from "../../store/dashboard/dashboardThunks";
import { fetchDailySoulCard } from "../../store/questions/questionThunks";
import { moodThemes } from "../../theme/moodThemes";
import "./DashboardPage.css";

const navItems = [
  ["Dashboard", Home, "/dashboard"],
  ["Today's Question", CircleHelp, "question"],
  ["My Answers", NotebookPen, "myAnswers"],
  ["Partner Answers", HeartHandshake, "partnerAnswers"],
  ["Memories", Images, "/memories"],
  ["Love Letters", Mail, "/letters"],
  ["Say Something", MessageCircle, "/say-something"],
  ["Timeline", TrendingUp, "/timeline"],
  ["Our Journey", HeartHandshake, "/timeline"],
  ["Settings", Settings, "/profile"],
];

const relativeTime = (value) => {
  if (!value) return "Recently";
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(value)) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { dashboard, loading, error } = useSelector((state) => state.dashboard);
  const { dailySoulCard, loading: questionLoading, error: questionError } = useSelector((state) => state.questions);

  const mood = useMemo(() => {
    const raw = dashboard?.todayMood?.mood_type || localStorage.getItem("activeMood") || "romantic";
    return raw.replace(/-/g, "_");
  }, [dashboard?.todayMood?.mood_type]);
  const theme = moodThemes[mood] || moodThemes.romantic;
  const questionPath = `/questions?mood=${mood}`;
  const partner = dashboard?.partner;
  const couple = user?.active_couple || dashboard?.user?.couples?.[0];

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDailySoulCard(mood));
  }, [dispatch, mood]);

  const destination = (key) => {
    if (key === "question") return questionPath;
    if (key === "myAnswers") return `/moods/${mood}/my-answers`;
    if (key === "partnerAnswers") return `/moods/${mood}/partner-answers`;
    return key;
  };

  const activities = useMemo(() => {
    if (!dashboard?.activity) return [];
    const ownId = user?.id;
    return [
      ...(dashboard.activity.answers || []).map((item) => ({
        id: `answer-${item.id}`, icon: MessageCircle,
        title: item.answered_by === ownId ? "You answered a Soul Card" : "Your partner answered a Soul Card",
        createdAt: item.created_at || item.createdAt, time: relativeTime(item.created_at || item.createdAt),
      })),
      ...(dashboard.activity.memories || []).map((item) => ({
        id: `memory-${item.id}`, icon: Images, title: "A new memory was added",
        createdAt: item.created_at || item.createdAt, time: relativeTime(item.created_at || item.createdAt),
      })),
    ].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 4);
  }, [dashboard?.activity, user?.id]);

  const memoryMedia = (memory) => memory.media?.find((item) => item.media_type === "image")?.media_url;
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";
  const dayCount = couple?.anniversary_date
    ? Math.max(0, Math.floor((Date.now() - new Date(couple.anniversary_date)) / 86400000))
    : null;

  return (
    <div className="dashboard-shell" style={{ "--dash-primary": theme.primary, "--dash-soft": theme.background, "--dash-gradient": theme.gradient }}>
      <aside className="dashboard-sidebar">
        <button className="dashboard-logo" onClick={() => navigate("/dashboard")}><Heart size={22} fill="currentColor" /> Soul Sync</button>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {navItems.map(([label, Icon, path]) => (
            <button key={label} className={label === "Dashboard" ? "dashboard-nav__item active" : "dashboard-nav__item"} onClick={() => navigate(destination(path))}>
              <Icon size={19} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <section className="partner-card">
          <p>You &amp; Your Partner</p>
          <div className="partner-card__avatars"><span>{user?.first_name?.[0] || "Y"}</span><Heart size={18} fill="currentColor" /><span>{partner?.first_name?.[0] || "♡"}</span></div>
          <strong>{partner ? "Stronger together every day" : "Invite your partner to begin"}</strong>
          {couple?.anniversary_date && <small>Since {new Date(couple.anniversary_date).toLocaleDateString()}</small>}
          <button onClick={() => navigate("/timeline")}>View Our Journey <ArrowRight size={15} /></button>
        </section>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div><p>{greeting}, {user?.first_name || user?.username || "My Love"}! <span aria-hidden="true">☀️</span></p><h1>Here’s your love dashboard for today</h1></div>
          <div className="dashboard-account"><button className="icon-button" onClick={() => navigate("/notifications")} aria-label="Notifications"><Bell size={20} /></button><div className="account-avatar">{user?.first_name?.[0] || "S"}</div><div><strong>My Love</strong><small>Soul Mates</small></div><ChevronDown size={17} /><button className="logout-link" onClick={() => { dispatch(logout()); navigate("/login", { replace: true }); }}>Log out</button></div>
        </header>

        {error && <section className="dashboard-error">Unable to load your dashboard right now. <button onClick={() => dispatch(fetchDashboard())}>Try again</button></section>}
        {!loading && dashboard && !dashboard.hasCouple && <section className="dashboard-invite"><HeartHandshake size={30} /><div><strong>Bring your partner into Soul Sync</strong><p>Connect your private space to begin sharing Soul Cards, memories, and letters.</p></div><button onClick={() => navigate("/couple-invitation")}>Invite Partner</button></section>}

        <section className="dashboard-hero">
          <div className="hero-decor" aria-hidden="true">{theme.emojis?.slice(0, 4).join(" ")}</div>
          <div className="hero-copy"><span className="mood-badge">{theme.title} mood {theme.emoji}</span><h2>Daily Soul Card</h2><p>Explore today’s question, created especially for your mood.</p><div className="hero-actions"><button className="primary-action" onClick={() => navigate(questionPath)}><MessageCircle size={18} /> Answer Now</button><button onClick={() => navigate(`/moods/${mood}/my-answers`)}><NotebookPen size={18} /> My Answers</button><button onClick={() => navigate(`/moods/${mood}/partner-answers`)}><HeartHandshake size={18} /> Partner Answers</button></div></div>
          <div className="love-streaks"><h3>Your Love Streaks <span>🔥</span></h3><p>Keep the love going!</p><div className="streak-grid"><div><Heart size={17} fill="currentColor" /><strong>{dayCount ?? "—"}</strong><small>Days Together</small></div><div><Sparkles size={17} /><strong>{dashboard?.stats?.questionAnswered ?? "—"}</strong><small>Soul Cards</small></div></div></div>
        </section>

        <section><div className="section-heading"><div><span>✨ Quick Actions</span><p>Everything you need to feel close</p></div></div><div className="quick-action-grid"><button onClick={() => navigate("/letters/write")}><i className="pink"><PenLine size={25} /></i><strong>Write Letter</strong><span>Pour your heart out</span><ArrowRight size={18} /></button><button onClick={() => navigate("/memories/create")}><i className="blue"><ImagePlus size={25} /></i><strong>Add Memory</strong><span>Capture a beautiful moment</span><ArrowRight size={18} /></button><button onClick={() => navigate("/say-something")}><i className="gold"><MessageCircle size={25} /></i><strong>Say Something</strong><span>Share what’s on your mind</span><ArrowRight size={18} /></button></div></section>

        <section className="dashboard-content-grid">
          <article className="dashboard-card question-card"><div className="card-title"><span><CircleHelp size={20} /> Today’s Question</span><button onClick={() => navigate(questionPath)}>View Question <ArrowRight size={15} /></button></div>{questionLoading ? <p className="card-muted">Loading today’s Soul Card…</p> : questionError ? <div className="card-empty">Unable to load today’s question. <button onClick={() => dispatch(fetchDailySoulCard(mood))}>Try again</button></div> : dailySoulCard ? <><h3>{dailySoulCard.question_text || dailySoulCard.title}</h3><button className="text-action" onClick={() => navigate(questionPath)}>Answer this Soul Card <ArrowRight size={16} /></button></> : <div className="card-empty">No question available today.</div>}</article>
          <article className="dashboard-card activity-card"><div className="card-title"><span><TrendingUp size={20} /> Recent Activity</span><button onClick={() => navigate("/timeline")}>View All <ArrowRight size={15} /></button></div>{activities.length ? <div className="activity-list">{activities.map((activity) => { const Icon = activity.icon; return <div key={activity.id}><i><Icon size={17} /></i><span>{activity.title}<small>{activity.time}</small></span></div>; })}</div> : <div className="card-empty">Your shared story will appear here.</div>}</article>
          <article className="dashboard-card moments-card"><div className="card-title"><span><Images size={20} /> Our Moments</span><button onClick={() => navigate("/memories")}>View All <ArrowRight size={15} /></button></div>{dashboard?.recentMemories?.length ? <div className="moments-grid">{dashboard.recentMemories.slice(0, 4).map((memory) => <button key={memory.id} onClick={() => navigate(`/memories/${memory.id}`)}>{memoryMedia(memory) ? <img src={memoryMedia(memory)} alt={memory.title || "Memory"} /> : <span>{memory.title || "Memory"}</span>}</button>)}</div> : <div className="card-empty">No memories yet. <button onClick={() => navigate("/memories/create")}>Add one</button></div>}</article>
          <article className="dashboard-card letters-card"><div className="card-title"><span><Mail size={20} /> Love Letters</span><button onClick={() => navigate("/letters")}>View All <ArrowRight size={15} /></button></div><div className="card-empty">Write something your partner can keep forever. <button onClick={() => navigate("/letters/write")}>Write a letter</button></div></article>
          <article className="dashboard-card dates-card"><div className="card-title"><span><CalendarHeart size={20} /> Upcoming Dates</span></div>{couple?.anniversary_date ? <div className="date-item"><Heart size={19} fill="currentColor" /><span><strong>Anniversary</strong><small>{new Date(couple.anniversary_date).toLocaleDateString()}</small></span></div> : <div className="card-empty">No relationship dates have been added yet.</div>}</article>
          <article className="love-note"><Heart size={23} fill="currentColor" /><span>Love Note</span><p>Every little moment with you is my favorite story.</p></article>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
