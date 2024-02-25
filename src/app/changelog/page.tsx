import { getAllLogs } from '@/lib/changelog'
import Link from 'next/link'

export default function Wiki() {
    const allLogs = getAllLogs()
    return <div className='p-8 flex flex-col gap-4'>
        {allLogs.map(log => <article className='flex flex-row gap-4' key={log.slug}>
            <span className='h-full'>{log.data.date}</span>
            <Link className='text-4xl border-l-2' href={`/changelog/${log.slug}`}>
                <label>{log.data.title}</label>
                <div className='bg-no-repeat bg-cover bg-center aspect-video h-80' style={{backgroundImage: `url('${log.data.image??'/tohru.png'}')`}}></div>
            </Link>
        </article>)}
    </div>
}