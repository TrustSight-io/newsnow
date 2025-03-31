import { fixedColumnIds } from "@shared/metadata"
import { Link } from "@tanstack/react-router"
import { currentColumnIDAtom } from "~/atoms"
import { useLocalizedMetadata } from "~/hooks/useMetadata"
import { useTranslation } from "~/utils/i18n"

export function NavBar() {
  const currentId = useAtomValue(currentColumnIDAtom)
  const { toggle } = useSearchBar()
  const { t } = useTranslation()
  const metadata = useLocalizedMetadata()
  
  return (
    <span className={$([
      "flex p-3 rounded-2xl bg-primary/1 text-sm",
      "shadow shadow-primary/20 hover:shadow-primary/50 transition-shadow-500",
    ])}
    >
      <button
        type="button"
        onClick={() => toggle(true)}
        className={$(
          "px-2 hover:(bg-primary/10 rounded-md) op-70 dark:op-90",
        )}
      >
        {t('more')}
      </button>
      {fixedColumnIds.map(columnId => (
        <Link
          key={columnId}
          to="/c/$column"
          params={{ column: columnId }}
          className={$(
            "px-2 hover:(bg-primary/10 rounded-md)",
            currentId === columnId ? "color-primary font-bold" : "op-70 dark:op-90",
          )}
        >
          {metadata[columnId].name}
        </Link>
      ))}
    </span>
  )
}
