import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import styles from "./LoginPage.module.css";
import {loginUserThunk} from "../../features/authorization/authThunks.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, isLogin } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        dispatch(loginUserThunk({email, password}));
    };

    useEffect(() => {
        if (isLogin) navigate(ROUTES.HOME);
    }, [isLogin, navigate]);

    if(isLogin) { return (<div>Already login</div>)}

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;