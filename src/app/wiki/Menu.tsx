import Link from 'next/link'

export default async function Nav() {
    return (
        <>
            <nav className="absolute w-full bg-[#242526] p-2 h-16 text-white flex justify-between items-center">
                <label className='px-4'>
                    menu
                    <input type="checkbox" className='hidden' />
                </label>
                <div className='flex gap-4 flex-1 justify-end'>
                    <Link href={'/app'}>App</Link>
                    <Link href={'/wiki'}>Wiki</Link>
                    <Link href={'/changelog'}>Changelog</Link>
                </div>
            </nav>
            <div className='h-16'></div>
        </>
    )
}