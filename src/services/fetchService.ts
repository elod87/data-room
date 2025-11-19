const API_BASE_URL = import.meta.env.VITE_API_URL

const handleResponse = async <T>(response: Response): Promise<T> => {
    const text = await response.text()
    const data = text && JSON.parse(text)

    if (!response.ok) {
        const error = (data && data.message) || response.statusText
        return Promise.reject(new Error(error))
    }

    return data as T
}

const fetchData = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    return handleResponse<T>(response)
}

export const getData = async <T>(endpoint: string): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'GET' })
}

export const postData = async (endpoint: string, body: BodyInit) => {
    return fetchData(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export const updateData = async (endpoint: string, body: BodyInit) => {
    return fetchData(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    })
}

export const deleteData = async (endpoint: string) => {
    return fetchData(endpoint, { method: 'DELETE' })
}
