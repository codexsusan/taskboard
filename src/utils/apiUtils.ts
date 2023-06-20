
type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const base_url = "http://localhost:3001";

export const request = async (endpoint: string, method: methodType = "GET", data: any = {}) => {
    let url: string;
    if (method === "GET") {
        const requestParams = data ? "?" + Object.keys(data).map((key) => `${key}=${data[key]}`).join("&") : "";
        url = `${base_url}${endpoint}${requestParams}`;
    } else {
        url = `${base_url}${endpoint}`;
    }
    // Token Authentication
    const token = localStorage.getItem("token");
    const auth = token ? `Token ${token}` : "";

    const response = await fetch(
        url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
    });
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);
}

