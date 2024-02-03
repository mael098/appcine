


export default function LoginPage() {
  return (
    <div className="sm:max-w-full  flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-mono text-white ">Login</h1>
      <form className="flex flex-col gap-6 ">
        <input type="text" placeholder="Username" className="text-2xl rounded-lg p-2" />
        <input type="password" placeholder="Password" className="text-2xl rounded-lg p-2"/>
        <button type="submit" className="bg-lime-700 p-1  rounded-lg shadow-md hover:bg-lime-600 ">Login</button>
      </form>
    </div>
  )
}
