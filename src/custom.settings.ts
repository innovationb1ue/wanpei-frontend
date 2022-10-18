export const isProd = process.env.NODE_ENV === 'production'


interface SettingObj {
    socketHost: () => string
}

export const prodSettings = {
    socketHost: () => "wss://wanpei.top:8096" // indicate the server address when deploying
} as SettingObj

export const devSettings = {
    socketHost: () => {
        return `ws://${location.host}:8096`
    }
} as SettingObj

export const settings = isProd ? prodSettings : devSettings as SettingObj


