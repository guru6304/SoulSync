import './AuthLayout.css';

const AuthLayout = ({ children }) => {

    return (

        <div className="auth-layout">

            <div className="background-circle circle-one"></div>
            <div className="background-circle circle-two"></div>
            <div className="background-circle circle-three"></div>

            <div className="auth-overlay">

                <div className="auth-card">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default AuthLayout;