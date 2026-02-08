import Header from '@/components/Header';

export default function WebdevelopmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <Header />
      <div className=''>{children}</div>
    </div>
  );
}
