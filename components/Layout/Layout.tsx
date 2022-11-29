import style from "./layout.module.css"

export default function Layout({ children }: any) {

    return <div className={style.layout}>
        {children}
    </div>
}