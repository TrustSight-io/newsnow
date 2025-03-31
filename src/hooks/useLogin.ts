import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

interface UserInfo {
  avatar?: string
  name?: string
  email?: string
}

const userInfoAtom = atomWithStorage<UserInfo>("userInfo", {})
const loggedInAtom = atom(false)

export function useLogin() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom)

  const login = async () => {
    // Implement GitHub OAuth login logic here
    // For now, just a placeholder
    console.log("Login clicked")
  }

  const logout = () => {
    setUserInfo({})
    setLoggedIn(false)
  }

  return {
    loggedIn,
    login,
    logout,
    userInfo,
    enableLogin: true, // Can be controlled by environment variable
  }
}
