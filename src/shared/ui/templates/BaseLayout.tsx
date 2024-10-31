import { ReactNode } from 'react';

import Footer from '../../../widgets/ui/Footer';
import Header from '../../../widgets/ui/Header';

interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
