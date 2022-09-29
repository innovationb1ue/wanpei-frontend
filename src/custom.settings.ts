export const isProd = process.env.NODE_ENV === 'production'

export const prodSettings = {
    socketHost: "wss://121.37.197.186:8096"
}

export const devSettings = {
    socketHost: "ws://localhost:8096"
}

export const settings = isProd ? prodSettings : devSettings


