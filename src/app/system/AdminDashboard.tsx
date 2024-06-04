import Link from 'next/link'
import Image from 'next/image'
export async function AdminDashboard() {
    return (
        <div>
            <header>
                <nav>
                    <Image src={'image 1.png'} alt='' height={100} width={200}></Image>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <div className="dropdown">
                            <button className="dropbtn">Selecciona tu rol</button>
                            <div className="dropdown-content">
                                <a href="#">Administrador</a>
                                <a href="#">Promotor</a>
                                <a href="#">Taquillero</a>
                            </div>
                        </div>
                    </ul>
                    <Image src={'image 2.png'} alt="" height={100} width={100}></Image>
                </nav>

            </header>
            <h1>Admin Dashboard</h1>
            <Link href="/system/logout" className=''>LogOut</Link>
        </div >
    )
}