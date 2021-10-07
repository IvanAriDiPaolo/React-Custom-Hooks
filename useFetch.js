import { useRef } from "react"
import { useState, useEffect } from "react"

export const useFetch = (url) => {
    if (!url) {
        throw new Error('No Url!')
    }

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    const [state, setState] = useState({ data: null, loading: true, error: null })

    useEffect(() => {
        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted) {
                    setTimeout(() => {
                        setState({
                            data,
                            loading: false,
                            error: null
                        })
                    }, 1000)
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'Cant load info'
                });
            });
    }, [url])

    return state
}
