import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useSearch(query, pageNumber) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setEvents([]);
    }, [query])

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/todayi/searchEvents',
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            console.log(res.data);
            setEvents(prevEvents => {return [...new Set([...prevEvents, ...res.data.map(d => d)])]});
            setHasMore(res.data.length > 0);
            setIsLoading(false);
        })
        .catch((e) => {
            if(axios.isCancel()) return
            setIsError(true);
        })
        return () => cancel()
    }, [query, pageNumber])
    return {isLoading, events, hasMore, isError}
}
