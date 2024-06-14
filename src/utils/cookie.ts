class CookieUtil {
  static setCookie(name: string, value: string, days: number): void {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    const secureFlag = location.protocol === 'https:' ? 'Secure;' : ''
    document.cookie = `${name}=${value};${expires};path=/;${secureFlag}SameSite=Strict`
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length)
      }
    }
    return null
  }

  static eraseCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`
  }
}

export default CookieUtil
