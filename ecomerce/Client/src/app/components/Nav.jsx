import Link from "next/link"
import {MdNotificationsNone} from 'react-icons/md'
const links = [{
  label:'User Name',
  route:'/perfil'
},{
  label:<MdNotificationsNone/>,
  route:'/notification'
}]

export default function Nav() {
  return (
    <header>
        <nav>
        <ul>
            {links.map(({label,route})=>{
                return(
                <li key={route}>
                    <Link href={route}>
                    {label}
                    </Link>
                </li>
            )})
            }
        </ul>
        </nav>
    </header>
  )
}