interface Props {
  children: React.ReactNode
}

// set bg-color o div ngoai cung

export default function MainLayout({ children }: Props) {
  return (
    <div className='min-h-screen'>
      <main className='w-[1200px] max-w-full m-auto p-5'>{children}</main>
      {/* aside */}
    </div>
  )
}
