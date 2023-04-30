import NavigationCard from './NavigationCard'

const Layout = ({children,hide,profile}) => {
  return (
    <div className='md:flex max-w-4xl mt-4 mx-auto gap-6 mb-24 md:mb-0'>
      {
        !hide && (
          <div className='md:w-3/12 md:static fixed w-full bottom-0 -mb-5'>
          <NavigationCard profile={profile} className='z-10'/>
        </div>
        )
      }
        <div className={hide ? 'w-full' : 'md:w-9/12 md:mx-0 mx-4 '}>
          {children}
        </div>
      </div>
  )
}

export default Layout