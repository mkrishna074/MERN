import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useSearch(query, pageNumber) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        console.log('useSearch');
        setEvents([]);
    }, [query])

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'https://openlibrary.org/search.json',
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
            setEvents(prevEvents => {return [...new Set([...prevEvents, ...res.data.docs.map(d => d.title)])]});
            setHasMore(res.data.docs.length > 0);
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
