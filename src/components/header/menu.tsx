import { motion } from "framer-motion"
import { useState } from "react"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useTranslation } from "~/utils/i18n"
import { useDark } from "~/hooks/useDark"
import { useLogin } from "~/hooks/useLogin"
import { $ } from "~/utils"
import { Homepage } from "~/consts"

function ThemeToggle() {
  const { isDark, toggleDark } = useDark()
  const { t } = useTranslation()
  return (
    <li onClick={toggleDark}>
      <span className={$("inline-block", isDark ? "i-ph-moon-stars-duotone" : "i-ph-sun-dim-duotone")} />
      <span>
        {isDark ? t("theme.light") : t("theme.dark")}
      </span>
    </li>
  )
}

export function Menu() {
  const { loggedIn, login, logout, userInfo, enableLogin } = useLogin()
  const [shown, show] = useState(false)
  const { t } = useTranslation()

  return (
    <span className="relative" onMouseEnter={() => show(true)} onMouseLeave={() => show(false)}>
      <span className="flex items-center scale-90">
        {
          enableLogin && loggedIn && userInfo.avatar
            ? (
                <button
                  type="button"
                  className="h-6 w-6 rounded-full bg-cover"
                  style={
                    {
                      backgroundImage: `url(${userInfo.avatar}&s=24)`,
                    }
                  }
                >
                </button>
              )
            : <button type="button" className="btn i-si:more-muted-horiz-circle-duotone" />
        }
      </span>
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-4 top-4">
          <motion.div
            id="dropdown-menu"
            className={$([
              "w-200px",
              "bg-primary backdrop-blur-5 bg-op-70! rounded-lg shadow-xl",
            ])}
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
          >
            <ol className="bg-base bg-op-70! backdrop-blur-md p-2 rounded-lg color-base text-base">
              {enableLogin && (loggedIn
                ? (
                    <li onClick={logout}>
                      <span className="i-ph:sign-out-duotone inline-block" />
                      <span>{t("logout")}</span>
                    </li>
                  )
                : (
                    <li onClick={login}>
                      <span className="i-ph:sign-in-duotone inline-block" />
                      <span>{t("login")}</span>
                    </li>
                  ))}
              <ThemeToggle />
              <LanguageSwitcher />
              <li onClick={() => window.open(Homepage)}>
                <span className="i-ph:github-logo-duotone inline-block" />
                <span>{t("starOnGithub")}</span>
              </li>
              <li className="flex gap-2 items-center">
                <a
                  href="https://github.com/ourongxing/newsnow"
                >
                  <img
                    alt="GitHub stars badge"
                    src="https://img.shields.io/github/stars/ourongxing/newsnow?logo=github"
                  />
                </a>
                <a
                  href="https://github.com/ourongxing/newsnow/fork"
                >
                  <img
                    alt="GitHub forks badge"
                    src="https://img.shields.io/github/forks/ourongxing/newsnow?logo=github"
                  />
                </a>
              </li>
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  )
}
