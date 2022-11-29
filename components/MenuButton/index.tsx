import Link from "next/link"
import style from "./menuButton.module.css"

export default function MenuButton() {

    return <Link href="/" className={style.menuButton}>
        Back
    </Link>
}