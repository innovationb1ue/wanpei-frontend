import useSWR from 'swr'

// @ts-ignore
export const fetcher = (url) => fetch(url).then((res) => res.json())


export const useCurrentUser = () => {
    const {data, error} = useSWR("/api/user/current", fetcher)
    return {
        res: data as API.baseResult<API.CurrentUser>,
        isLoading: !error && !data,
        isError: error,
    }
}

