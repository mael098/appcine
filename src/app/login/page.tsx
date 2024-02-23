import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="w-screen h-screen grid justify-center items-center">
            <main className="grid grid-cols-2 justify-center items-center bg-green-200 h-96 w-[700px] rounded-2xl shadow-green-900 shadow-2xl">
                <Image src='/Premium Photo _ Vintage cinema videocamera.jpg' alt='fondo ' width={380} height={100} className='col-span-1 w-full h-full rounded-l-2xl'/>
                <div className='col-span-1 flex flex-col gap-9 justify-center items-center'>
                    <h1 className="text-3xl font-extrabold">login</h1>
                    <input type="email" name="" id="" placeholder='email' className="p-2 rounded-md shadow-gray-950 shadow-inner focus:outline-none focus:outline-emerald-700 focus:shadow-none"/>
                    <input type="password" name="" id=""  placeholder='password' className="p-2 rounded-md shadow-gray-950 shadow-inner focus:outline-none focus:outline-emerald-700 focus:shadow-none"/>
                </div>
            </main>
        </div>
    )
}
