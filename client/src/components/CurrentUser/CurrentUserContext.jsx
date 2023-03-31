import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../services/auth";
import {getDoc, doc} from "firebase/firestore";
import {database} from "../../services/firebase";


export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            getDoc(doc(database, "Users", currentUser.uid)).then((doc) => {
                setUserData(doc.data());
            })
        } else {
            setUserData(null);
        }
    }, [currentUser]);

    return (
        <CurrentUserContext.Provider value={{ userData, setUserData }}>
            {children}
        </CurrentUserContext.Provider>
    );
};