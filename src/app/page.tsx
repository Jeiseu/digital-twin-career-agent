import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChatWindow } from '@/components/chat/ChatWindow'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <ChatWindow />
      </main>

      <Footer />
    </div>
  )
}
