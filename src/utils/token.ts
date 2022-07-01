import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies();

const TOKEN_KEY = 'v_token';

export function setToken(val: string) {
    cookies.set(TOKEN_KEY, val, {
        maxAge: 3600,
    });
}

export function getToken() {
    return cookies.get(TOKEN_KEY);
}

export function removeToken() {
    cookies.remove(TOKEN_KEY);
}
