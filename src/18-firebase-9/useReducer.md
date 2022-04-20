## useReducer

reducers/dataReducer.js

```js
export const DATA_INITIAL_STATE = {
    data: undefined,
    error: undefined,
    loading: false,
};

export const DATA_ACTIONS = {
    START_GET_DATA: 0,
    DATA_SUCCESS: 1,
    DATA_ERROR: 2,
};

export const dataReducer = (state, action) => {
    switch (action.type) {
        case DATA_ACTIONS.START_GET_DATA:
            return {
                ...state,
                error: undefined,
                loading: true,
            };
        case DATA_ACTIONS.DATA_SUCCESS:
            return {
                ...state,
                data: action.data,
                error: undefined,
                loading: false,
            };
        case DATA_ACTIONS.DATA_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                data: undefined,
            };
        default:
            throw new Error("Ocurrió un error");
    }
};
```

hooks/useFirestore.js

```js
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useEffect, useReducer } from "react";
import { auth, db } from "../firebase";
import {
    DATA_INITIAL_STATE,
    DATA_ACTIONS,
    dataReducer,
} from "../reducers/dataReducer";

const getData = async (startGetData, dataSuccess, dataError, uid) => {
    startGetData(true);
    try {
        const q = query(collection(db, "urls"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const datos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dataSuccess(datos);
    } catch (error) {
        console.log(error);
        dataError(error.message);
    }
};

export const useFirestore = () => {
    const [data, setData] = useReducer(dataReducer, DATA_INITIAL_STATE);
    const uid = auth.currentUser.uid;

    const startGetData = () => {
        setData({ type: DATA_ACTIONS.START_GET_DATA });
    };

    const dataSuccess = (data) => {
        setData({
            type: DATA_ACTIONS.DATA_SUCCESS,
            data,
        });
    };

    const dataError = (error) => {
        setData({
            type: DATA_ACTIONS.DATA_ERROR,
            error,
        });
    };

    useEffect(() => {
        console.log("useEffect");
        getData(startGetData, dataSuccess, dataError, uid);
    }, []);

    return { ...data };
};
```
