


export default function LoginPage() {
  return (
    <div className="h-screen  flex flex-row justify-center items-center gap-4">
      <form className="flex sm: flex-col justify-center items-center gap-6 bg-slate-400 p-10 rounded-3xl ">
      <h1 className="text-3xl font-mono text-white ">Login</h1>
        <input type="text" placeholder="Username" className="text-2xl rounded-lg p-2  focus:scale-110  focus:drop-shadow-lg focus:duration-200  outline-none" />
        <input type="password" placeholder="Password" className="text-2xl rounded-lg p-2"/>
        <button type="submit" className="bg-lime-700 w-56  h-11   rounded-lg shadow-md hover:bg-lime-600 hover:scale-105 duration-300 border-spacing-1 drop-shadow-sm">Login</button>
      </form>
    </div>
  )
}
