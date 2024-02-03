


export default function LoginPage() {
  return (
    <div className="h-screen flex  justify-center items-center">
      <h1>Login</h1>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Username" className="text-2xl rounded-lg "/>
        <input type="password" placeholder="Password" className="text-2xl rounded-lg "/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
