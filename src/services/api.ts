import useSWR from 'swr'
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())
export const fetcherPost = (url: string, data: {}) => {
    return fetch(url, {
        method: "POST", headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data)
    }).then((res) => res.json());
}


/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams) {
    return fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
}

export async function register(body: API.RegisterParams) {
    return fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
}

