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
    options: RequestInit = {},
    getToken?: () => Promise<string | null>
): Promise<T> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    }

    // Add Authorization header if token is available
    if (getToken) {
        const token = await getToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    })
    return handleResponse<T>(response)
}

export const getData = async <T>(
    endpoint: string,
    getToken?: () => Promise<string | null>
): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'GET' }, getToken)
}

export const postData = async (
    endpoint: string,
    body: BodyInit,
    getToken?: () => Promise<string | null>
) => {
    return fetchData(
        endpoint,
        {
            method: 'POST',
            body: JSON.stringify(body),
        },
        getToken
    )
}

export const updateData = async (
    endpoint: string,
    body: BodyInit,
    getToken?: () => Promise<string | null>
) => {
    return fetchData(
        endpoint,
        {
            method: 'PUT',
            body: JSON.stringify(body),
        },
        getToken
    )
}

export const patchData = async <T>(
    endpoint: string,
    body: BodyInit,
    getToken?: () => Promise<string | null>
): Promise<T> => {
    return fetchData<T>(
        endpoint,
        {
            method: 'PATCH',
            body: JSON.stringify(body),
        },
        getToken
    )
}

export const deleteData = async <T>(
    endpoint: string,
    body: BodyInit | undefined,
    getToken?: () => Promise<string | null>
): Promise<T> => {
    const options: RequestInit = { method: 'DELETE' }
    if (body) {
        options.body = JSON.stringify(body)
    }
    return fetchData<T>(endpoint, options, getToken)
}
